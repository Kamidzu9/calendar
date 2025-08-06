"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog } from "@headlessui/react";
import { format, formatInTimeZone } from "date-fns-tz";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [selectedEvent, setSelectedEvent] = useState<null | (typeof events)[0]>(
    null
  );

  const handleEventClick = (event: (typeof events)[0]) => {
    setSelectedEvent(event);
    toast.info(`Event: ${event.title}`);
  };

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
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-4 border border-gray-200 dark:border-gray-700 cursor-pointer"
            onClick={() => handleEventClick(event)}
          >
            <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-1">
              {event.title}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              {formatInTimeZone(event.startTime, "UTC", "HH:mm")} –{" "}
              {formatInTimeZone(event.endTime, "UTC", "HH:mm")}
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
      <ToastContainer position="top-right" />
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100">
        {format(currentDate, "PPP")}
      </h2>
      <div className="events">{renderEvents()}</div>
      <Dialog
        open={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        className="fixed z-10 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Dialog.Panel className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700 max-w-sm mx-auto">
            <Dialog.Title className="text-lg font-bold mb-2">
              {selectedEvent?.title}
            </Dialog.Title>
            <Dialog.Description className="mb-2">
              {selectedEvent && format(selectedEvent.startTime, "HH:mm")} –{" "}
              {selectedEvent && format(selectedEvent.endTime, "HH:mm")}
            </Dialog.Description>
            <p>{selectedEvent?.description}</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={() => setSelectedEvent(null)}
            >
              Schließen
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default Calendar;
