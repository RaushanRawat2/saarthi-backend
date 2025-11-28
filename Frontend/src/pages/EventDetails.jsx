import React from 'react';
import { useParams } from 'react-router-dom';
import { useEvent, useEventAvailability } from '../hooks/useEvents';
import Layout from '../components/Layout/Layout';
import BookingForm from '../components/Booking/BookingForm';
import { Calendar, Clock, MapPin, Users, Star, ArrowLeft } from 'lucide-react';
import { formatDate, formatTime } from '../utils/dateUtils';
import { Link } from 'react-router-dom';

const EventDetails = () => {
  const { id } = useParams();
  const { data: event, isLoading } = useEvent(id);
  const { data: availability } = useEventAvailability(id);

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <div className="h-64 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!event) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h1>
          <p className="text-gray-600 mb-8">The event you're looking for doesn't exist.</p>
          <Link to="/events" className="btn-primary">
            Browse Events
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link
          to="/events"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Events
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Event Details */}
          <div className="lg:col-span-2">
            <div className="card p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                    {event.title}
                  </h1>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {event.type.replace('_', ' ')}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">
                    {event.price === 0 ? 'Free' : `₹${event.price}`}
                  </div>
                  <div className="text-sm text-gray-500">per person</div>
                </div>
              </div>

              <p className="text-gray-600 mb-6">{event.description}</p>

              {/* Event Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-5 h-5 mr-3" />
                  <div>
                    <div className="font-medium">Date</div>
                    <div>{formatDate(event.date)}</div>
                  </div>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-3" />
                  <div>
                    <div className="font-medium">Time</div>
                    <div>{formatTime(event.startTime)} - {formatTime(event.endTime)}</div>
                  </div>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-3" />
                  <div>
                    <div className="font-medium">Location</div>
                    <div>{event.location}</div>
                  </div>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="w-5 h-5 mr-3" />
                  <div>
                    <div className="font-medium">Availability</div>
                    <div>
                      {availability ? (
                        <>
                          {availability.availableSeats} / {availability.totalCapacity} seats
                          {availability.availableSeats < 5 && availability.availableSeats > 0 && (
                            <span className="ml-2 text-orange-600 text-sm">(Almost Full)</span>
                          )}
                        </>
                      ) : (
                        'Loading...'
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              {event.requirements && event.requirements.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Requirements</h3>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {event.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}

              {event.guideInfo && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Guide Information</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <Star className="w-4 h-4 text-yellow-500 mr-2" />
                      <span className="font-medium">{event.guideInfo.name}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{event.guideInfo.experience}</p>
                    <div className="text-sm">
                      <span className="font-medium">Languages: </span>
                      {event.guideInfo.languages?.join(', ')}
                    </div>
                  </div>
                </div>
              )}

              {event.accommodationIncluded && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h3 className="font-semibold text-green-800 mb-2">Accommodation Included</h3>
                  <p className="text-green-700 text-sm">{event.accommodationDetails}</p>
                </div>
              )}
            </div>

            {/* Monastery Information */}
            {event.monastery && (
              <div className="card p-6">
                <h2 className="text-xl font-semibold mb-4">About {event.monastery.name}</h2>
                <p className="text-gray-600 mb-4">{event.monastery.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <h4 className="font-medium mb-2">Location</h4>
                    <p className="text-gray-600">{event.monastery.location.address}</p>
                    <p className="text-gray-600">{event.monastery.location.city}, Sikkim</p>
                  </div>
                  
                  {event.monastery.contact && (
                    <div>
                      <h4 className="font-medium mb-2">Contact</h4>
                      <p className="text-gray-600">{event.monastery.contact.phone}</p>
                      <p className="text-gray-600">{event.monastery.contact.email}</p>
                    </div>
                  )}
                </div>

                {event.monastery.facilities && event.monastery.facilities.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Facilities</h4>
                    <div className="flex flex-wrap gap-2">
                      {event.monastery.facilities.map((facility, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                        >
                          {facility}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Booking Section */}
          <div className="lg:col-span-1">
            {availability && (
              <BookingForm event={event} availability={availability} />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EventDetails;