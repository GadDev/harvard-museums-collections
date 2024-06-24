import React from 'react'
import { render, screen } from '@testing-library/react'
import { ItemCard } from '@/app/dashboard/components/item-card'
import { useGetItems } from '@/hooks/useGetItems'

// Mock the useGetItems hook
jest.mock('../../src/hooks/useGetItems')

// Define mock data for the test
const mockData = {
  info: {
    totalrecords: 100,
  },
}

// Mock the implementation of useGetItems
const useGetItemsMock = useGetItems as jest.Mock

describe('ItemCard', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders loading state correctly', () => {
    useGetItemsMock.mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    })

    render(
      <ItemCard
        type="gallery"
        label="Galleries"
        icon={<span data-testid="icon">📚</span>}
      />,
    )

    expect(screen.getByRole('status')).toHaveClass('animate-pulse')
  })

  it('renders error state correctly', () => {
    useGetItemsMock.mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    })

    const { container } = render(
      <ItemCard
        type="gallery"
        label="Galleries"
        icon={<span data-testid="icon">📚</span>}
      />,
    )

    expect(container).toBeEmptyDOMElement()
  })

  it('renders data correctly', () => {
    useGetItemsMock.mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
    })

    render(
      <ItemCard
        type="gallery"
        label="Galleries"
        icon={<span data-testid="icon">📚</span>}
      />,
    )

    expect(screen.getByText('Galleries')).toBeInTheDocument()
    expect(screen.getByText('100 items')).toBeInTheDocument()
    expect(
      screen.getByText('Explore our diverse gallery collection'),
    ).toBeInTheDocument()
    expect(screen.getByText('View Galleries')).toBeInTheDocument()
  })
})
