import { addDays, endOfMonth, endOfWeek, format, isSameDay, isValid, parseISO, startOfMonth, startOfWeek } from "date-fns";
import type { Event, EventCategory } from "../types";

export const fmtDate = (d: Date, pattern = "PPP") => format(d, pattern);
export const fmtTime = (d: Date, pattern = "HH:mm") => format(d, pattern);

export const clampValidDate = (d: Date) => (isValid(d) ? d : new Date());

export const sameDay = (a: Date, b: Date) => isSameDay(a, b);

export const getWeekDays = (anchor: Date) => {
  const start = startOfWeek(anchor, { weekStartsOn: 1 });
  return Array.from({ length: 7 }, (_, i) => addDays(start, i));
};

export const getMonthGrid = (anchor: Date) => {
  const start = startOfWeek(startOfMonth(anchor), { weekStartsOn: 1 });
  const end = endOfWeek(endOfMonth(anchor), { weekStartsOn: 1 });
  const days: Date[] = [];
  let d = start;
  while (d <= end) {
    days.push(d);
    d = addDays(d, 1);
  }
  return days;
};

// Serialization helpers for localStorage
export interface PersistedEvent {
  id: string;
  title: string;
  description?: string;
  startTime: string; // ISO
  endTime: string;   // ISO
  category?: {
    id: string;
    name: string;
    color: string;
    icon?: string;
  };
  isRecurring?: boolean;
  recurringPattern?: {
    type: 'daily' | 'weekly' | 'monthly' | 'yearly';
    interval: number;
    endDate?: string; // ISO
    occurrences?: number;
    weekDays?: number[];
  };
  color?: string;
  location?: string;
  attendees?: string[];
  reminders?: number[];
}

export const serializeEvents = (events: Event[]): PersistedEvent[] =>
  events.map((e) => ({
    id: e.id,
    title: e.title,
    description: e.description,
    startTime: e.startTime.toISOString(),
    endTime: e.endTime.toISOString(),
    category: e.category,
    isRecurring: e.isRecurring,
    recurringPattern: e.recurringPattern ? {
      ...e.recurringPattern,
      endDate: e.recurringPattern.endDate?.toISOString(),
    } : undefined,
    color: e.color,
    location: e.location,
    attendees: e.attendees,
    reminders: e.reminders,
  }));

export const deserializeEvents = (data: PersistedEvent[]): Event[] =>
  data
    .map((e) => ({
      ...e,
      startTime: clampValidDate(parseISO(e.startTime)),
      endTime: clampValidDate(parseISO(e.endTime)),
      recurringPattern: e.recurringPattern ? {
        ...e.recurringPattern,
        endDate: e.recurringPattern.endDate ? clampValidDate(parseISO(e.recurringPattern.endDate)) : undefined,
      } : undefined,
    }))
    .filter((e) => e.startTime < e.endTime);

export const sortEvents = <T extends { startTime: Date; endTime: Date }>(events: T[]) =>
  [...events].sort((a, b) => a.startTime.getTime() - b.startTime.getTime());

// Default event categories
export const DEFAULT_CATEGORIES: EventCategory[] = [
  { id: 'work', name: 'Work', color: '#3b82f6', icon: '💼' },
  { id: 'personal', name: 'Personal', color: '#10b981', icon: '🏠' },
  { id: 'health', name: 'Health', color: '#f59e0b', icon: '🏥' },
  { id: 'social', name: 'Social', color: '#8b5cf6', icon: '👥' },
  { id: 'travel', name: 'Travel', color: '#06b6d4', icon: '✈️' },
  { id: 'education', name: 'Education', color: '#ef4444', icon: '📚' },
];

// Input validation and sanitization
export const sanitizeEventInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, ''); // Basic XSS protection
};

export const validateEventData = (event: Partial<Event>): string[] => {
  const errors: string[] = [];
  
  if (!event.title?.trim()) {
    errors.push('Title is required');
  }
  
  if (event.title && event.title.length > 100) {
    errors.push('Title must be less than 100 characters');
  }
  
  if (event.description && event.description.length > 500) {
    errors.push('Description must be less than 500 characters');
  }
  
  if (event.startTime && event.endTime && event.startTime >= event.endTime) {
    errors.push('End time must be after start time');
  }
  
  return errors;
};

// Search and filter utilities
export const searchEvents = (events: Event[], query: string): Event[] => {
  const searchTerm = query.toLowerCase();
  return events.filter(event => 
    event.title.toLowerCase().includes(searchTerm) ||
    (event.description && event.description.toLowerCase().includes(searchTerm)) ||
    (event.location && event.location.toLowerCase().includes(searchTerm)) ||
    (event.category && event.category.name.toLowerCase().includes(searchTerm))
  );
};

export const filterEventsByCategory = (events: Event[], categoryId: string): Event[] => {
  return events.filter(event => event.category?.id === categoryId);
};

export const filterEventsByDateRange = (events: Event[], startDate: Date, endDate: Date): Event[] => {
  return events.filter(event => 
    event.startTime >= startDate && event.startTime <= endDate
  );
};
