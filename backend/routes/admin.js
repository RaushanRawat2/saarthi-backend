const express = require('express');
const Booking = require('../models/BookingRoute');
const Event = require('../models/Event');
const Monastery = require('../models/Monastery');
const User = require('../models/User');
const { adminAuth } = require('../middleware/auth');

const router = express.Router();

// QR Code Verification
router.post('/verify-qr', adminAuth, async (req, res) => {
  try {
    const { qrData } = req.body;

    let parsedData;
    try {
      parsedData = JSON.parse(qrData);
    } catch (error) {
      return res.status(400).json({ 
        message: 'Invalid QR code data' 
      });
    }

    const { bookingId, userId, eventId, valid } = parsedData;

    if (!valid) {
      return res.status(400).json({ 
        message: 'Invalid QR code' 
      });
    }

    const booking = await Booking.findOne({ bookingId })
      .populate('event')
      .populate('user');

    if (!booking) {
      return res.status(404).json({ 
        message: 'Booking not found' 
      });
    }

    // Check if QR code is expired
    if (new Date() > booking.qrCode.expiresAt) {
      return res.status(400).json({ 
        message: 'QR code has expired' 
      });
    }

    // Check if already checked in
    if (booking.attendance.checkedIn) {
      return res.status(400).json({ 
        message: 'Already checked in' 
      });
    }

    // Mark attendance
    booking.attendance = {
      checkedIn: true,
      checkedInAt: new Date(),
      checkedInBy: req.user._id
    };

    await booking.save();

    res.json({
      success: true,
      message: 'Attendance marked successfully',
      booking: {
        id: booking._id,
        bookingId: booking.bookingId,
        user: booking.user.name,
        event: booking.event.title,
        participants: booking.participants
      }
    });

  } catch (error) {
    console.error('QR verification error:', error);
    res.status(500).json({ 
      message: 'QR verification failed',
      error: error.message 
    });
  }
});

// Get dashboard analytics
router.get('/analytics', adminAuth, async (req, res) => {
  try {
    const { period = 'month' } = req.query; // day, week, month, year

    // Calculate date range based on period
    const now = new Date();
    let startDate;
    
    switch (period) {
      case 'day':
        startDate = new Date(now.setHours(0, 0, 0, 0));
        break;
      case 'week':
        startDate = new Date(now.setDate(now.getDate() - 7));
        break;
      case 'month':
        startDate = new Date(now.setMonth(now.getMonth() - 1));
        break;
      case 'year':
        startDate = new Date(now.setFullYear(now.getFullYear() - 1));
        break;
      default:
        startDate = new Date(now.setMonth(now.getMonth() - 1));
    }

    // Total bookings
    const totalBookings = await Booking.countDocuments({
      createdAt: { $gte: startDate }
    });

    // Total revenue
    const revenueData = await Booking.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate },
          paymentStatus: 'paid'
        }
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalAmount' }
        }
      }
    ]);

    const totalRevenue = revenueData[0]?.totalRevenue || 0;

    // Most visited monasteries
    const popularMonasteries = await Booking.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate },
          paymentStatus: 'paid'
        }
      },
      {
        $lookup: {
          from: 'events',
          localField: 'event',
          foreignField: '_id',
          as: 'event'
        }
      },
      { $unwind: '$event' },
      {
        $group: {
          _id: '$event.monastery',
          totalVisitors: { $sum: '$participants' },
          totalBookings: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'monasteries',
          localField: '_id',
          foreignField: '_id',
          as: 'monastery'
        }
      },
      { $unwind: '$monastery' },
      {
        $project: {
          monasteryName: '$monastery.name',
          totalVisitors: 1,
          totalBookings: 1
        }
      },
      { $sort: { totalVisitors: -1 } },
      { $limit: 5 }
    ]);

    // Event type distribution
    const eventTypeDistribution = await Booking.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate },
          paymentStatus: 'paid'
        }
      },
      {
        $lookup: {
          from: 'events',
          localField: 'event',
          foreignField: '_id',
          as: 'event'
        }
      },
      { $unwind: '$event' },
      {
        $group: {
          _id: '$event.type',
          count: { $sum: 1 },
          totalParticipants: { $sum: '$participants' }
        }
      }
    ]);

    // Daily bookings trend
    const dailyTrend = await Booking.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate },
          paymentStatus: 'paid'
        }
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: '%Y-%m-%d',
              date: '$createdAt'
            }
          },
          count: { $sum: 1 },
          revenue: { $sum: '$totalAmount' }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      period,
      totalBookings,
      totalRevenue,
      popularMonasteries,
      eventTypeDistribution,
      dailyTrend
    });

  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ 
      message: 'Failed to fetch analytics',
      error: error.message 
    });
  }
});

// Get all bookings for admin
router.get('/bookings', adminAuth, async (req, res) => {
  try {
    const { page = 1, limit = 20, status, eventId } = req.query;

    let filter = {};
    if (status) filter.status = status;
    if (eventId) filter.event = eventId;

    const bookings = await Booking.find(filter)
      .populate('user', 'name email phone')
      .populate('event', 'title date monastery type')
      .populate('event.monastery', 'name')
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
    console.error('Get admin bookings error:', error);
    res.status(500).json({ 
      message: 'Server error',
      error: error.message 
    });
  }
});

// Update booking status (admin)
router.put('/bookings/:id', adminAuth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('event')
      .populate('user');

    if (!booking) {
      return res.status(404).json({ 
        message: 'Booking not found' 
      });
    }

    const { status, notes } = req.body;

    if (status) {
      booking.status = status;
    }

    await booking.save();

    res.json({
      message: 'Booking updated successfully',
      booking
    });

  } catch (error) {
    console.error('Update booking error:', error);
    res.status(500).json({ 
      message: 'Server error',
      error: error.message 
    });
  }
});

module.exports = router;