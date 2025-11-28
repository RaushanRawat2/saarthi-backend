import React, { useState, useEffect } from 'react';
import { useEvents } from '../hooks/useEvents';
import EventCard from '../components/Event/EventCard';
import Layout from '../components/Layout/Layout';
import { Search, Filter, Calendar } from 'lucide-react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Events = () => {
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    monastery: '',
    date: '',
    page: 1,
  });
  
  const [monasteries, setMonasteries] = useState([]);

  const { data: eventsData, isLoading } = useEvents(filters);

  const eventTypes = [
    'guided_tour',
    'meditation_retreat',
    'cultural_workshop',
    'spiritual_teaching',
    'festival',
    'volunteer_activity',
  ];

  // Fetch monasteries on component mount
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

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1,
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      type: '',
      monastery: '',
      date: '',
      page: 1,
    });
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Events & Activities</h1>
          <p className="mt-2 text-gray-600">
            Discover spiritual events, guided tours, and cultural activities across Sikkim's monasteries
          </p>
        </div>

        {/* Filters */}
        <div className="card p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              Filters
            </h2>
            <button
              onClick={clearFilters}
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              Clear All
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search Events
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  placeholder="Search events..."
                  className="input-field pl-10"
                />
              </div>
            </div>

            {/* Event Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Type
              </label>
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="input-field"
              >
                <option value="">All Types</option>
                {eventTypes.map((type) => (
                  <option key={type} value={type}>
                    {type.replace('_', ' ')}
                  </option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Calendar className="w-4 h-4 inline mr-1" />
                Date
              </label>
              <input
                type="date"
                value={filters.date}
                onChange={(e) => handleFilterChange('date', e.target.value)}
                className="input-field"
              />
            </div>

            {/* Monastery - Now using actual monastery IDs */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Monastery
              </label>
              <select
                value={filters.monastery}
                onChange={(e) => handleFilterChange('monastery', e.target.value)}
                className="input-field"
              >
                <option value="">All Monasteries</option>
                {monasteries.map(monastery => (
                  <option key={monastery._id} value={monastery._id}>
                    {monastery.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        {isLoading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="card p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3 mb-4"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : eventsData?.events?.length > 0 ? (
          <>
            <div className="mb-4 text-sm text-gray-600">
              Showing {eventsData.events.length} of {eventsData.total} events
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {eventsData.events.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>

            {/* Pagination */}
            {eventsData.totalPages > 1 && (
              <div className="mt-8 flex justify-center">
                <nav className="flex space-x-2">
                  {Array.from({ length: eventsData.totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => handleFilterChange('page', i + 1)}
                      className={`px-3 py-2 rounded-lg ${
                        eventsData.currentPage === i + 1
                          ? 'bg-primary-600 text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </nav>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-600">
              Try adjusting your search filters or check back later for new events.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Events;