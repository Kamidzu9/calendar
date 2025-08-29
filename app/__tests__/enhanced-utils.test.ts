import { 
  searchEvents, 
  filterEventsByCategory, 
  DEFAULT_CATEGORIES,
  sanitizeEventInput,
  validateEventData
} from '../utils/dates'
import type { Event } from '../types'

describe('Enhanced Event utilities', () => {
  const mockEvents: Event[] = [
    {
      id: '1',
      title: 'Team Meeting',
      description: 'Weekly standup',
      startTime: new Date('2025-01-15T10:00:00Z'),
      endTime: new Date('2025-01-15T11:00:00Z'),
      category: DEFAULT_CATEGORIES[0], // Work
      location: 'Conference Room A'
    },
    {
      id: '2',
      title: 'Doctor Appointment',
      description: 'Annual checkup',
      startTime: new Date('2025-01-15T14:00:00Z'),
      endTime: new Date('2025-01-15T15:00:00Z'),
      category: DEFAULT_CATEGORIES[2], // Health
      location: 'Medical Center'
    },
    {
      id: '3',
      title: 'Birthday Party',
      description: 'Friend\'s birthday celebration',
      startTime: new Date('2025-01-15T18:00:00Z'),
      endTime: new Date('2025-01-15T22:00:00Z'),
      category: DEFAULT_CATEGORIES[3], // Social
      location: 'Restaurant'
    }
  ]

  describe('searchEvents', () => {
    it('should find events by title', () => {
      const results = searchEvents(mockEvents, 'meeting')
      expect(results).toHaveLength(1)
      expect(results[0].title).toBe('Team Meeting')
    })

    it('should find events by description', () => {
      const results = searchEvents(mockEvents, 'checkup')
      expect(results).toHaveLength(1)
      expect(results[0].title).toBe('Doctor Appointment')
    })

    it('should find events by location', () => {
      const results = searchEvents(mockEvents, 'restaurant')
      expect(results).toHaveLength(1)
      expect(results[0].title).toBe('Birthday Party')
    })

    it('should find events by category name', () => {
      const results = searchEvents(mockEvents, 'work')
      expect(results).toHaveLength(1)
      expect(results[0].title).toBe('Team Meeting')
    })

    it('should be case insensitive', () => {
      const results = searchEvents(mockEvents, 'MEETING')
      expect(results).toHaveLength(1)
      expect(results[0].title).toBe('Team Meeting')
    })

    it('should return empty array for no matches', () => {
      const results = searchEvents(mockEvents, 'nonexistent')
      expect(results).toHaveLength(0)
    })
  })

  describe('filterEventsByCategory', () => {
    it('should filter events by category', () => {
      const workEvents = filterEventsByCategory(mockEvents, 'work')
      expect(workEvents).toHaveLength(1)
      expect(workEvents[0].title).toBe('Team Meeting')
    })

    it('should return empty array for non-matching category', () => {
      const educationEvents = filterEventsByCategory(mockEvents, 'education')
      expect(educationEvents).toHaveLength(0)
    })
  })

  describe('sanitizeEventInput', () => {
    it('should trim whitespace', () => {
      expect(sanitizeEventInput('  hello world  ')).toBe('hello world')
    })

    it('should remove basic XSS characters', () => {
      expect(sanitizeEventInput('hello<script>world</script>')).toBe('helloscriptworld/script')
    })

    it('should handle empty strings', () => {
      expect(sanitizeEventInput('')).toBe('')
    })
  })

  describe('validateEventData', () => {
    it('should require title', () => {
      const errors = validateEventData({})
      expect(errors).toContain('Title is required')
    })

    it('should validate title length', () => {
      const longTitle = 'a'.repeat(101)
      const errors = validateEventData({ title: longTitle })
      expect(errors).toContain('Title must be less than 100 characters')
    })

    it('should validate description length', () => {
      const longDesc = 'a'.repeat(501)
      const errors = validateEventData({ 
        title: 'Valid Title',
        description: longDesc 
      })
      expect(errors).toContain('Description must be less than 500 characters')
    })

    it('should validate time relationship', () => {
      const startTime = new Date('2025-01-15T14:00:00Z')
      const endTime = new Date('2025-01-15T10:00:00Z') // Earlier than start
      const errors = validateEventData({ 
        title: 'Valid Title',
        startTime,
        endTime
      })
      expect(errors).toContain('End time must be after start time')
    })

    it('should pass validation for valid event', () => {
      const errors = validateEventData({
        title: 'Valid Event',
        description: 'Valid description',
        startTime: new Date('2025-01-15T10:00:00Z'),
        endTime: new Date('2025-01-15T11:00:00Z')
      })
      expect(errors).toHaveLength(0)
    })
  })

  describe('DEFAULT_CATEGORIES', () => {
    it('should have all required categories', () => {
      expect(DEFAULT_CATEGORIES).toHaveLength(6)
      
      const categoryIds = DEFAULT_CATEGORIES.map(cat => cat.id)
      expect(categoryIds).toContain('work')
      expect(categoryIds).toContain('personal')
      expect(categoryIds).toContain('health')
      expect(categoryIds).toContain('social')
      expect(categoryIds).toContain('travel')
      expect(categoryIds).toContain('education')
    })

    it('should have all required properties', () => {
      DEFAULT_CATEGORIES.forEach(category => {
        expect(category).toHaveProperty('id')
        expect(category).toHaveProperty('name')
        expect(category).toHaveProperty('color')
        expect(category).toHaveProperty('icon')
        expect(typeof category.id).toBe('string')
        expect(typeof category.name).toBe('string')
        expect(typeof category.color).toBe('string')
        expect(typeof category.icon).toBe('string')
      })
    })
  })
})