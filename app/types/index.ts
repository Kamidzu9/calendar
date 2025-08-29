export interface Event {
  id: string;
  title: string;
  description?: string;
  startTime: Date; // Always a real Date instance in app state
  endTime: Date;
  category?: EventCategory;
  isRecurring?: boolean;
  recurringPattern?: RecurringPattern;
  color?: string;
  location?: string;
  attendees?: string[];
  reminders?: number[]; // minutes before event
}

export interface EventCategory {
  id: string;
  name: string;
  color: string;
  icon?: string;
}

export interface RecurringPattern {
  type: 'daily' | 'weekly' | 'monthly' | 'yearly';
  interval: number; // every N days/weeks/months/years
  endDate?: Date;
  occurrences?: number; // alternative to endDate
  weekDays?: number[]; // for weekly recurring (0=Sunday, 1=Monday, etc.)
}

export type ViewMode = "day" | "week" | "month";

export interface CalendarSettings {
  theme: 'light' | 'dark' | 'system';
  weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  timeFormat: '12h' | '24h';
  defaultView: ViewMode;
  showWeekends: boolean;
  autoSave: boolean;
}
