import { useEffect, useState, useContext } from "react";
import BookingForm from "../components/BookingForm";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function BookingPage() {
  const [monasteries, setMonasteries] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get("/monasteries"); // ✅ backend should return monastery list
        setMonasteries(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load monasteries");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gradient-monastery">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-monastery animate-fadeIn">
        <h2 className="text-2xl font-bold mb-4 text-monastery-maroon">
          Book Your Monastery Visit
        </h2>

        {/* ✅ BookingForm handles booking submission */}
        <BookingForm monasteries={monasteries} token={user?.token} />
      </div>
    </div>
  );
}
