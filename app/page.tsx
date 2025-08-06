import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import Calendar from "./components/Calendar";

const fixedDate = new Date("2025-08-06T00:00:00"); // Use a fixed date

const mockEvents = [
  {
    id: "1",
    title: "Meeting with Team",
    startTime: new Date("2025-08-06T09:00:00Z"), // <-- Note the Z
    endTime: new Date("2025-08-06T10:00:00Z"),
    description: "Discuss project updates",
  },
  {
    id: "2",
    title: "Lunch Break",
    startTime: new Date("2025-08-06T12:00:00Z"),
    endTime: new Date("2025-08-06T13:00:00Z"),
    description: "Relax and recharge",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col items-center justify-start py-12 px-4">
      <div className="w-full max-w-xl">
        <div className="flex items-center justify-center mb-8">
          <CalendarDaysIcon className="h-10 w-10 text-blue-700 dark:text-blue-300 mr-2" />
          <h1 className="text-4xl font-extrabold text-center text-blue-700 dark:text-blue-300 drop-shadow">
            My Calendar App
          </h1>
        </div>
        <Calendar currentDate={fixedDate} events={mockEvents} />
      </div>
      <footer className="mt-12 text-gray-400 text-sm text-center">
        &copy; {new Date().getFullYear()} My Calendar App
      </footer>
    </main>
  );
}
