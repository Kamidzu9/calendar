# 📆 Calendar App

[![Next.js](https://img.shields.io/badge/Next.js-15.4.5-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.1-38B2AC)](https://tailwindcss.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED)](https://www.docker.com/)

A modern, responsive calendar application built with Next.js, TypeScript, and PostgreSQL. View and manage your events with a clean, intuitive interface.

## 🌟 Features

- **📅 Event Management**: View events in a clean, organized interface
- **🔔 Notifications**: Get toast notifications for event interactions
- **🎨 Modern UI**: Beautiful animations powered by Framer Motion
- **🌙 Dark Mode Support**: Automatic theme switching based on system preferences
- **📱 Responsive Design**: Works on desktop and mobile devices
- **🔒 Database Ready**: PostgreSQL integration via Docker

## 🛠️ Tech Stack

- **Frontend**: Next.js 15.4, React 19.1, TypeScript
- **Styling**: Tailwind CSS 4.1, Geist font
- **UI Components**: Headless UI, Heroicons
- **Animations**: Framer Motion
- **State Management**: React hooks
- **Database**: PostgreSQL 17.5 (via Docker)
- **Containerization**: Docker & Docker Compose
- **Date Handling**: date-fns, date-fns-tz

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn
- Docker & Docker Compose (for database)

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/calendar.git
cd calendar
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the development server**

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application.

### Docker Setup

Run the entire application stack (Next.js app + PostgreSQL) with Docker Compose:

```bash
docker compose up
```

This will:

- Build and start the Next.js application
- Start a PostgreSQL database
- Connect them with the proper environment variables

## 📂 Project Structure

```
calendar/
├── app/                  # Next.js App Router
│   ├── components/       # React components
│   │   ├── Calendar.tsx  # Calendar component
│   │   └── Event.tsx     # Event component
│   ├── styles/           # Global styles
│   │   └── globals.css   # Tailwind imports and global CSS
│   ├── types/            # TypeScript definitions
│   │   └── index.ts      # Shared types (Event, CalendarProps)
│   ├── layout.tsx        # Root layout with font setup
│   └── page.tsx          # Home page (Calendar view)
├── public/               # Static assets
├── docker-compose.yml    # Docker configuration
├── Dockerfile            # Docker build instructions
└── next.config.ts        # Next.js configuration
```

## ⚙️ Configuration

### Environment Variables

The application uses the following environment variables:

```
DATABASE_URL=postgresql://user:password@postgres:5432/mydatabase
```

These are already configured in [`docker-compose.yml`](docker-compose.yml) for local development.

### Date Settings

For consistent date rendering between server and client, always use UTC dates with the `Z` suffix:

```typescript
// Good (UTC)
new Date("2025-08-06T09:00:00Z");

// Avoid (local timezone)
new Date("2025-08-06T09:00:00");
```

When formatting dates for display, use the [`formatInTimeZone`](node_modules/date-fns-tz/dist/esm/formatInTimeZone/index.d.ts) function from `date-fns-tz`:

```typescript
import { formatInTimeZone } from "date-fns-tz";

// Format in UTC to avoid hydration errors
formatInTimeZone(date, "UTC", "HH:mm");
```

## 📝 Development Notes

### Avoiding Hydration Errors

The project uses Next.js server components. To avoid hydration errors:

1. Use `"use client"` directive in components using browser-specific libraries
2. Use fixed dates or UTC formatting for consistent rendering
3. Avoid dynamic content that differs between server and client render

### Adding New Events

Events follow this structure:

```typescript
{
  id: string;
  title: string;
  startTime: Date;  // Use UTC dates
  endTime: Date;    // Use UTC dates
  description?: string;
}
```

## 🚢 Deployment

### Vercel (Recommended)

The easiest way to deploy this Next.js app is with [Vercel](https://vercel.com):

1. Push your code to a GitHub repository
2. Import the project in Vercel
3. Configure environment variables
4. Deploy

### Docker Deployment

For custom hosting:

```bash
# Build the Docker image
docker build -t calendar-app .

# Run the container
docker run -p 3000:3000 calendar-app
```

## 🔮 Future Improvements

- [ ] User authentication system
- [ ] Event creation/editing
- [ ] Calendar navigation (month/week/day views)
- [ ] Recurring events
- [ ] Email notifications
- [ ] Calendar sharing
- [ ] Mobile app with React Native

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Built with ❤️ using Next.js and React
