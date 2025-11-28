import React, { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import axios from 'axios';
import Layout from '../components/Layout/Layout';
import { Calendar, MapPin, Users, Download } from 'lucide-react';
import { formatDate } from '../utils/dateUtils';
import QRCode from "qrcode.react";   // ✅ Correct import for Vite

const Bookings = () => {
  const [statusFilter, setStatusFilter] = useState('');

  // ✅ FIXED React Query v5 syntax
  const { data: bookingsData, isLoading } = useQuery({
    queryKey: ['bookings', statusFilter],
    queryFn: async () => {
      const res = await axios.get('/api/bookings/my-bookings', {
        params: statusFilter ? { status: statusFilter } : {}
      });
      return res.data;
    },
  });

  const downloadQRCode = (bookingId) => {
    const canvas = document.getElementById(`qrcode-${bookingId}`);
    if (canvas) {
      const pngUrl = canvas.toDataURL("image/png")
        .replace("image/png", "image/octet-stream");

      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `booking-${bookingId}.png`;

      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="card p-6">
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
          <p className="mt-2 text-gray-600">Manage your event bookings and access your QR codes</p>
        </div>

        {/* Filters */}
        <div className="card p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <span className="text-sm font-medium text-gray-700">Filter by status:</span>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="input-field text-sm"
            >
              <option value="">All Bookings</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        {/* Bookings List */}
        {bookingsData?.bookings?.length > 0 ? (
          <div className="space-y-6">
            {bookingsData.bookings.map((booking) => (
              <div key={booking._id} className="card p-6">

                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1">

                    {/* Title + Status */}
                    <div className="flex flex-col sm:flex-row sm:justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{booking.event.title}</h3>
                        <p className="text-gray-600 text-sm mt-1">Booking ID: {booking.bookingId}</p>
                      </div>

                      <div className="mt-2 sm:mt-0 text-right">
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          booking.status === 'confirmed'
                            ? 'bg-green-100 text-green-800'
                            : booking.status === 'cancelled'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>

                        <div className="text-lg font-semibold text-gray-900 mt-1">
                          ₹{booking.totalAmount}
                        </div>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {formatDate(booking.event.date)}
                      </div>

                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {booking.event.location}
                      </div>

                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-2" />
                        {booking.participants} participants
                      </div>

                      <div className="flex items-center">
                        <span className="font-medium mr-2">Language:</span>
                        {booking.preferredLanguage}
                      </div>
                    </div>

                    {/* Special Requests */}
                    {booking.specialRequests && (
                      <p className="mt-4 text-sm text-gray-600">
                        <span className="font-medium">Special Requests:</span> {booking.specialRequests}
                      </p>
                    )}

                    {/* Cancellation */}
                    {booking.cancellation?.cancelled && (
                      <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm text-red-800">
                          <span className="font-medium">Cancelled on:</span> {formatDate(booking.cancellation.cancelledAt)}
                          {booking.cancellation.reason && <> - {booking.cancellation.reason}</>}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* QR Code */}
                  {booking.status === 'confirmed' && booking.paymentStatus === 'paid' && (
                    <div className="mt-4 lg:mt-0 lg:ml-6 flex flex-col items-center">
                      <div className="bg-white p-3 rounded-lg border">
                        <QRCode
                          id={`qrcode-${booking._id}`}
                          value={JSON.stringify({
                            bookingId: booking.bookingId,
                            userId: booking.user._id,
                            eventId: booking.event._id,
                            valid: true,
                          })}
                          size={120}
                        />
                      </div>

                      <button
                        onClick={() => downloadQRCode(booking._id)}
                        className="mt-2 flex items-center text-sm text-primary-600 hover:text-primary-700"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Download QR
                      </button>

                      <p className="text-xs text-gray-500 mt-2 text-center">Present this QR code at the event</p>
                    </div>
                  )}
                </div>

                {/* Payment Status */}
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Payment:
                      <span className={`ml-1 font-medium ${
                        booking.paymentStatus === 'paid'
                          ? 'text-green-600'
                          : booking.paymentStatus === 'pending'
                          ? 'text-orange-600'
                          : 'text-red-600'
                      }`}>
                        {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                      </span>
                    </span>

                    {booking.status === 'confirmed' && (
                      <button
                        onClick={() => {
                          if (window.confirm("Cancel booking?")) {
                            axios.put(`/api/bookings/${booking._id}/cancel`)
                              .then(() => window.location.reload())
                              .catch((err) => alert(err.response?.data?.message || "Error cancelling"));
                          }
                        }}
                        className="text-sm text-red-600 hover:text-red-700"
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 mx-auto text-gray-400 mb-4" />

            <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>

            <p className="text-gray-600 mb-6">
              {statusFilter ? `No ${statusFilter} bookings found.` : "You have no bookings yet."}
            </p>

            <a href="/events" className="btn-primary">Browse Events</a>
          </div>
        )}

      </div>
    </Layout>
  );
};

export default Bookings;
