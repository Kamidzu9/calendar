import Calendar from "./components/Calendar";
const mockEvents = [
  {
    id: "1",
    title: "Meeting with Team",
    startTime: new Date(),
    endTime: new Date(new Date().getTime() + 60 * 60 * 1000),
    description: "Discuss project updates",
  },
  {
    id: "2",
    title: "Lunch Break",
    startTime: new Date(new Date().setHours(12, 0, 0)),
    endTime: new Date(new Date().setHours(13, 0, 0)),
    description: "Relax and recharge",
  },
];
export default function Home() {
  return (
    <main>
      {" "}
      <h1>My Calendar App</h1>{" "}
      <Calendar currentDate={new Date()} events={mockEvents} />{" "}
    </main>
  );
}
