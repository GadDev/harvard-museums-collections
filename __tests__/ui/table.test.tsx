import * as React from 'react'
import { render, screen } from '@testing-library/react'
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from '@/components/ui/table' // Update the path to your Table components

describe('Table components', () => {
  test('Table renders correctly', () => {
    render(<Table />)
    const tableElement = screen.getByRole('table')
    expect(tableElement).toBeInTheDocument()
    expect(tableElement).toHaveClass('w-full caption-bottom text-sm')
  })

  test('TableHeader renders correctly', () => {
    render(<TableHeader />)
    const headerElement = screen.getByRole('rowgroup')
    expect(headerElement).toBeInTheDocument()
    expect(headerElement).toHaveClass('[&_tr]:border-b')
  })

  test('TableBody renders correctly', () => {
    render(<TableBody />)
    const bodyElement = screen.getByRole('rowgroup')
    expect(bodyElement).toBeInTheDocument()
    expect(bodyElement).toHaveClass('[&_tr:last-child]:border-0')
  })

  test('TableFooter renders correctly', () => {
    render(<TableFooter />)
    const footerElement = screen.getByRole('rowgroup')
    expect(footerElement).toBeInTheDocument()
    expect(footerElement).toHaveClass(
      'border-t bg-muted/50 font-medium [&>tr]:last:border-b-0',
    )
  })

  test('TableRow renders correctly', () => {
    render(<TableRow />)
    const rowElement = screen.getByRole('row')
    expect(rowElement).toBeInTheDocument()
    expect(rowElement).toHaveClass(
      'border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted',
    )
  })

  test('TableHead renders correctly', () => {
    render(<TableHead />)
    const headElement = screen.getByRole('columnheader')
    expect(headElement).toBeInTheDocument()
    expect(headElement).toHaveClass(
      'h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0',
    )
  })

  test('TableCell renders correctly', () => {
    render(<TableCell />)
    const cellElement = screen.getByRole('cell')
    expect(cellElement).toBeInTheDocument()
    expect(cellElement).toHaveClass(
      'p-4 align-middle [&:has([role=checkbox])]:pr-0',
    )
  })

  test('Table components accept custom class names', () => {
    render(<Table className="custom-class" />)
    const tableElement = screen.getByRole('table')
    expect(tableElement).toHaveClass('custom-class')
  })
})
