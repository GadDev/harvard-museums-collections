import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import RootLayout from '../src/app/layout'
import React from 'react'

describe.skip('RootLayout', () => {
  it('renders the main layout with children', () => {
    render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>,
    )

    // Check if the children content is rendered
    expect(screen.getByText('Test Content')).toBeInTheDocument()

    // Check if the logo is rendered
    expect(screen.getByText('Harvard Art Museums')).toBeInTheDocument()

    // Check if navigation items are rendered
    expect(screen.getByText('Persons')).toBeInTheDocument()
    expect(screen.getByText('Object')).toBeInTheDocument()

    // Check if the footer is rendered
    expect(screen.getByText('© 2024 Harvard Art Museums')).toBeInTheDocument()
  })

  it('renders the dark mode toggle button', () => {
    render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>,
    )

    // Check if the mode toggle button is rendered
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
})
