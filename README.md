# 📅 Calendar App

[![Next.js](https://img.shields.io/badge/Next.js-15.4.5-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4.1-38B2AC)](https://tailwindcss.com/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED)](https://www.docker.com/)

A modern, feature-rich calendar application built with Next.js, TypeScript, and Tailwind CSS. Create, view, and manage your events with an intuitive interface that adapts to your preferences.

## ✨ Features

### 📱 **Multi-View Calendar**

- **Day View**: Focus on today's events with detailed time slots
- **Week View**: See your week at a glance with 7-day grid layout
- **Month View**: Traditional calendar grid with event previews
- Smooth view transitions with keyboard navigation

### 🎯 **Event Management**

- **Create Events**: Add events with title, description, and time slots
- **Event Details**: Click any event to view full details in a modal
- **Smart Validation**: Prevents overlapping events with warnings
- **Quick Actions**: Delete events directly from the detail view

### 💾 **Data Persistence**

- **LocalStorage**: Events automatically saved to browser storage
- **Hydration Safe**: Server-side rendering compatible
- **Data Serialization**: Robust date handling with timezone awareness

### 🎨 **Modern UI/UX**

- **Dark Mode**: Automatic theme switching based on system preferences
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Smooth Animations**: Powered by Framer Motion for delightful interactions
- **Toast Notifications**: Real-time feedback for user actions
- **Accessible**: Full keyboard navigation and screen reader support

### 🌐 **Developer Experience**

- **TypeScript**: Full type safety and IntelliSense support
- **Component Architecture**: Modular, reusable React components
- **Date Utilities**: Robust date handling with date-fns
- **Modern Styling**: Tailwind CSS with custom design system

## 🛠️ Tech Stack

| Category          | Technology                                                                                |
| ----------------- | ----------------------------------------------------------------------------------------- |
| **Framework**     | [Next.js 15.4](https://nextjs.org/) with App Router                                       |
| **Language**      | [TypeScript 5.0](https://www.typescriptlang.org/)                                         |
| **Styling**       | [Tailwind CSS 4.1](https://tailwindcss.com/)                                              |
| **UI Components** | [Headless UI](https://headlessui.com/)                                                    |
| **Icons**         | [Heroicons](https://heroicons.com/)                                                       |
| **Animations**    | [Framer Motion](https://www.framer.com/motion/)                                           |
| **Notifications** | [React Toastify](https://fkhadra.github.io/react-toastify/)                               |
| **Date Handling** | [date-fns](https://date-fns.org/) & [date-fns-tz](https://github.com/marnusw/date-fns-tz) |
| **Font**          | [Geist](https://vercel.com/font) (Sans & Mono)                                            |
| **Database**      | PostgreSQL 17.5 (Docker ready)                                                            |
| **Container**     | Docker & Docker Compose                                                                   |

## 🚀 Quick Start

### Prerequisites

- **Node.js** v18 or higher
- **npm** or **yarn**
- **Docker** (optional, for database)

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

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Docker Setup (Optional)

For full-stack development with PostgreSQL:

```bash
# Start the entire application stack
docker compose up

# Or run in background
docker compose up -d
```

This will start:

- ✅ Next.js application on port 3000
- ✅ PostgreSQL database on port 5432
- ✅ Automatic database connection

## 📂 Project Structure

```
calendar/
├── 📁 app/                    # Next.js App Router
│   ├── 📁 components/         # React components
│   │   ├── 📄 Calendar.tsx    # Main calendar component with state management
│   │   ├── 📄 CalendarHeader.tsx # Navigation and view controls
│   │   ├── 📄 AddEventDialog.tsx # Event creation modal
│   │   ├── 📄 EventItem.tsx   # Event display component
│   │   └── 📄 Event.tsx       # Legacy event component
│   ├── 📁 styles/             # Styling
│   │   └── 📄 globals.css     # Tailwind imports and custom styles
│   ├── 📁 types/              # TypeScript definitions
│   │   └── 📄 index.ts        # Event and ViewMode types
│   ├── 📁 utils/              # Utility functions
│   │   └── 📄 dates.ts        # Date manipulation and formatting
│   ├── 📄 layout.tsx          # Root layout with fonts and metadata
│   └── 📄 page.tsx            # Home page with mock data
├── 📁 public/                 # Static assets
├── 📄 docker-compose.yml      # Docker services configuration
├── 📄 Dockerfile              # Container build instructions
├── 📄 package.json            # Dependencies and scripts
├── 📄 next.config.ts          # Next.js configuration
└── 📄 README.md               # This file
```

## 🎮 Usage Guide

### Creating Events

1. Click the **➕ Add** button in the calendar header
2. Fill in the event details:
   - **Title** (required): Event name
   - **Description** (optional): Additional details
   - **Start/End Time**: Use time pickers for precise scheduling
3. Click **Create** to save

### Viewing Events

- **Day View**: See all events for the selected day with full details
- **Week View**: 7-day grid showing events across the week
- **Month View**: Traditional calendar with event summaries

### Event Interactions

- **Click any event** to view full details
- **Delete events** from the detail modal
- **Navigate dates** using the arrow buttons or "Today" button
- **Switch views** using the Day/Week/Month buttons

### Keyboard Navigation

- **Tab**: Navigate through interactive elements
- **Enter/Space**: Activate buttons and events
- **Esc**: Close open dialogs

## ⚙️ Configuration

### Environment Variables

```env
# Database connection (optional)
DATABASE_URL=postgresql://user:password@postgres:5432/mydatabase
```

### Date Handling Best Practices

For consistent rendering across server and client:

```typescript
// ✅ Good: Use UTC dates
new Date("2025-08-06T09:00:00Z");

// ❌ Avoid: Local timezone ambiguity
new Date("2025-08-06T09:00:00");

// ✅ Format dates consistently
import { formatInTimeZone } from "date-fns-tz";
formatInTimeZone(date, "UTC", "HH:mm");
```

### Customizing Styles

The app uses Tailwind CSS with CSS custom properties:

```css
:root {
  --color-primary: #0b63f6;
  --color-background: #ffffff;
  --color-foreground: #171717;
}
```

## 🧪 Development

### Available Scripts

```bash
# Development with Turbopack (fast)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

### Adding New Components

Follow the existing patterns:

```typescript
// Use TypeScript for props
interface MyComponentProps {
  title: string;
  onClick?: () => void;
}

// Use React.memo for performance
const MyComponent: React.FC<MyComponentProps> = React.memo(
  ({ title, onClick }) => {
    return (
      <button
        className="bg-blue-600 text-white rounded-md px-4 py-2"
        onClick={onClick}
      >
        {title}
      </button>
    );
  }
);

export default MyComponent;
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Configure environment variables (if using database)
4. Deploy automatically

### Docker Production

```bash
# Build production image
docker build -t calendar-app .

# Run container
docker run -p 3000:3000 calendar-app
```

### Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🔧 Troubleshooting

### Common Issues

**Hydration Errors**

- Ensure dates are consistently formatted
- Use UTC dates for server-side rendering
- Check for client-only code in server components

**LocalStorage Issues**

- Verify browser supports localStorage
- Check for quota limits
- Handle JSON parsing errors gracefully

**Date Display Problems**

- Confirm timezone handling in date utilities
- Use `formatInTimeZone` for consistent formatting
- Test across different timezones

## 🗺️ Roadmap

### 🎯 Next Features

- [ ] **Event Editing**: Modify existing events inline
- [ ] **Recurring Events**: Daily, weekly, monthly patterns
- [ ] **Event Categories**: Color-coded event types
- [ ] **Import/Export**: iCal and Google Calendar integration

### 🔮 Future Enhancements

- [ ] **User Authentication**: Multi-user support with login
- [ ] **Real-time Sync**: WebSocket-based live updates
- [ ] **Mobile App**: React Native companion app
- [ ] **Email Notifications**: Event reminders via email
- [ ] **Calendar Sharing**: Share calendars with others
- [ ] **Advanced Views**: Agenda view and timeline view
- [ ] **Search & Filters**: Find events quickly
- [ ] **Drag & Drop**: Move events between time slots

### 🏗️ Technical Improvements

- [ ] **Database Integration**: Full PostgreSQL implementation
- [ ] **API Routes**: RESTful backend for events
- [ ] **Testing Suite**: Unit and integration tests
- [ ] **PWA Features**: Offline support and app installation
- [ ] **Performance**: Virtual scrolling for large datasets

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
   - Follow existing code patterns
   - Add TypeScript types
   - Update documentation
4. **Test your changes**
   ```bash
   npm run dev
   npm run build
   ```
5. **Commit and push**
   ```bash
   git commit -m 'Add amazing feature'
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Code Style Guidelines

- Use TypeScript for all new code
- Follow existing component patterns
- Add proper error handling
- Include accessibility attributes
- Write meaningful commit messages

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/calendar/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/calendar/discussions)
- **Documentation**: This README and inline code comments

---

<div align="center">

**Built with ❤️ using Next.js, TypeScript, and modern web technologies**

[⭐ Star this repo](https://github.com/yourusername/calendar) • [🐛 Report bug](https://github.com/yourusername/calendar/issues) • [✨ Request feature](https://github.com/yourusername/calendar/issues)
