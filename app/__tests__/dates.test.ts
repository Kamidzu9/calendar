import { 
  getWeekDays, 
  getMonthGrid, 
  sameDay, 
  serializeEvents, 
  deserializeEvents,
  sortEvents,
  fmtDate,
  fmtTime 
} from '../utils/dates'
import type { Event } from '../types'

describe('Date utilities', () => {
  const testDate = new Date('2025-01-15T10:00:00Z') // Wednesday

  describe('getWeekDays', () => {
    it('should return 7 days starting from Monday', () => {
      const weekDays = getWeekDays(testDate)
      expect(weekDays).toHaveLength(7)
      expect(weekDays[0].getDay()).toBe(1) // Monday
      expect(weekDays[6].getDay()).toBe(0) // Sunday
    })
  })

  describe('getMonthGrid', () => {
    it('should return month grid with proper week alignment', () => {
      const monthGrid = getMonthGrid(testDate)
      expect(monthGrid.length).toBeGreaterThan(28)
      expect(monthGrid.length % 7).toBe(0) // Should be multiple of 7
    })
  })

  describe('sameDay', () => {
    it('should correctly identify same day', () => {
      const date1 = new Date('2025-01-15T10:00:00Z')
      const date2 = new Date('2025-01-15T20:00:00Z')
      const date3 = new Date('2025-01-16T10:00:00Z')
      
      expect(sameDay(date1, date2)).toBe(true)
      expect(sameDay(date1, date3)).toBe(false)
    })
  })

  describe('Event serialization', () => {
    const mockEvents: Event[] = [
      {
        id: '1',
        title: 'Test Event',
        description: 'Test Description',
        startTime: new Date('2025-01-15T10:00:00Z'),
        endTime: new Date('2025-01-15T11:00:00Z')
      }
    ]

    it('should serialize and deserialize events correctly', () => {
      const serialized = serializeEvents(mockEvents)
      const deserialized = deserializeEvents(serialized)
      
      expect(deserialized).toHaveLength(1)
      expect(deserialized[0].title).toBe('Test Event')
      expect(deserialized[0].startTime).toBeInstanceOf(Date)
    })
  })

  describe('sortEvents', () => {
    it('should sort events by start time', () => {
      const events: Event[] = [
        {
          id: '2',
          title: 'Later Event',
          startTime: new Date('2025-01-15T14:00:00Z'),
          endTime: new Date('2025-01-15T15:00:00Z')
        },
        {
          id: '1',
          title: 'Earlier Event',
          startTime: new Date('2025-01-15T10:00:00Z'),
          endTime: new Date('2025-01-15T11:00:00Z')
        }
      ]

      const sorted = sortEvents(events)
      expect(sorted[0].title).toBe('Earlier Event')
      expect(sorted[1].title).toBe('Later Event')
    })
  })

  describe('Formatting functions', () => {
    it('should format dates correctly', () => {
      const formatted = fmtDate(testDate)
      expect(formatted).toBeTruthy()
      expect(typeof formatted).toBe('string')
    })

    it('should format times correctly', () => {
      const formatted = fmtTime(testDate)
      expect(formatted).toMatch(/\d{2}:\d{2}/)
    })
  })
})