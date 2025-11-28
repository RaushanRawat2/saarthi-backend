import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import Layout from '../../components/Layout/Layout';
import { Search, Filter, CheckCircle, XCircle } from 'lucide-react';
import { formatDate, formatTime } from '../../utils/dateUtils';
import toast from 'react-hot-toast';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const AdminBookings = () => {
  const [filters, setFilters] = useState({
    status: '',
    search: ''
  });

  const { data: bookingsData, isLoading } = useQuery(
    ['admin-bookings', filters],
    () => axios.get(`${API_BASE_URL}/admin/bookings`, { 
      params: filters 
    }).then(res => res.data)
  );

  const queryClient = useQueryClient();

  const updateBookingMutation = useMutation(
    ({ bookingId, status }) => 
      axios.put(`${API_BASE_URL}/admin/bookings/${bookingId}`, { status }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('admin-bookings');
        toast.success('Booking updated successfully');
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to update booking');
      }
    }
  );

  const handleStatusUpdate = (bookingId, status) => {
    updateBookingMutation.mutate({ bookingId, status });
  };

  const clearFilters = () => {
    setFilters({ status: '', search: '' });
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white rounded-lg shadow p-6">
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
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Bookings</h1>
          <p className="mt-2 text-gray-600">
            View and manage all bookings across events
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Bookings
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  placeholder="Search by user name, email, or booking ID..."
                  className="input-field pl-10"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                className="input-field"
              >
                <option value="">All Status</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <button
              onClick={clearFilters}
              className="btn-secondary whitespace-nowrap"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-6">
          {bookingsData?.bookings?.map((booking) => (
            <div key={booking._id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {booking.event.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Booking ID: {booking.bookingId}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    booking.status === 'confirmed' 
                      ? 'bg-green-100 text-green-800'
                      : booking.status === 'cancelled'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {booking.status}
                  </span>
                  <p className="text-lg font-semibold text-gray-900 mt-1">
                    ₹{booking.totalAmount}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                <div>
                  <p><strong>User:</strong> {booking.user.name}</p>
                  <p><strong>Email:</strong> {booking.user.email}</p>
                  <p><strong>Phone:</strong> {booking.user.phone}</p>
                </div>
                <div>
                  <p><strong>Date:</strong> {formatDate(booking.event.date)}</p>
                  <p><strong>Time:</strong> {formatTime(booking.event.startTime)}</p>
                  <p><strong>Participants:</strong> {booking.participants}</p>
                </div>
              </div>

              {booking.event.monastery && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600">
                    <strong>Monastery:</strong> {booking.event.monastery.name}
                  </p>
                </div>
              )}

              {booking.specialRequests && (
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <strong>Special Requests:</strong> {booking.specialRequests}
                  </p>
                </div>
              )}

              <div className="flex justify-between items-center pt-4 border-t">
                <div className="text-sm text-gray-500">
                  <p>Payment: 
                    <span className={`ml-1 font-medium ${
                      booking.paymentStatus === 'paid' 
                        ? 'text-green-600'
                        : booking.paymentStatus === 'pending'
                        ? 'text-orange-600'
                        : 'text-red-600'
                    }`}>
                      {booking.paymentStatus}
                    </span>
                  </p>
                  {booking.attendance.checkedIn && (
                    <p className="text-green-600 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Checked in at {formatTime(booking.attendance.checkedInAt)}
                    </p>
                  )}
                </div>

                <div className="flex space-x-2">
                  {booking.status === 'confirmed' && (
                    <>
                      <button
                        onClick={() => handleStatusUpdate(booking._id, 'completed')}
                        className="text-green-600 hover:text-green-700 text-sm font-medium"
                      >
                        Mark Complete
                      </button>
                      <button
                        onClick={() => handleStatusUpdate(booking._id, 'cancelled')}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}

          {(!bookingsData?.bookings || bookingsData.bookings.length === 0) && (
            <div className="text-center py-12">
              <Filter className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
              <p className="text-gray-600">
                {filters.status || filters.search ? 'Try adjusting your filters' : 'No bookings have been made yet'}
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdminBookings;