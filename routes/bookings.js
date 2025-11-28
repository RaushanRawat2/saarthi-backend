
/*
const express = require("express");
const Booking = require("../models/booking"); // ensure this file exists
const { protect } = require("../middleware/authMiddleware"); // adjust path

const router = express.Router();

// Update booking status (admin only)
router.put("/:id/status", protect, async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Not authorized" });

    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.status = status;
    await booking.save();

    res.json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
*/





const express = require('express');
const { body, validationResult } = require('express-validator');
const QRCode = require('qrcode');
const Booking = require("../models/BookingRoute")
const Event = require('../models/Event');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Create booking
router.post('/', [auth, [
  body('eventId').isMongoId().withMessage('Valid event ID required'),
  body('participants').isInt({ min: 1, max: 10 }).withMessage('Participants must be between 1 and 10'),
  body('preferredLanguage').notEmpty().withMessage('Preferred language is required')
]], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { eventId, participants, participantDetails, preferredLanguage, specialRequests } = req.body;

    // Check event availability
    const event = await Event.findById(eventId);
    if (!event || event.status !== 'active') {
      return res.status(400).json({
        message: 'Event not available for booking'
      });
    }

    if (event.bookedSeats + participants > event.capacity) {
      return res.status(400).json({
        message: 'Not enough seats available'
      });
    }

    // Check if user already has a booking for this event
    const existingBooking = await Booking.findOne({
      user: req.user._id,
      event: eventId,
      status: 'confirmed'
    });

    if (existingBooking) {
      return res.status(400).json({
        message: 'You already have a booking for this event'
      });
    }

    // Calculate total amount
    const totalAmount = event.price * participants;

    // Create booking
    const booking = new Booking({
      user: req.user._id,
      event: eventId,
      participants,
      participantDetails,
      preferredLanguage,
      specialRequests,
      totalAmount
    });

    await booking.save();

    // Update event booked seats
    event.bookedSeats += participants;
    await event.save();

    // Populate booking details
    await booking.populate('event', 'title date startTime endTime location monastery');
    await booking.populate('user', 'name email phone');

    res.status(201).json({
      message: 'Booking created successfully',
      booking,
      paymentRequired: totalAmount > 0
    });

  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
});

// Get user's bookings
router.get('/my-bookings', auth, async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    let filter = { user: req.user._id };
    if (status) filter.status = status;

    const bookings = await Booking.find(filter)
      .populate('event', 'title date startTime endTime location monastery type images')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Booking.countDocuments(filter);

    res.json({
      bookings,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });

  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
});

// Get booking details
router.get('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('event')
      .populate('user', 'name email phone');

    if (!booking) {
      return res.status(404).json({
        message: 'Booking not found'
      });
    }

    // Check if user owns the booking or is admin
    if (booking.user._id.toString() !== req.user._id.toString() &&
      req.user.role === 'tourist') {
      return res.status(403).json({
        message: 'Access denied'
      });
    }

    // Generate QR code if paid and not expired
    if (booking.paymentStatus === 'paid' &&
      new Date() < booking.qrCode.expiresAt) {

      const qrData = {
        bookingId: booking.bookingId,
        userId: booking.user._id,
        eventId: booking.event._id,
        valid: true
      };

      booking.qrCode.data = await QRCode.toDataURL(JSON.stringify(qrData));
      await booking.save();
    }

    res.json(booking);

  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
});

// Cancel booking
router.put('/:id/cancel', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('event')
      .populate('user');

    if (!booking) {
      return res.status(404).json({
        message: 'Booking not found'
      });
    }

    if (booking.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: 'Access denied'
      });
    }

    if (booking.status === 'cancelled') {
      return res.status(400).json({
        message: 'Booking already cancelled'
      });
    }

    // Update booking status
    booking.status = 'cancelled';
    booking.cancellation = {
      cancelled: true,
      cancelledAt: new Date(),
      reason: req.body.reason || 'User requested cancellation'
    };

    // Refund logic based on cancellation time
    const eventDate = new Date(booking.event.date);
    const hoursUntilEvent = (eventDate - new Date()) / (1000 * 60 * 60);

    if (hoursUntilEvent > 24) {
      booking.cancellation.refundAmount = booking.totalAmount * 0.8; // 80% refund
    } else if (hoursUntilEvent > 12) {
      booking.cancellation.refundAmount = booking.totalAmount * 0.5; // 50% refund
    } else {
      booking.cancellation.refundAmount = 0; // No refund
    }

    await booking.save();

    // Update event booked seats
    const event = await Event.findById(booking.event._id);
    event.bookedSeats -= booking.participants;
    await event.save();

    res.json({
      message: 'Booking cancelled successfully',
      refundAmount: booking.cancellation.refundAmount
    });

  } catch (error) {
    console.error('Cancel booking error:', error);
    res.status(500).json({
      message: 'Server error',
      error: error.message
    });
  }
});

module.exports = router;