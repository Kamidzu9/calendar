"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Dialog } from "@headlessui/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import EventItem from "./EventItem";
import AddEventDialog from "./AddEventDialog";
import CalendarHeader from "./CalendarHeader";

import {
  deserializeEvents,
  getMonthGrid,
  getWeekDays,
  sameDay,
  serializeEvents,
  sortEvents,
  fmtTime,
} from "../utils/dates";
import type { Event, ViewMode } from "../types";
import { addDays } from "date-fns";

interface CalendarProps {
  currentDate: Date;
  events: Event[]; // initial events for hydration
}

const STORAGE_KEY = "calendar.events.v1";

const Calendar: React.FC<CalendarProps> = ({ currentDate, events }) => {
  const [view, setView] = useState<ViewMode>("day");
  const [date, setDate] = useState<Date>(currentDate);
  const [items, setItems] = useState<Event[]>(events);
  const [selected, setSelected] = useState<Event | null>(null);
  const [addOpen, setAddOpen] = useState(false);

  // Hydrate from localStorage (client-only) and persist on changes
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        const loaded = deserializeEvents(parsed);
        if (loaded.length) setItems(sortEvents(loaded));
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(serializeEvents(items)));
    } catch {
      // ignore
    }
  }, [items]);

  const timezone = useMemo(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone ?? "Local time",
    []
  );

  const openAdd = useCallback(() => setAddOpen(true), []);
  const closeAdd = useCallback(() => setAddOpen(false), []);

  const onPrev = () => {
    setDate((d) =>
      view === "day"
        ? addDays(d, -1)
        : view === "week"
        ? addDays(d, -7)
        : addDays(d, -30)
    );
  };
  const onNext = () => {
    setDate((d) =>
      view === "day"
        ? addDays(d, 1)
        : view === "week"
        ? addDays(d, 7)
        : addDays(d, 30)
    );
  };
  const onToday = () => setDate(new Date());

  const dayEvents = useMemo(
    () => sortEvents(items.filter((e) => sameDay(e.startTime, date))),
    [items, date]
  );

  const weekDays = useMemo(() => getWeekDays(date), [date]);
  const weekEvents = useMemo(
    () =>
      weekDays.map((d) => ({
        day: d,
        events: sortEvents(items.filter((e) => sameDay(e.startTime, d))),
      })),
    [items, weekDays]
  );

  const monthGrid = useMemo(() => getMonthGrid(date), [date]);
  const monthEventsMap = useMemo(() => {
    const map = new Map<number, Event[]>();
    items.forEach((e) => {
      const key = new Date(
        e.startTime.getFullYear(),
        e.startTime.getMonth(),
        e.startTime.getDate()
      ).getTime();
      const arr = map.get(key) ?? [];
      arr.push(e);
      map.set(key, arr);
    });
    return map;
  }, [items]);

  const handleCreate = (data: {
    title: string;
    description?: string;
    startTime: Date;
    endTime: Date;
  }) => {
    const id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const newEvent: Event = { id, ...data };
    // Simple overlap check for the exact day
    const overlaps = items.some(
      (e) =>
        sameDay(e.startTime, data.startTime) &&
        e.startTime < data.endTime &&
        data.startTime < e.endTime
    );
    if (overlaps) {
      toast.warn("This overlaps with another event");
    }
    setItems((prev) => sortEvents([...prev, newEvent]));
  };

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((e) => e.id !== id));
    setSelected(null);
    toast.info("Event deleted");
  };

  const handleEventClick = (e: Event) => {
    setSelected(e);
    toast.info(
      `Event: ${e.title} (${fmtTime(e.startTime)}–${fmtTime(e.endTime)})`
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-6 px-2 sm:px-0">
      <ToastContainer position="top-right" />
      <CalendarHeader
        currentDate={date}
        view={view}
        onPrev={onPrev}
        onNext={onNext}
        onToday={onToday}
        onChangeView={setView}
        onAdd={openAdd}
      />
      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        Times shown in <strong>{timezone}</strong>.
      </p>

      <div className="mt-4">
        {view === "day" && (
          <div className="flex flex-col gap-3">
            {dayEvents.length === 0 ? (
              <div className="text-gray-400 text-center py-6">
                No events for this day.
              </div>
            ) : (
              <AnimatePresence>
                {dayEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.2 }}
                  >
                    <EventItem
                      title={event.title}
                      start={event.startTime}
                      end={event.endTime}
                      description={event.description}
                      onClick={() => handleEventClick(event)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        )}

        {view === "week" && (
          <div className="grid grid-cols-1 sm:grid-cols-7 gap-3">
            {weekEvents.map(({ day, events }) => (
              <div
                key={day.toISOString()}
                className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-3"
              >
                <div className="text-sm font-semibold text-blue-700 dark:text-blue-300 mb-2">
                  {day.toLocaleDateString(undefined, {
                    weekday: "short",
                    day: "numeric",
                  })}
                </div>
                <div className="flex flex-col gap-2">
                  {events.length === 0 ? (
                    <div className="text-xs text-gray-400">—</div>
                  ) : (
                    events.map((e) => (
                      <EventItem
                        key={e.id}
                        title={e.title}
                        start={e.startTime}
                        end={e.endTime}
                        description={e.description}
                        onClick={() => handleEventClick(e)}
                      />
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {view === "month" && (
          <div className="grid grid-cols-7 gap-2">
            {monthGrid.map((d) => {
              const key = new Date(
                d.getFullYear(),
                d.getMonth(),
                d.getDate()
              ).getTime();
              const evts = sortEvents(monthEventsMap.get(key) ?? []);
              return (
                <div
                  key={d.toISOString()}
                  className={`min-h-[120px] rounded-xl border p-2 ${
                    d.getMonth() === date.getMonth()
                      ? "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
                      : "border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-950"
                  }`}
                >
                  <div className="text-xs font-semibold text-gray-600 dark:text-gray-300 mb-1">
                    {d.getDate()}
                  </div>
                  <div className="flex flex-col gap-1">
                    {evts.slice(0, 3).map((e) => (
                      <button
                        key={e.id}
                        className="text-left text-xs rounded-md px-2 py-1 bg-blue-50 dark:bg-gray-800 text-blue-800 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-gray-700"
                        onClick={() => handleEventClick(e)}
                        title={e.title}
                      >
                        {e.title} • {fmtTime(e.startTime)}
                      </button>
                    ))}
                    {evts.length > 3 && (
                      <div className="text-[10px] text-gray-500">
                        +{evts.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add Event */}
      <AddEventDialog
        open={addOpen}
        date={date}
        onClose={closeAdd}
        onSubmit={handleCreate}
      />

      {/* Event Details */}
      <Dialog
        open={!!selected}
        onClose={() => setSelected(null)}
        className="fixed z-20 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen px-2">
          <Dialog.Panel className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700 max-w-sm w-full mx-auto">
            <Dialog.Title className="text-2xl font-bold mb-2 text-blue-700 dark:text-blue-300">
              {selected?.title}
            </Dialog.Title>
            {selected && (
              <Dialog.Description className="mb-2 text-gray-600 dark:text-gray-400">
                {fmtTime(selected.startTime)} – {fmtTime(selected.endTime)}
              </Dialog.Description>
            )}
            <p className="mb-4 text-gray-800 dark:text-gray-200">
              {selected?.description || "No description"}
            </p>
            <div className="flex gap-2">
              {selected && (
                <button
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  onClick={() => handleDelete(selected.id)}
                >
                  Delete
                </button>
              )}
              <button
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => setSelected(null)}
              >
                Close
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default Calendar;
