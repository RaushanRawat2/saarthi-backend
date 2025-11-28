import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { formatDate, formatTime } from '../../utils/dateUtils';

const EventCard = ({ event }) => {
  const availableSeats = event.capacity - event.bookedSeats;
  const isAlmostFull = availableSeats < event.capacity * 0.2;

  return (
    <div className="card p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {event.title}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {event.description}
          </p>
        </div>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {event.type.replace('_', ' ')}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="w-4 h-4 mr-2" />
          {formatDate(event.date)}
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="w-4 h-4 mr-2" />
          {formatTime(event.startTime)} - {formatTime(event.endTime)}
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <MapPin className="w-4 h-4 mr-2" />
          {event.location}
        </div>
        {event.monastery && (
          <div className="flex items-center text-sm text-gray-500">
            <span className="font-medium">Monastery:</span>
            <span className="ml-1">{event.monastery.name}</span>
          </div>
        )}
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-sm text-gray-500">
            <Users className="w-4 h-4 mr-1" />
            {availableSeats} / {event.capacity} seats
          </div>
          {isAlmostFull && availableSeats > 0 && (
            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-orange-100 text-orange-800">
              Almost Full
            </span>
          )}
        </div>
        
        <div className="text-right">
          <div className="text-lg font-semibold text-gray-900">
            {event.price === 0 ? 'Free' : `₹${event.price}`}
          </div>
          <Link
            to={`/events/${event._id}`}
            className="btn-primary text-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;