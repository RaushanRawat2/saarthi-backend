import React, { useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import Layout from '../../components/Layout/Layout';
import { Users, Calendar, DollarSign, TrendingUp, BarChart3, QrCode } from 'lucide-react';
import { Link } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AdminDashboard = () => {
  const [period, setPeriod] = useState('month');

  const { data: analytics, isLoading } = useQuery(
    ['admin-analytics', period],
    () => axios.get(`${API_BASE_URL}/admin/analytics?period=${period}`).then(res => res.data)
  );

  const stats = [
    {
      name: 'Total Bookings',
      value: analytics?.totalBookings || 0,
      icon: Calendar,
      color: 'bg-blue-500'
    },
    {
      name: 'Total Revenue',
      value: `₹${analytics?.totalRevenue || 0}`,
      icon: DollarSign,
      color: 'bg-green-500'
    },
    {
      name: 'Total Events',
      value: analytics?.totalEvents || 0,
      icon: TrendingUp,
      color: 'bg-purple-500'
    },
    {
      name: 'New Users',
      value: analytics?.totalUsers || 0,
      icon: Users,
      color: 'bg-orange-500'
    }
  ];

  const quickActions = [
    {
      name: 'Manage Events',
      description: 'Create and manage events',
      href: '/admin/events',
      icon: Calendar,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      name: 'View Bookings',
      description: 'Manage all bookings',
      href: '/admin/bookings',
      icon: Users,
      color: 'text-green-600 bg-green-50'
    },
    {
      name: 'QR Scanner',
      description: 'Scan QR codes for attendance',
      href: '/admin/qr-scanner',
      icon: QrCode,
      color: 'text-purple-600 bg-purple-50'
    },
    {
      name: 'Analytics',
      description: 'Detailed analytics report',
      href: '/admin/analytics',
      icon: BarChart3,
      color: 'text-orange-600 bg-orange-50'
    }
  ];

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="bg-white rounded-lg shadow p-6">
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
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
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="mt-2 text-gray-600">
                Overview of your monastery tourism platform
              </p>
            </div>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="input-field w-auto"
            >
              <option value="day">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((item) => (
            <div key={item.name} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-full ${item.color} bg-opacity-10`}>
                  <item.icon className={`w-6 h-6 ${item.color.replace('bg-', 'text-')}`} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{item.name}</p>
                  <p className="text-2xl font-semibold text-gray-900">{item.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickActions.map((action) => (
            <Link
              key={action.name}
              to={action.href}
              className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center">
                <div className={`p-3 rounded-full ${action.color} bg-opacity-10`}>
                  <action.icon className={`w-6 h-6 ${action.color.split(' ')[0]}`} />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">{action.name}</h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Popular Monasteries */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Popular Monasteries</h2>
          <div className="space-y-4">
            {analytics?.popularMonasteries?.map((monastery, index) => (
              <div key={monastery._id} className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-lg font-semibold text-gray-500 w-6">{index + 1}.</span>
                  <div className="ml-4">
                    <h4 className="text-sm font-medium text-gray-900">{monastery.monasteryName}</h4>
                    <p className="text-sm text-gray-500">{monastery.totalBookings} bookings</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{monastery.totalVisitors} visitors</p>
                </div>
              </div>
            ))}
            {(!analytics?.popularMonasteries || analytics.popularMonasteries.length === 0) && (
              <p className="text-gray-500 text-center py-4">No data available</p>
            )}
          </div>
        </div>

        {/* Event Types Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Event Types Distribution</h2>
          <div className="space-y-3">
            {analytics?.eventTypeDistribution?.map((eventType) => (
              <div key={eventType._id} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900 capitalize">
                  {eventType._id.replace('_', ' ')}
                </span>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">{eventType.count} bookings</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {eventType.totalParticipants} participants
                  </span>
                </div>
              </div>
            ))}
            {(!analytics?.eventTypeDistribution || analytics.eventTypeDistribution.length === 0) && (
              <p className="text-gray-500 text-center py-4">No data available</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;