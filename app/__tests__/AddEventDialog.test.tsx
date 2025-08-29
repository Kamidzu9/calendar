import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddEventDialog from '../components/AddEventDialog'

const mockProps = {
  open: true,
  date: new Date('2025-01-15T00:00:00Z'),
  onClose: jest.fn(),
  onSubmit: jest.fn(),
}

describe('AddEventDialog', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders dialog when open', () => {
    render(<AddEventDialog {...mockProps} />)
    expect(screen.getByText(/Add event for/)).toBeInTheDocument()
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument()
  })

  it('does not render when closed', () => {
    render(<AddEventDialog {...mockProps} open={false} />)
    expect(screen.queryByText(/Add event for/)).not.toBeInTheDocument()
  })

  it('allows user to input event details', async () => {
    const user = userEvent.setup()
    render(<AddEventDialog {...mockProps} />)
    
    const titleInput = screen.getByLabelText(/title/i)
    await user.type(titleInput, 'Test Event')
    expect(titleInput).toHaveValue('Test Event')
  })

  it('calls onSubmit with correct data when form is submitted', async () => {
    const user = userEvent.setup()
    render(<AddEventDialog {...mockProps} />)
    
    const titleInput = screen.getByLabelText(/title/i)
    await user.type(titleInput, 'Test Event')
    
    const submitButton = screen.getByText(/create/i)
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(mockProps.onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Test Event'
        })
      )
    })
  })

  it('calls onClose when cancel is clicked', async () => {
    const user = userEvent.setup()
    render(<AddEventDialog {...mockProps} />)
    
    const cancelButton = screen.getByText(/cancel/i)
    await user.click(cancelButton)
    
    expect(mockProps.onClose).toHaveBeenCalled()
  })

  it('validates required fields', async () => {
    const user = userEvent.setup()
    render(<AddEventDialog {...mockProps} />)
    
    const submitButton = screen.getByText(/create/i)
    await user.click(submitButton)
    
    // Should not call onSubmit if title is empty
    expect(mockProps.onSubmit).not.toHaveBeenCalled()
  })
})