import * as React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from '@/components/ui/input'

describe('Input component', () => {
  test('renders an input element', () => {
    render(<Input />)
    const inputElement = screen.getByRole('textbox')
    expect(inputElement).toBeInTheDocument()
  })

  test('applies default class names', () => {
    render(<Input />)
    const inputElement = screen.getByRole('textbox')
    expect(inputElement).toHaveClass(
      'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
    )
  })

  test('merges custom class names', () => {
    render(<Input className="my-custom-class" />)
    const inputElement = screen.getByRole('textbox')
    expect(inputElement).toHaveClass('my-custom-class')
  })

  test('forwards ref to the input element', () => {
    const ref = React.createRef<HTMLInputElement>()
    render(<Input ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  test('accepts and spreads additional props', () => {
    render(<Input data-testid="custom-input" />)
    const inputElement = screen.getByTestId('custom-input')
    expect(inputElement).toBeInTheDocument()
  })

  test('handles placeholder text', () => {
    render(<Input placeholder="Enter text" />)
    const inputElement = screen.getByPlaceholderText('Enter text')
    expect(inputElement).toBeInTheDocument()
  })

  test('handles disabled state', () => {
    render(<Input disabled />)
    const inputElement = screen.getByRole('textbox')
    expect(inputElement).toBeDisabled()
  })

  test('handles value changes', async () => {
    const handleChange = jest.fn()
    render(<Input onChange={handleChange} />)
    const inputElement = screen.getByRole('textbox')

    await userEvent.type(inputElement, 'test')

    expect(handleChange).toHaveBeenCalledTimes(4) // 't', 'e', 's', 't'
  })
})
