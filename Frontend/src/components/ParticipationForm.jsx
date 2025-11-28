
/*import { useState } from "react";
import API from "../api/api";
import { toast } from "react-toastify";

export default function ParticipationForm({ events }) {
  const [event, setEvent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/participations", { event });
      toast.success("Successfully registered for the event!");
      setEvent("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-2xl p-6 max-w-md mx-auto space-y-4"
    >
      <h2 className="text-xl font-bold">Participate in an Event</h2>

      <select
        name="event"
        value={event}
        onChange={(e) => setEvent(e.target.value)}
        className="w-full p-2 border rounded-lg"
        required
      >
        <option value="">Select Event</option>
        {events.map((ev) => (
          <option key={ev._id} value={ev._id}>
            {ev.title} - {new Date(ev.date).toLocaleDateString()}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
      >
        Register
      </button>
    </form>
  );
}
*/




import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export default function ParticipationForm() {
  const [event, setEvent] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch events when component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/events`);
        setEvents(response.data.events || []);
      } catch (err) {
        console.error("Failed to fetch events:", err);
        toast.error("Failed to load events");
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!event) {
      toast.error("Please select an event");
      return;
    }

    try {
      // First create a booking for the event
      const bookingData = {
        eventId: event,
        participants: 1,
        preferredLanguage: "English",
        specialRequests: "Participation form registration"
      };

      const response = await axios.post(`${API_BASE_URL}/bookings`, bookingData);
      
      toast.success("Successfully registered for the event!");
      setEvent("");
      
      // If the event has a price, redirect to payment
      const selectedEvent = events.find(ev => ev._id === event);
      if (selectedEvent && selectedEvent.price > 0) {
        toast.success("Please complete payment to confirm your registration");
        // You can redirect to booking details page or payment page
        window.location.href = `/bookings/${response.data.booking._id}`;
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  if (loading) {
    return (
      <div className="bg-white shadow-md rounded-2xl p-6 max-w-md mx-auto space-y-4">
        <h2 className="text-xl font-bold">Participate in an Event</h2>
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded mb-4"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-2xl p-6 max-w-md mx-auto space-y-4"
    >
      <h2 className="text-xl font-bold">Participate in an Event</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Event
        </label>
        <select
          name="event"
          value={event}
          onChange={(e) => setEvent(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        >
          <option value="">Choose an event...</option>
          {events.map((ev) => (
            <option key={ev._id} value={ev._id}>
              {ev.title} - {new Date(ev.date).toLocaleDateString()} 
              {ev.price > 0 ? ` (₹${ev.price})` : ' (Free)'}
            </option>
          ))}
        </select>
      </div>

      {events.length === 0 && !loading && (
        <div className="text-center text-gray-500 py-4">
          No events available at the moment.
        </div>
      )}

      <button
        type="submit"
        disabled={!event || events.length === 0}
        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        Register for Event
      </button>
    </form>
  );
}