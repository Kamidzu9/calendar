"use client";
import React from "react";
import { fmtDate } from "../utils/dates";
import type { ViewMode } from "../types";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";

interface CalendarHeaderProps {
  currentDate: Date;
  view: ViewMode;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  onChangeView: (view: ViewMode) => void;
  onAdd: () => void;
}

export default function CalendarHeader({
  currentDate,
  view,
  onPrev,
  onNext,
  onToday,
  onChangeView,
  onAdd,
}: CalendarHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-3 sticky top-0 z-10 bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-4 px-3 rounded-xl shadow-sm">
      <div className="flex items-center gap-2">
        <button
          className="rounded-full p-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
          aria-label="Previous"
          onClick={onPrev}
        >
          <ChevronLeftIcon className="h-5 w-5 text-blue-700 dark:text-blue-300" />
        </button>
        <button
          className="rounded-full p-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
          aria-label="Next"
          onClick={onNext}
        >
          <ChevronRightIcon className="h-5 w-5 text-blue-700 dark:text-blue-300" />
        </button>
        <button
          className="ml-1 rounded-md px-3 py-2 bg-blue-600 text-white hover:bg-blue-700"
          onClick={onToday}
        >
          Today
        </button>
      </div>

      <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-700 dark:text-blue-300 drop-shadow">
        {fmtDate(currentDate)}
      </h2>

      <div className="flex items-center gap-2">
        <div className="flex rounded-md overflow-hidden border border-gray-200 dark:border-gray-700">
          {(["day", "week", "month"] as ViewMode[]).map((v) => (
            <button
              key={v}
              onClick={() => onChangeView(v)}
              className={`px-3 py-2 text-sm ${
                view === v
                  ? "bg-blue-600 text-white"
                  : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
              aria-pressed={view === v}
            >
              {v[0].toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg transition focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Add event"
          onClick={onAdd}
        >
          <PlusIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
