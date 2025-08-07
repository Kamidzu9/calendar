export interface Event {
  id: string;
  title: string;
  description?: string;
  startTime: Date; // Always a real Date instance in app state
  endTime: Date;
}

export type ViewMode = "day" | "week" | "month";
