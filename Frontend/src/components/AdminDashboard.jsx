import { useEffect, useState } from "react";
import API from "../api/api";
import { toast } from "react-toastify";

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [participations, setParticipations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res1 = await API.get("/bookings/my"); // update with admin-specific API if needed
      const res2 = await API.get("/participations/my");
      setBookings(res1.data.data);
      setParticipations(res2.data.data);
    };
    fetchData();
  }, []);

  const updateBooking = async (id, status) => {
    try {
      await API.put(`/bookings/${id}`, { status });
      toast.success("Booking updated");
    } catch {
      toast.error("Update failed");
    }
  };

  const updateParticipation = async (id, status) => {
    try {
      await API.put(`/participations/${id}`, { status });
      toast.success("Participation updated");
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Bookings */}
      <div className="bg-white p-4 rounded-2xl shadow-md">
        <h2 className="text-lg font-bold mb-4">Bookings</h2>
        {bookings.map((b) => (
          <div key={b._id} className="border p-3 rounded-lg mb-2">
            <p><strong>Monastery:</strong> {b.monastery?.name}</p>
            <p><strong>Date:</strong> {new Date(b.date).toLocaleDateString()}</p>
            <p><strong>People:</strong> {b.numberOfPeople}</p>
            <p><strong>Status:</strong> {b.status}</p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => updateBooking(b._id, "confirmed")}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                Confirm
              </button>
              <button
                onClick={() => updateBooking(b._id, "cancelled")}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Participations */}
      <div className="bg-white p-4 rounded-2xl shadow-md">
        <h2 className="text-lg font-bold mb-4">Participations</h2>
        {participations.map((p) => (
          <div key={p._id} className="border p-3 rounded-lg mb-2">
            <p><strong>Event:</strong> {p.event?.title}</p>
            <p><strong>Status:</strong> {p.status}</p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => updateParticipation(p._id, "attended")}
                className="bg-blue-500 text-white px-3 py-1 rounded"
              >
                Mark Attended
              </button>
              <button
                onClick={() => updateParticipation(p._id, "cancelled")}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
