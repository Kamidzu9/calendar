"use client";
import React from "react";
import { fmtTime } from "../utils/dates";

interface EventItemProps {
  title: string;
  start: Date;
  end: Date;
  description?: string;
  onClick?: () => void;
}

const EventItem: React.FC<EventItemProps> = React.memo(function EventItem({
  title,
  start,
  end,
  description,
  onClick,
}) {
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick?.()}
      aria-label={`Event ${title} from ${fmtTime(start)} to ${fmtTime(end)}`}
    >
      <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-300 mb-1">
        {title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {fmtTime(start)} – {fmtTime(end)}
      </p>
      {description && (
        <p className="mt-1 text-sm text-gray-800 dark:text-gray-200">
          {description}
        </p>
      )}
    </div>
  );
});

export default EventItem;
export { EventItem };
