import { addDays, endOfMonth, endOfWeek, format, isSameDay, isValid, parseISO, startOfMonth, startOfWeek } from "date-fns";

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
}

export const serializeEvents = (events: Event[]): PersistedEvent[] =>
  events.map((e) => ({
    id: e.id,
    title: e.title,
    description: e.description,
    startTime: e.startTime.toISOString(),
    endTime: e.endTime.toISOString(),
  }));

export const deserializeEvents = (data: PersistedEvent[]): Event[] =>
  data
    .map((e) => ({
      ...e,
      startTime: clampValidDate(parseISO(e.startTime)),
      endTime: clampValidDate(parseISO(e.endTime)),
    }))
    .filter((e) => e.startTime < e.endTime);

export const sortEvents = <T extends { startTime: Date; endTime: Date }>(events: T[]) =>
  [...events].sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
