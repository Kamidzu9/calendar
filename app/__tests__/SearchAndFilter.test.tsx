import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchAndFilter from '../components/SearchAndFilter'
import type { Event } from '../types'
import { DEFAULT_CATEGORIES } from '../utils/dates'

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Team Meeting',
    description: 'Weekly standup',
    startTime: new Date('2025-01-15T10:00:00Z'),
    endTime: new Date('2025-01-15T11:00:00Z'),
    category: DEFAULT_CATEGORIES[0], // Work
  },
  {
    id: '2',
    title: 'Doctor Appointment',
    description: 'Annual checkup',
    startTime: new Date('2025-01-15T14:00:00Z'),
    endTime: new Date('2025-01-15T15:00:00Z'),
    category: DEFAULT_CATEGORIES[2], // Health
  }
]

const mockOnFilteredEventsChange = jest.fn()

describe('SearchAndFilter Component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders search input', () => {
    render(
      <SearchAndFilter 
        events={mockEvents} 
        onFilteredEventsChange={mockOnFilteredEventsChange}
      />
    )
    
    expect(screen.getByPlaceholderText('Search events...')).toBeInTheDocument()
  })

  it('renders category selector', () => {
    render(
      <SearchAndFilter 
        events={mockEvents} 
        onFilteredEventsChange={mockOnFilteredEventsChange}
      />
    )
    
    expect(screen.getByText('All Categories')).toBeInTheDocument()
  })

  it('filters events by search query', async () => {
    const user = userEvent.setup()
    render(
      <SearchAndFilter 
        events={mockEvents} 
        onFilteredEventsChange={mockOnFilteredEventsChange}
      />
    )
    
    const searchInput = screen.getByPlaceholderText('Search events...')
    await user.type(searchInput, 'meeting')
    
    // Should call onFilteredEventsChange with filtered results
    expect(mockOnFilteredEventsChange).toHaveBeenCalledWith([mockEvents[0]])
  })

  it('shows clear search button when searching', async () => {
    const user = userEvent.setup()
    render(
      <SearchAndFilter 
        events={mockEvents} 
        onFilteredEventsChange={mockOnFilteredEventsChange}
      />
    )
    
    const searchInput = screen.getByPlaceholderText('Search events...')
    await user.type(searchInput, 'test')
    
    expect(screen.getByRole('button', { name: /clear/i })).toBeInTheDocument()
  })

  it('clears search when clear button is clicked', async () => {
    const user = userEvent.setup()
    render(
      <SearchAndFilter 
        events={mockEvents} 
        onFilteredEventsChange={mockOnFilteredEventsChange}
      />
    )
    
    const searchInput = screen.getByPlaceholderText('Search events...')
    await user.type(searchInput, 'test')
    
    const clearButton = screen.getByRole('button', { name: /clear/i })
    await user.click(clearButton)
    
    expect(searchInput).toHaveValue('')
  })

  it('shows results summary when filtering', async () => {
    const user = userEvent.setup()
    render(
      <SearchAndFilter 
        events={mockEvents} 
        onFilteredEventsChange={mockOnFilteredEventsChange}
      />
    )
    
    const searchInput = screen.getByPlaceholderText('Search events...')
    await user.type(searchInput, 'meeting')
    
    expect(screen.getByText(/Found 1 event/)).toBeInTheDocument()
  })

  it('handles no search results', async () => {
    const user = userEvent.setup()
    render(
      <SearchAndFilter 
        events={mockEvents} 
        onFilteredEventsChange={mockOnFilteredEventsChange}
      />
    )
    
    const searchInput = screen.getByPlaceholderText('Search events...')
    await user.type(searchInput, 'nonexistent')
    
    expect(screen.getByText(/Found 0 events/)).toBeInTheDocument()
  })
})