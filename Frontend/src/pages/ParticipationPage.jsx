import { useEffect, useState } from "react";
import ParticipationForm from "../components/ParticipationForm";
import API from "../api/api";

export default function ParticipationPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await API.get("/events"); // backend should have event list
      setEvents(res.data);
    };
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <ParticipationForm events={events} />
    </div>
  );
}
