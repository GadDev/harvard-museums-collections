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

describe('Home component', () => {
  it('renders the main heading', () => {
    render(<Home />)
    const heading = screen.getByRole('heading', {
      name: /GOM Bank Manage Your Finances with Ease/i,
    })
    expect(heading).toBeInTheDocument()
  })

  it('renders the key features section with headings and descriptions', () => {
    render(<Home />)
    const featuresHeading = screen.getByRole('heading', {
      name: /Key Features/i,
    })
    expect(featuresHeading).toBeInTheDocument()

    const accountManagement = screen.getByRole('heading', {
      name: /Account Management/i,
    })
    const fundTransfers = screen.getByRole('heading', {
      name: /Fund Transfers/i,
    })
    const userManagement = screen.getByRole('heading', {
      name: /User Management/i,
    })

    expect(accountManagement).toBeInTheDocument()
    expect(fundTransfers).toBeInTheDocument()
    expect(userManagement).toBeInTheDocument()

    const accountManagementDesc = screen.getByText(
      /Create, edit, search, and delete your bank accounts with ease./i,
    )
    const fundTransfersDesc = screen.getByText(
      /Transfer funds between your accounts, even with different currencies./i,
    )
    const userManagementDesc = screen.getByText(
      /Create, edit, search, and delete new users with ease./i,
    )

    expect(accountManagementDesc).toBeInTheDocument()
    expect(fundTransfersDesc).toBeInTheDocument()
    expect(userManagementDesc).toBeInTheDocument()
  })

  it('contains links to the respective pages', () => {
    render(<Home />)

    const accountManagementLink = screen.getByRole('link', {
      name: /Account Management/i,
    })
    const fundTransfersLink = screen.getByRole('link', {
      name: /Fund Transfers/i,
    })
    const userManagementLink = screen.getByRole('link', {
      name: /User Management/i,
    })

    expect(accountManagementLink).toHaveAttribute('href', '/accounts')
    expect(fundTransfersLink).toHaveAttribute('href', '/transfers')
    expect(userManagementLink).toHaveAttribute('href', '/users')
  })
})
