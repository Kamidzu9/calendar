"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    if (events.length === 0) {
      return (
        <div className="text-gray-400 text-center py-4">
          Keine Termine für heute.
        </div>
      );
    }
    return (
      <AnimatePresence>
        {events.map((event) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-4 border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-1">
              {event.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              {event.startTime.toLocaleTimeString("de-DE", {
                hour: "2-digit",
                minute: "2-digit",
                timeZone: "UTC",
              })}{" "}
              –{" "}
              {event.endTime.toLocaleTimeString("de-DE", {
                hour: "2-digit",
                minute: "2-digit",
                timeZone: "UTC",
              })}
            </p>
            {event.description && (
              <p className="text-sm text-gray-800 dark:text-gray-200">
                {event.description}
              </p>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    );
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100">
        {currentDate.toLocaleDateString("de-DE")}
      </h2>
      <div className="events">{renderEvents()}</div>
    </div>
  );
};

export default Calendar;
