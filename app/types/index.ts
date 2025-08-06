export interface Event {
    id: string;
    title: string;
    description?: string;
    startTime: Date;
    endTime: Date;
}

export interface CalendarProps {
    currentDate: Date;
    events: Event[];
}