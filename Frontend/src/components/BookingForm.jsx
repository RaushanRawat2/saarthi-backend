import { useState } from "react";
import API from "../api/api";
import { toast } from "react-toastify";

export default function BookingForm({ monasteries, token }) {
  const [form, setForm] = useState({
    monastery: "",
    date: "",
    participants: 1, // renamed for backend consistency
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post(
        "/bookings",
        {
          monastery: form.monastery,
          date: form.date,
          participants: form.participants,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success("Booking request submitted!");
      setForm({ monastery: "", date: "", participants: 1 });
    } catch (err) {
      toast.error(err.response?.data?.message || "Booking failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-monastery rounded-2xl p-6 space-y-4 animate-fadeIn"
    >
      <h2 className="text-2xl font-bold text-monastery-maroon mb-4">
        Book a Visit
      </h2>

      {/* Monastery Selector */}
      <select
        name="monastery"
        value={form.monastery}
        onChange={handleChange}
        className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary"
        required
      >
        <option value="">Select Monastery</option>
        {monasteries.map((m) => (
          <option key={m._id} value={m._id}>
            {m.name}
          </option>
        ))}
      </select>

      {/* Date */}
      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
        className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary"
        required
      />

      {/* Participants */}
      <input
        type="number"
        name="participants"
        value={form.participants}
        onChange={handleChange}
        min="1"
        className="w-full p-3 border border-border rounded-lg focus:ring-2 focus:ring-primary"
        required
      />

      {/* Button */}
      <button
        type="submit"
        className="w-full bg-monastery-maroon hover:bg-monastery-gold text-white py-3 rounded-lg shadow-golden font-semibold transition duration-300"
      >
        Submit Booking
      </button>
    </form>
  );
}
