import { useState, useEffect } from "react";
import "./TodayInHistoryCard.css";
import ShareButton from "./ShareButton";

const TodayInHistoryCard = () => {
  const [event, setEvent] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    const savedEvent = localStorage.getItem("historyEvent");
    const savedDate = localStorage.getItem("historyDate");
    const today = new Date().toISOString().split("T")[0];

    if (savedEvent && savedDate === today) {
      setEvent(savedEvent);
    } else {
      fetchHistoryEvent();
    }
  }, []);

  const fetchHistoryEvent = async () => {
    try {
      const todayDate = new Date().toISOString().slice(5, 10).replace("-", "/"); // Format: MM/DD
      const response = await fetch(`https://en.wikipedia.org/api/rest_v1/feed/onthisday/events/${todayDate}`);
  
      if (!response.ok) throw new Error("Failed to fetch");
  
      const data = await response.json();
      const events = data.events;
  
      if (!events || events.length === 0) throw new Error("No events found");
  
      const randomEvent = events[Math.floor(Math.random() * events.length)];
      const eventText = `${randomEvent.year}: ${randomEvent.text}`;
  
      setEvent(eventText);
      localStorage.setItem("historyEvent", eventText);
      localStorage.setItem("historyDate", new Date().toISOString().split("T")[0]);
      setError(false);
    } catch (error) {
      console.error("Error fetching historical event:", error);
      setEvent("No historical event found for today.");
      setError(true);
    }
  };

  const shareEvent = () => {
    if (navigator.share) {
      navigator.share({
        title: "Today in History",
        text: `On this day: ${event}`,
      }).catch((error) => console.error("Sharing failed", error));
    } else {
      navigator.clipboard.writeText(`On this day: ${event}`);
      alert("Event copied to clipboard!");
    }
  };

  return (
    <div className="history-container">
      <h2 className="history-title">Today in History</h2>
      <p className="history-text">{event}</p>
      {!error && <ShareButton action={shareEvent} />}
    </div>
  );
}

export default TodayInHistoryCard;
