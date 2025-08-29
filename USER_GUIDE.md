# 📱 Calendar App - User Guide

## Getting Started

Welcome to the Calendar App! This guide will help you make the most of all the features available.

## Table of Contents

1. [Basic Navigation](#basic-navigation)
2. [Creating Events](#creating-events)
3. [Managing Events](#managing-events)
4. [Search and Filter](#search-and-filter)
5. [Views and Navigation](#views-and-navigation)
6. [PWA Features](#pwa-features)
7. [Keyboard Shortcuts](#keyboard-shortcuts)
8. [Tips and Tricks](#tips-and-tricks)

## Basic Navigation

### Calendar Views
The app offers three different views to help you organize your schedule:

- **📅 Day View**: Shows all events for a single day with detailed time slots
- **📅 Week View**: Displays a full week with events organized by day
- **📅 Month View**: Traditional calendar grid showing the entire month

### Switching Views
Use the view buttons in the header to switch between Day, Week, and Month views. The current view is highlighted.

### Date Navigation
- **◀️ Previous**: Go back one day/week/month depending on current view
- **▶️ Next**: Go forward one day/week/month
- **Today**: Jump to the current date

## Creating Events

### Adding a New Event

1. Click the **➕ Plus button** in the top-right corner
2. Fill out the event details:
   - **Title**: Required - name of your event
   - **Description**: Optional - additional details
   - **Start Time**: When the event begins
   - **End Time**: When the event ends
   - **Category**: Choose from 6 built-in categories
   - **Location**: Optional - where the event takes place

### Event Categories

The app includes 6 predefined categories, each with a unique color and icon:

- **💼 Work** (Blue): Work meetings, deadlines, tasks
- **🏠 Personal** (Green): Personal appointments, family time
- **🏥 Health** (Orange): Medical appointments, fitness activities  
- **👥 Social** (Purple): Social events, parties, gatherings
- **✈️ Travel** (Cyan): Travel plans, vacations, trips
- **📚 Education** (Red): Classes, training, learning sessions

### Input Validation

The app validates your input to ensure data quality:
- Title is required and limited to 100 characters
- Description is limited to 500 characters
- End time must be after start time
- Basic XSS protection for security

## Managing Events

### Viewing Event Details
Click on any event to open the edit dialog where you can view all details.

### Editing Events
1. Click on an event to open the edit dialog
2. Modify any field you want to change
3. Click **Update** to save your changes
4. The event will immediately reflect your updates

### Deleting Events
1. Click on an event to open the edit dialog
2. Click the **🗑️ Delete** button (red button on the left)
3. Confirm the deletion in the dialog
4. The event will be permanently removed

### Event Overlap Detection
The app warns you when creating events that overlap with existing ones on the same day, helping prevent scheduling conflicts.

## Search and Filter

### Accessing Search
Click the **🔍 Search button** in the header to toggle the search and filter panel.

### Text Search
The search box allows you to find events by:
- **Event title**: "Team Meeting"
- **Description**: "Weekly standup"
- **Location**: "Conference Room A"  
- **Category name**: "Work"

Search is **case-insensitive** and shows results in real-time as you type.

### Category Filtering
Use the category dropdown to show only events from a specific category:
1. Click the category dropdown
2. Select the category you want to filter by
3. Only events from that category will be displayed

### Combining Filters
You can combine text search and category filtering for more precise results.

### Clearing Filters
- Use the **❌** button next to the search box to clear search text
- Click **Clear Filters** to reset both search and category filter
- Results summary shows how many events match your current filters

## Views and Navigation

### Day View Features
- **Time-based layout**: Events shown with precise time information
- **No events message**: Helpful message when no events are scheduled
- **Full event details**: Title, time, location, and description visible

### Week View Features
- **7-day grid**: Monday through Sunday layout
- **Compact event display**: Essential information for each event
- **Cross-day visibility**: See your entire week at a glance

### Month View Features
- **Traditional calendar**: Familiar month grid layout
- **Event previews**: See event titles and categories
- **Monthly overview**: Great for long-term planning

### Responsive Design
The app adapts to different screen sizes:
- **Desktop**: Full-featured experience with all controls
- **Tablet**: Optimized layout for touch interaction
- **Mobile**: Streamlined interface for small screens

## PWA Features

### Installing as an App
On supported browsers and devices, you can install the Calendar App:
1. Look for the "Install" prompt in your browser
2. Click "Install" to add to your home screen
3. The app will work offline and feel like a native app

### Offline Support
- **Cached data**: Your events are stored locally and available offline
- **Service worker**: Enables offline functionality
- **Background sync**: Data syncs when connection is restored

### Home Screen Shortcuts
Once installed, you can use shortcuts:
- **Add Event**: Quick access to create new events
- **Main app**: Direct access to the calendar

## Keyboard Shortcuts

### Navigation
- **Tab**: Move between interactive elements
- **Enter/Space**: Activate buttons and links
- **Escape**: Close dialogs and panels

### Accessibility
- **Screen reader support**: Full ARIA labels and descriptions
- **High contrast**: Compatible with system high contrast modes
- **Focus indicators**: Clear focus outlines for keyboard navigation

## Tips and Tricks

### Productivity Tips
1. **Use categories**: Organize events by type for better visual organization
2. **Add locations**: Include locations for easy reference
3. **Detailed descriptions**: Add context and details you'll need later
4. **Regular cleanup**: Regularly review and clean up old events

### Time Management
1. **Buffer time**: Leave gaps between meetings
2. **Realistic durations**: Set accurate start and end times
3. **Weekly review**: Use week view to plan your upcoming week
4. **Monthly planning**: Use month view for long-term scheduling

### Search Efficiency
1. **Use keywords**: Search for key terms that will help you find events quickly
2. **Filter by category**: Narrow down to specific types of events
3. **Combine filters**: Use both text and category filters together

### Data Safety
- **Local storage**: Your data is stored locally on your device
- **No registration**: No account creation required
- **Privacy focused**: Your events stay on your device

## Troubleshooting

### Common Issues

**Events not saving**
- Check if your browser allows localStorage
- Try refreshing the page
- Clear browser cache if needed

**Search not working**
- Make sure you've opened the search panel (🔍 button)
- Try different search terms
- Check if filters are applied

**App not installing**
- Use a supported browser (Chrome, Edge, Safari)
- Make sure you're using HTTPS
- Look for the install prompt in the address bar

**Performance issues**
- Clear browser cache
- Close unnecessary browser tabs
- Restart your browser

### Browser Compatibility
- **Best experience**: Chrome, Firefox, Safari, Edge (latest versions)
- **Basic functionality**: Works in most modern browsers
- **PWA features**: Require modern browser with service worker support

## Feedback and Support

### Getting Help
- Check this user guide for common questions
- Review the troubleshooting section
- Look for help text within the app interface

### Feature Requests
The app is continuously being improved. Future features may include:
- **Recurring events**: Daily, weekly, monthly repeating events
- **Event reminders**: Notifications before events
- **Import/Export**: iCal and Google Calendar integration
- **Drag & drop**: Move events between time slots
- **Multiple calendars**: Separate calendars for different purposes

---

**Enjoy using the Calendar App!** 🎉

*This app is designed to be intuitive and helpful for managing your schedule. Take some time to explore the features and find the workflow that works best for you.*