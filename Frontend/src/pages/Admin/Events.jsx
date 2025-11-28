import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import Layout from '../../components/Layout/Layout';
import { Plus, Edit, Trash2, Calendar, MapPin, Users } from 'lucide-react';
import { formatDate, formatTime } from '../../utils/dateUtils';
import toast from 'react-hot-toast';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AdminEvents = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const queryClient = useQueryClient();

  const { data: eventsData, isLoading } = useQuery(
    'admin-events',
    () => axios.get(`${API_BASE_URL}/admin/events`).then(res => res.data)
  );

  const deleteEventMutation = useMutation(
    (eventId) => axios.delete(`${API_BASE_URL}/events/${eventId}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('admin-events');
        toast.success('Event deleted successfully');
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to delete event');
      }
    }
  );

  const handleDeleteEvent = (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      deleteEventMutation.mutate(eventId);
    }
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
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Events</h1>
            <p className="mt-2 text-gray-600">
              Create and manage events across all monasteries
            </p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="btn-primary flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Create Event
          </button>
        </div>

        {/* Events List */}
        <div className="space-y-6">
          {eventsData?.events?.map((event) => (
            <div key={event._id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
                  <p className="text-gray-600 mt-1">{event.description}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingEvent(event)}
                    className="text-blue-600 hover:text-blue-700 p-2"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteEvent(event._id)}
                    className="text-red-600 hover:text-red-700 p-2"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {formatDate(event.date)}
                </div>
                <div className="flex items-center">
                  <span className="mr-2">⏰</span>
                  {formatTime(event.startTime)} - {formatTime(event.endTime)}
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  {event.location}
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  {event.bookedSeats} / {event.capacity} booked
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  event.status === 'active' 
                    ? 'bg-green-100 text-green-800'
                    : event.status === 'cancelled'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {event.status}
                </span>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {event.type.replace('_', ' ')}
                </span>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  ₹{event.price}
                </span>
              </div>

              {event.monastery && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-gray-600">
                    <strong>Monastery:</strong> {event.monastery.name}
                  </p>
                </div>
              )}
            </div>
          ))}

          {(!eventsData?.events || eventsData.events.length === 0) && (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
              <p className="text-gray-600 mb-6">Get started by creating your first event.</p>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="btn-primary"
              >
                Create Event
              </button>
            </div>
          )}
        </div>

        {/* Create/Edit Event Modal */}
        {(isCreateModalOpen || editingEvent) && (
          <EventModal
            event={editingEvent}
            onClose={() => {
              setIsCreateModalOpen(false);
              setEditingEvent(null);
            }}
            onSuccess={() => {
              setIsCreateModalOpen(false);
              setEditingEvent(null);
              queryClient.invalidateQueries('admin-events');
            }}
          />
        )}
      </div>
    </Layout>
  );
};

// Event Modal Component
const EventModal = ({ event, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: event?.title || '',
    description: event?.description || '',
    type: event?.type || 'guided_tour',
    date: event?.date ? new Date(event.date).toISOString().split('T')[0] : '',
    startTime: event?.startTime || '09:00',
    endTime: event?.endTime || '17:00',
    location: event?.location || '',
    capacity: event?.capacity || 20,
    price: event?.price || 0,
    languages: event?.languages || ['English'],
    requirements: event?.requirements || [],
    monastery: event?.monastery?._id || ''
  });

  const [monasteries, setMonasteries] = useState([]);

  useEffect(() => {
    const fetchMonasteries = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/monasteries`);
        setMonasteries(response.data);
      } catch (error) {
        console.error('Failed to fetch monasteries:', error);
      }
    };

    fetchMonasteries();
  }, []);

  const createEventMutation = useMutation(
    (data) => axios.post(`${API_BASE_URL}/events`, data),
    {
      onSuccess: () => {
        toast.success('Event created successfully');
        onSuccess();
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to create event');
      }
    }
  );

  const updateEventMutation = useMutation(
    (data) => axios.put(`${API_BASE_URL}/events/${event._id}`, data),
    {
      onSuccess: () => {
        toast.success('Event updated successfully');
        onSuccess();
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to update event');
      }
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const submitData = {
      ...formData,
      capacity: parseInt(formData.capacity),
      price: parseFloat(formData.price)
    };

    if (event) {
      updateEventMutation.mutate(submitData);
    } else {
      createEventMutation.mutate(submitData);
    }
  };

  const eventTypes = [
    'guided_tour',
    'meditation_retreat',
    'cultural_workshop', 
    'spiritual_teaching',
    'festival',
    'volunteer_activity'
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">
            {event ? 'Edit Event' : 'Create New Event'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows="3"
                className="input-field"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="input-field"
                  required
                >
                  {eventTypes.map(type => (
                    <option key={type} value={type}>
                      {type.replace('_', ' ')}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Monastery</label>
                <select
                  value={formData.monastery}
                  onChange={(e) => setFormData({ ...formData, monastery: e.target.value })}
                  className="input-field"
                  required
                >
                  <option value="">Select Monastery</option>
                  {monasteries.map(monastery => (
                    <option key={monastery._id} value={monastery._id}>
                      {monastery.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="input-field"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Start Time</label>
                  <input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">End Time</label>
                  <input
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    className="input-field"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="input-field"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Capacity</label>
                <input
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                  className="input-field"
                  min="1"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="input-field"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={createEventMutation.isLoading || updateEventMutation.isLoading}
                className="btn-primary disabled:bg-gray-400"
              >
                {createEventMutation.isLoading || updateEventMutation.isLoading 
                  ? 'Saving...' 
                  : event ? 'Update Event' : 'Create Event'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminEvents;