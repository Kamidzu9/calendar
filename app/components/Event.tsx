import React from "react";

interface EventProps {
  title: string;
  time: string;
  description?: string;
}

const Event: React.FC<EventProps> = ({ title, time, description }) => {
  return (
    <div className="event">
      <h3 className="event-title">{title}</h3>
      <p className="event-time">{time}</p>
      {description && <p className="event-description">{description}</p>}
    </div>
  );
};

export default Event;
