import React from 'react';
import { Link } from 'react-router-dom';
import { useEvents } from '../hooks/useEvents';
import EventCard from '../components/Event/EventCard';
import Layout from '../components/Layout/Layout';
import { Calendar, Users, MapPin, Star } from 'lucide-react';

const Home = () => {
  const { data: eventsData, isLoading } = useEvents({ limit: 3 });

  const features = [
    {
      icon: Calendar,
      title: 'Easy Booking',
      description: 'Book monastery events, tours, and retreats with just a few clicks'
    },
    {
      icon: Users,
      title: 'Group Participation',
      description: 'Bring your friends and family with flexible group booking options'
    },
    {
      icon: MapPin,
      title: 'Multiple Locations',
      description: 'Explore various monasteries across beautiful Sikkim'
    },
    {
      icon: Star,
      title: 'Cultural Experience',
      description: 'Immerse yourself in authentic Buddhist culture and traditions'
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-white">
        <div className="relative bg-gradient-to-r from-primary-600 to-primary-800">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-black opacity-20"></div>
          </div>
          <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Discover the Spiritual Heritage of Sikkim
            </h1>
            <p className="mt-6 text-xl text-primary-100 max-w-3xl">
              Experience the serenity of Himalayan monasteries. Book guided tours, meditation retreats, 
              and cultural events across the most beautiful monasteries in Sikkim.
            </p>
            <div className="mt-10">
              <Link
                to="/events"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50 md:py-4 md:text-lg md:px-8"
              >
                Explore Events
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">
                Features
              </h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Why Choose Monastery Tourism?
              </p>
            </div>

            <div className="mt-10">
              <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                {features.map((feature) => (
                  <div key={feature.title} className="relative">
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <div className="ml-16">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {feature.title}
                      </h3>
                      <p className="mt-2 text-base text-gray-500">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Featured Events Section */}
        <div className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Upcoming Events
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Don't miss these amazing spiritual experiences
              </p>
            </div>

            {isLoading ? (
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map(i => (
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
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {eventsData.events.map((event) => (
                  <EventCard key={event._id} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No upcoming events at the moment.</p>
              </div>
            )}

            <div className="text-center mt-8">
              <Link
                to="/events"
                className="btn-primary"
              >
                View All Events
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;