import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import { Users, Calendar, Heart, Star } from 'lucide-react';
import ParticipationForm from '../components/ParticipationForm';

const ParticipationPage = () => {
  const participationOptions = [
    {
      icon: Calendar,
      title: 'Events & Workshops',
      description: 'Join cultural events, workshops, and spiritual teachings',
      features: ['Cultural Workshops', 'Spiritual Teachings', 'Festival Celebrations'],
      link: '/events'
    },
    {
      icon: Users,
      title: 'Guided Tours',
      description: 'Explore monasteries with expert guides',
      features: ['Daily Guided Tours', 'Multi-language Support', 'Small Group Sizes'],
      link: '/events?type=guided_tour'
    },
    {
      icon: Heart,
      title: 'Volunteer Programs',
      description: 'Contribute to monastery preservation and community service',
      features: ['Monastery Maintenance', 'Community Service', 'Cultural Preservation'],
      link: '/events?type=volunteer_activity'
    },
    {
      icon: Star,
      title: 'Meditation Retreats',
      description: 'Deepen your practice with guided meditation retreats',
      features: ['Daily Meditation', 'Yoga Sessions', 'Spiritual Guidance'],
      link: '/events?type=meditation_retreat'
    }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Participation Opportunities
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Immerse yourself in the rich cultural and spiritual heritage of Sikkim's monasteries. 
            Choose from various participation options tailored for different interests and schedules.
          </p>
        </div>

        {/* Quick Registration Form */}
        <div className="mb-12">
          <ParticipationForm />
        </div>

        {/* Participation Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {participationOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 ml-4">
                    {option.title}
                  </h3>
                </div>
                
                <p className="text-gray-600 mb-4">
                  {option.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {option.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  to={option.link}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Explore Options
                  <Calendar className="w-4 h-4 ml-2" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Additional Information */}
        <div className="bg-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Why Participate?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Cultural Immersion</h3>
              <p className="text-gray-600 text-sm">
                Experience authentic Buddhist traditions and Sikkimese culture firsthand
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Spiritual Growth</h3>
              <p className="text-gray-600 text-sm">
                Learn meditation techniques and Buddhist philosophy from experienced practitioners
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Community Connection</h3>
              <p className="text-gray-600 text-sm">
                Connect with like-minded individuals and local communities
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-gray-600 mb-6">
            Browse all available events and find the perfect participation opportunity for you.
          </p>
          <Link
            to="/events"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg"
          >
            Browse All Events
            <Users className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default ParticipationPage;
