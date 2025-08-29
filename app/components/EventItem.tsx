"use client";
import React from "react";
import { fmtTime } from "../utils/dates";
import type { Event } from "../types";
import { MapPinIcon } from "@heroicons/react/20/solid";

interface EventItemProps {
  event: Event;
  onClick?: () => void;
}

const EventItem: React.FC<EventItemProps> = React.memo(function EventItem({
  event,
  onClick,
}) {
  const { title, startTime, endTime, description, category, location, color } = event;
  
  const categoryColor = color || category?.color || '#3b82f6';
  const categoryIcon = category?.icon || '📅';
  
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
      style={{
        borderLeftColor: categoryColor,
        borderLeftWidth: '4px'
      }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick?.()}
      aria-label={`Event ${title} from ${fmtTime(startTime)} to ${fmtTime(endTime)}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg" role="img" aria-label="category">
              {categoryIcon}
            </span>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {title}
            </h3>
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            {fmtTime(startTime)} – {fmtTime(endTime)}
          </p>
          
          {location && (
            <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mb-2">
              <MapPinIcon className="h-4 w-4" />
              <span>{location}</span>
            </div>
          )}
          
          {description && (
            <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
              {description}
            </p>
          )}
        </div>
        
        {category && (
          <div className="ml-3">
            <span
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
              style={{
                backgroundColor: categoryColor + '20',
                color: categoryColor
              }}
            >
              {category.name}
            </span>
          </div>
        )}
      </div>
    </div>
  );
});

export default EventItem;
export { EventItem };
