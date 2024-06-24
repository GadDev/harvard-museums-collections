import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import * as React from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'

describe('Card components', () => {
  it('renders the Card component', () => {
    render(<Card>Card Content</Card>)
    const card = screen.getByText('Card Content')
    expect(card).toBeInTheDocument()
    expect(card).toHaveClass(
      'rounded-lg border bg-card text-card-foreground shadow-sm',
    )
  })

  it('renders the CardHeader component', () => {
    render(<CardHeader>Header Content</CardHeader>)
    const header = screen.getByText('Header Content')
    expect(header).toBeInTheDocument()
    expect(header).toHaveClass('flex flex-col space-y-1.5 p-6')
  })

  it('renders the CardTitle component', () => {
    render(<CardTitle>Title Content</CardTitle>)
    const title = screen.getByText('Title Content')
    expect(title).toBeInTheDocument()
    expect(title).toHaveClass(
      'text-2xl font-semibold leading-none tracking-tight',
    )
  })

  it('renders the CardDescription component', () => {
    render(<CardDescription>Description Content</CardDescription>)
    const description = screen.getByText('Description Content')
    expect(description).toBeInTheDocument()
    expect(description).toHaveClass('text-sm text-muted-foreground')
  })

  it('renders the CardContent component', () => {
    render(<CardContent>Content</CardContent>)
    const content = screen.getByText('Content')
    expect(content).toBeInTheDocument()
    expect(content).toHaveClass('p-6 pt-0')
  })

  it('renders the CardFooter component', () => {
    render(<CardFooter>Footer Content</CardFooter>)
    const footer = screen.getByText('Footer Content')
    expect(footer).toBeInTheDocument()
    expect(footer).toHaveClass('flex items-center p-6 pt-0')
  })

  it('applies additional class names to Card component', () => {
    render(<Card className="custom-class">Card Content</Card>)
    const card = screen.getByText('Card Content')
    expect(card).toHaveClass('custom-class')
  })

  it('applies additional class names to CardHeader component', () => {
    render(<CardHeader className="custom-class">Header Content</CardHeader>)
    const header = screen.getByText('Header Content')
    expect(header).toHaveClass('custom-class')
  })

  it('applies additional class names to CardTitle component', () => {
    render(<CardTitle className="custom-class">Title Content</CardTitle>)
    const title = screen.getByText('Title Content')
    expect(title).toHaveClass('custom-class')
  })

  it('applies additional class names to CardDescription component', () => {
    render(
      <CardDescription className="custom-class">
        Description Content
      </CardDescription>,
    )
    const description = screen.getByText('Description Content')
    expect(description).toHaveClass('custom-class')
  })

  it('applies additional class names to CardContent component', () => {
    render(<CardContent className="custom-class">Content</CardContent>)
    const content = screen.getByText('Content')
    expect(content).toHaveClass('custom-class')
  })

  it('applies additional class names to CardFooter component', () => {
    render(<CardFooter className="custom-class">Footer Content</CardFooter>)
    const footer = screen.getByText('Footer Content')
    expect(footer).toHaveClass('custom-class')
  })
})
