import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { Badge, BadgeProps, badgeVariants } from '@/components/ui/badge'
import React from 'react'

describe('Badge', () => {
  const renderBadge = (props: BadgeProps) => render(<Badge {...props} />)

  it('renders with default variant', () => {
    renderBadge({ children: 'Default Badge' })
    const badge = screen.getByText('Default Badge')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass(badgeVariants({ variant: 'default' }))
  })

  it('renders with secondary variant', () => {
    renderBadge({ children: 'Secondary Badge', variant: 'secondary' })
    const badge = screen.getByText('Secondary Badge')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass(badgeVariants({ variant: 'secondary' }))
  })

  it('renders with destructive variant', () => {
    renderBadge({ children: 'Destructive Badge', variant: 'destructive' })
    const badge = screen.getByText('Destructive Badge')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass(badgeVariants({ variant: 'destructive' }))
  })

  it('renders with outline variant', () => {
    renderBadge({ children: 'Outline Badge', variant: 'outline' })
    const badge = screen.getByText('Outline Badge')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass(badgeVariants({ variant: 'outline' }))
  })

  it('applies additional class names', () => {
    renderBadge({ children: 'Custom Class Badge', className: 'custom-class' })
    const badge = screen.getByText('Custom Class Badge')
    expect(badge).toHaveClass('custom-class')
  })
})
