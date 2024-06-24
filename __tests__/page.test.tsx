import React from 'react'
import { render, screen } from '@testing-library/react'
import Home from '../src/app/page'

jest.mock('lucide-react', () => ({
  LogInIcon: () => <svg />,
  MoveIcon: () => <svg />,
  UsersIcon: () => <svg />,
}))

jest.mock('next/link', () => {
  // eslint-disable-next-line react/display-name
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>
  }
})

describe.skip('Home component', () => {
  it('renders the main heading', () => {
    render(<Home />)
    const heading = screen.getByRole('heading', {
      name: /Explore the World-Class Collection/i,
    })
    expect(heading).toBeInTheDocument()
  })
})
