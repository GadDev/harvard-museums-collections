import { render, screen } from '@testing-library/react'
import Home from '../src/app/page'

describe('Home Component', () => {
  test('renders the featured artwork image', () => {
    render(<Home />)
    const image = screen.getByRole('img', { name: /featured artwork/i })
    expect(image).toBeInTheDocument()
  })

  test('renders the explore collection link', () => {
    render(<Home />)
    const exploreLink = screen.getByRole('link', {
      name: /explore collection/i,
    })
    expect(exploreLink).toBeInTheDocument()
    expect(exploreLink).toHaveAttribute('href', '/dashboard')
  })

  test('renders the explore by category section', () => {
    render(<Home />)
    const categoryHeading = screen.getByRole('heading', {
      name: /explore by category/i,
    })
    expect(categoryHeading).toBeInTheDocument()

    const artifactsLink = screen.getByRole('link', { name: /artifacts/i })
    expect(artifactsLink).toBeInTheDocument()

    const peopleLink = screen.getByRole('link', { name: /people/i })
    expect(peopleLink).toBeInTheDocument()

    const photographyLink = screen.getByRole('link', { name: /photography/i })
    expect(photographyLink).toBeInTheDocument()

    const drawingLink = screen.getByRole('link', { name: /drawing/i })
    expect(drawingLink).toBeInTheDocument()
  })

  test('renders the unlock API section', () => {
    render(<Home />)
    const apiHeading = screen.getByRole('heading', {
      name: /unlock the power of the harvard art museums api/i,
    })
    expect(apiHeading).toBeInTheDocument()

    const signUpLink = screen.getByRole('link', {
      name: /sign up for api access/i,
    })
    expect(signUpLink).toBeInTheDocument()
    expect(signUpLink).toHaveAttribute(
      'href',
      'https://docs.google.com/forms/d/1Fe1H4nOhFkrLpaeBpLAnSrIMYvcAxnYWm0IU9a6IkFA/viewform',
    )
  })
})
