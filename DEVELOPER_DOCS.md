# 📅 Calendar App - Developer Documentation

## Overview

This is a modern, responsive calendar application built with Next.js, TypeScript, and Tailwind CSS. It features event management, search and filtering capabilities, PWA support, and comprehensive testing.

## Architecture

### Tech Stack

- **Framework**: Next.js 15.4.5 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.x
- **UI Components**: Headless UI, Heroicons
- **Animations**: Framer Motion
- **Date Handling**: date-fns
- **Testing**: Jest, React Testing Library
- **PWA**: Service Worker, Web App Manifest

### Project Structure

```
app/
├── components/          # React components
│   ├── Calendar.tsx     # Main calendar component
│   ├── EventItem.tsx    # Event display component
│   ├── AddEventDialog.tsx    # Event creation modal
│   ├── EditEventDialog.tsx   # Event editing modal
│   ├── CalendarHeader.tsx    # Navigation and controls
│   ├── SearchAndFilter.tsx   # Search and filtering
│   ├── ServiceWorkerRegister.tsx  # PWA registration
│   └── WebVitals.tsx    # Performance monitoring
├── types/              # TypeScript type definitions
│   └── index.ts        # Event, Category, and other types
├── utils/              # Utility functions
│   └── dates.ts        # Date manipulation and validation
├── styles/             # Global styles
│   └── globals.css     # Tailwind imports and custom CSS
├── __tests__/          # Test files
└── layout.tsx          # Root layout with fonts and metadata
```

## Key Features

### Event Management
- **Create Events**: Rich event creation with categories, locations, and validation
- **Edit Events**: In-place event editing with full feature support
- **Delete Events**: Safe event deletion with confirmation
- **Event Categories**: 6 built-in categories with colors and icons
- **Data Persistence**: LocalStorage with serialization/deserialization

### Search & Filtering
- **Text Search**: Search across title, description, location, and category
- **Category Filtering**: Filter events by specific categories
- **Real-time Results**: Instant search results with result counts
- **Clear Filters**: Easy filter reset functionality

### User Interface
- **Multi-View Calendar**: Day, Week, and Month views
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dark Mode**: System preference-based theme switching
- **Animations**: Smooth transitions with Framer Motion
- **Accessibility**: ARIA labels, keyboard navigation, focus management

### PWA Features
- **Offline Support**: Service Worker for caching
- **App Installation**: Web App Manifest for home screen installation
- **Performance Monitoring**: Web Vitals tracking

## Component API

### Calendar Component

```tsx
interface CalendarProps {
  currentDate: Date;
  events: Event[];
}
```

Main calendar component that manages state and renders different views.

### Event Type

```tsx
interface Event {
  id: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  category?: EventCategory;
  isRecurring?: boolean;
  recurringPattern?: RecurringPattern;
  color?: string;
  location?: string;
  attendees?: string[];
  reminders?: number[];
}
```

### EventCategory Type

```tsx
interface EventCategory {
  id: string;
  name: string;
  color: string;
  icon?: string;
}
```

## Utility Functions

### Date Utilities (`utils/dates.ts`)

- `fmtDate(date, pattern?)`: Format dates for display
- `fmtTime(date, pattern?)`: Format times for display
- `getWeekDays(anchor)`: Get 7 days starting from anchor
- `getMonthGrid(anchor)`: Get month grid for calendar view
- `sameDay(date1, date2)`: Check if two dates are the same day
- `sortEvents(events)`: Sort events by start time
- `serializeEvents(events)`: Serialize events for localStorage
- `deserializeEvents(data)`: Deserialize events from localStorage

### Search & Filter Utilities

- `searchEvents(events, query)`: Search events by text query
- `filterEventsByCategory(events, categoryId)`: Filter by category
- `filterEventsByDateRange(events, start, end)`: Filter by date range

### Validation Utilities

- `sanitizeEventInput(input)`: Basic XSS protection
- `validateEventData(event)`: Comprehensive event validation

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Structure

- **Unit Tests**: Component logic and utility functions
- **Integration Tests**: Component interactions
- **Accessibility Tests**: ARIA attributes and keyboard navigation

### Test Files

- `dates.test.ts`: Date utility functions
- `enhanced-utils.test.ts`: Search, filter, and validation functions
- `AddEventDialog.test.tsx`: Event creation dialog
- `SearchAndFilter.test.tsx`: Search and filter component

## Performance Optimization

### Bundle Optimization
- **Package Import Optimization**: Tree-shaking for large libraries
- **Code Splitting**: Automatic Next.js code splitting
- **Static Generation**: Pre-built pages for better performance

### Runtime Optimization
- **useMemo**: Expensive calculations cached
- **React.memo**: Component memoization for event items
- **Event Delegation**: Efficient event handling

### Web Vitals Monitoring
- **Core Web Vitals**: LCP, FID, CLS tracking
- **Performance Metrics**: FCP, TTFB monitoring
- **Development Logging**: Performance insights in dev mode

## Security

### Input Sanitization
- **XSS Protection**: Basic script tag removal
- **Input Validation**: Length limits and required field checks
- **Type Safety**: TypeScript for compile-time safety

### HTTP Security Headers
- **X-Frame-Options**: Prevent clickjacking
- **X-Content-Type-Options**: Prevent MIME sniffing
- **Referrer-Policy**: Control referrer information
- **Permissions-Policy**: Restrict browser features

## PWA Implementation

### Service Worker (`public/sw.js`)
- **Caching Strategy**: Cache-first for assets, network-first for dynamic content
- **Offline Fallback**: Fallback to cached home page when offline
- **Cache Management**: Automatic cache updates and cleanup

### Web App Manifest (`public/manifest.json`)
- **Installation**: Home screen installation support
- **Display Mode**: Standalone app experience
- **Icons**: Multiple sizes for different devices
- **Shortcuts**: Quick access to add events

## Development

### Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run production build
npm start
```

### Code Style
- **TypeScript**: Strict mode enabled
- **ESLint**: Next.js recommended rules
- **Prettier**: Automatic code formatting
- **Tailwind**: Utility-first CSS approach

### Adding New Features

1. **Create Types**: Add TypeScript interfaces in `types/index.ts`
2. **Add Components**: Create in `components/` with proper props
3. **Write Tests**: Add corresponding test files
4. **Update Documentation**: Document new features and APIs

## Deployment

### Vercel (Recommended)
1. Connect GitHub repository
2. Configure environment variables if needed
3. Deploy automatically on push

### Manual Deployment
```bash
# Build the application
npm run build

# Start production server
npm start
```

### Environment Variables
- `NODE_ENV`: Environment mode (development/production)
- Custom variables can be added in `.env.local`

## Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 90+, Safari 14+, Edge 90+
- **Progressive Enhancement**: Core functionality works in older browsers
- **Feature Detection**: Service Worker and other PWA features

## Accessibility

### WCAG Compliance
- **Level AA**: Meets WCAG 2.1 AA standards
- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: Proper ARIA labels and descriptions
- **Focus Management**: Logical focus flow

### Accessibility Features
- **High Contrast**: Works with system high contrast modes
- **Reduced Motion**: Respects prefers-reduced-motion
- **Alternative Text**: Proper alt text for icons and images

## License

MIT License - See LICENSE file for details.