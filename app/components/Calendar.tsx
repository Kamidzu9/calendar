import React from "react";

interface CalendarProps {
  currentDate: Date;
  events: Array<{
    id: string;
    title: string;
    startTime: Date;
    endTime: Date;
    description?: string;
  }>;
}

const Calendar: React.FC<CalendarProps> = ({ currentDate, events }) => {
  const renderEvents = () => {
    return events.map((event) => (
      <div key={event.id} className="event">
        <h3>{event.title}</h3>
        <p>
          {event.startTime.toLocaleTimeString()} -{" "}
          {event.endTime.toLocaleTimeString()}
        </p>
        {event.description && <p>{event.description}</p>}
      </div>
    ));
  };

  return (
    <div className="calendar">
      <h1>{currentDate.toLocaleDateString()}</h1>
      <div className="events">{renderEvents()}</div>
    </div>
  );
};

export default Calendar;
