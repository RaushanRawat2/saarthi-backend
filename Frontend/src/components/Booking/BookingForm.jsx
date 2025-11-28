import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { useCreateBooking } from '../../hooks/useEvents';
import { loadRazorpay } from '../../utils/razorpay';
import axios from 'axios';
import toast from 'react-hot-toast';

const BookingForm = ({ event, availability }) => {
  const { user } = useAuth();
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const createBookingMutation = useCreateBooking();
  
  const participants = watch('participants', 1);
  const totalAmount = event.price * participants;

  const onSubmit = async (data) => {
    if (!user) {
      toast.error('Please login to book an event');
      return;
    }

    if (availability.availableSeats < data.participants) {
      toast.error('Not enough seats available');
      return;
    }

    try {
      const bookingData = {
        eventId: event._id,
        participants: parseInt(data.participants),
        preferredLanguage: data.preferredLanguage,
        specialRequests: data.specialRequests,
        participantDetails: Array.from({ length: data.participants }, (_, i) => ({
          name: data[`participant_${i}_name`] || `Participant ${i + 1}`,
          age: parseInt(data[`participant_${i}_age`]) || 0,
          nationality: data[`participant_${i}_nationality`] || 'Indian'
        }))
      };

      const result = await createBookingMutation.mutateAsync(bookingData);
      
      if (result.paymentRequired && totalAmount > 0) {
        await initiatePayment(result.booking);
      } else {
        toast.success('Booking confirmed!');
        window.location.href = `/bookings/${result.booking._id}`;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Booking failed');
    }
  };

  const initiatePayment = async (booking) => {
    const razorpayLoaded = await loadRazorpay();
    if (!razorpayLoaded) {
      toast.error('Razorpay SDK failed to load');
      return;
    }

    try {
      const orderResponse = await axios.post('/api/payments/create-order', {
        bookingId: booking._id,
        amount: totalAmount
      });

      const { orderId, amount, currency, key } = orderResponse.data;

      const options = {
        key,
        amount: amount.toString(),
        currency,
        name: 'Monastery Tourism - Sikkim',
        description: `Booking for ${event.title}`,
        order_id: orderId,
        handler: async function (response) {
          try {
            const verifyResponse = await axios.post('/api/payments/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              bookingId: booking._id
            });

            if (verifyResponse.data.success) {
              toast.success('Payment successful! Booking confirmed.');
              window.location.href = `/bookings/${booking._id}`;
            } else {
              toast.error('Payment verification failed');
            }
          } catch (error) {
            toast.error('Payment verification failed');
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: user.phone
        },
        theme: {
          color: '#4F46E5'
        },
        modal: {
          ondismiss: function() {
            toast.error('Payment cancelled');
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error('Payment initiation failed');
    }
  };

  if (!user) {
    return (
      <div className="card p-6 text-center">
        <h3 className="text-lg font-semibold mb-2">Login Required</h3>
        <p className="text-gray-600 mb-4">Please login to book this event</p>
        <a href="/login" className="btn-primary">
          Login Now
        </a>
      </div>
    );
  }

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold mb-4">Book This Event</h3>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Number of Participants
          </label>
          <select
            {...register('participants', { 
              required: 'Number of participants is required',
              min: { value: 1, message: 'At least 1 participant required' },
              max: { 
                value: Math.min(10, availability.availableSeats), 
                message: 'Cannot exceed available seats' 
              }
            })}
            className="input-field"
          >
            {Array.from({ length: Math.min(10, availability.availableSeats) }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} {i === 0 ? 'person' : 'people'}
              </option>
            ))}
          </select>
          {errors.participants && (
            <p className="text-red-600 text-sm mt-1">{errors.participants.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Preferred Language
          </label>
          <select
            {...register('preferredLanguage', { required: 'Language is required' })}
            className="input-field"
          >
            <option value="">Select a language</option>
            {event.languages?.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
          {errors.preferredLanguage && (
            <p className="text-red-600 text-sm mt-1">{errors.preferredLanguage.message}</p>
          )}
        </div>

        {/* Participant Details */}
        {Array.from({ length: participants }, (_, i) => (
          <div key={i} className="border rounded-lg p-4">
            <h4 className="font-medium mb-3">Participant {i + 1} Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  {...register(`participant_${i}_name`)}
                  className="input-field"
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Age
                </label>
                <input
                  type="number"
                  {...register(`participant_${i}_age`)}
                  className="input-field"
                  placeholder="Age"
                  min="1"
                  max="100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nationality
                </label>
                <input
                  type="text"
                  {...register(`participant_${i}_nationality`)}
                  className="input-field"
                  placeholder="Nationality"
                  defaultValue="Indian"
                />
              </div>
            </div>
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Special Requests
          </label>
          <textarea
            {...register('specialRequests')}
            rows="3"
            className="input-field"
            placeholder="Any special requirements or requests..."
          />
        </div>

        {/* Booking Summary */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold mb-2">Booking Summary</h4>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Participants:</span>
              <span>{participants}</span>
            </div>
            <div className="flex justify-between">
              <span>Price per person:</span>
              <span>₹{event.price}</span>
            </div>
            <div className="flex justify-between font-semibold border-t pt-2">
              <span>Total Amount:</span>
              <span>₹{totalAmount}</span>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={createBookingMutation.isLoading || availability.availableSeats === 0}
          className="w-full btn-primary disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {createBookingMutation.isLoading ? 'Processing...' : 
           availability.availableSeats === 0 ? 'Sold Out' : 
           totalAmount > 0 ? `Pay ₹${totalAmount}` : 'Confirm Booking'}
        </button>

        {availability.availableSeats < 5 && availability.availableSeats > 0 && (
          <p className="text-orange-600 text-sm text-center">
            Only {availability.availableSeats} seats left!
          </p>
        )}
      </form>
    </div>
  );
};

export default BookingForm;