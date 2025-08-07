"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog } from "@headlessui/react";
import { format } from "date-fns";
import { ToastContainer, toast } from "react-toastify";
import { PlusIcon } from "@heroicons/react/24/solid";
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
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 mb-6 border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-xl hover:bg-blue-50 dark:hover:bg-gray-700 transition"
            onClick={() => handleEventClick(event)}
          >
            <h3 className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-2 flex items-center gap-2">
              <PlusIcon className="h-5 w-5 text-blue-400" />
              {event.title}
            </h3>
            <p className="text-base text-gray-600 dark:text-gray-400 mb-2">
              {format(event.startTime, "HH:mm")} –{" "}
              {format(event.endTime, "HH:mm")}
            </p>
            {event.description && (
              <p className="text-base text-gray-800 dark:text-gray-200">
                {event.description}
              </p>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    );
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 px-2 sm:px-0">
      <ToastContainer position="top-right" />
      <div className="flex items-center justify-between mb-8 sticky top-0 z-10 bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-4 rounded-xl shadow-sm">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-blue-700 dark:text-blue-300 drop-shadow">
          {format(currentDate, "PPP")}
        </h2>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg transition focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Add event"
          onClick={() => toast.info("Add event clicked!")}
        >
          <PlusIcon className="h-7 w-7" />
        </button>
      </div>
      <div className="events flex flex-col gap-4">{renderEvents()}</div>
      <Dialog
        open={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        className="fixed z-20 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen px-2">
          <Dialog.Panel className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 max-w-sm w-full mx-auto">
            <Dialog.Title className="text-2xl font-bold mb-2 text-blue-700 dark:text-blue-300">
              {selectedEvent?.title}
            </Dialog.Title>
            <Dialog.Description className="mb-2 text-gray-600 dark:text-gray-400">
              {selectedEvent && format(selectedEvent.startTime, "HH:mm")} –{" "}
              {selectedEvent && format(selectedEvent.endTime, "HH:mm")}
            </Dialog.Description>
            <p className="mb-4 text-gray-800 dark:text-gray-200">
              {selectedEvent?.description}
            </p>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-full"
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
