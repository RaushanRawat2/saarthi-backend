import { useState } from "react";
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
