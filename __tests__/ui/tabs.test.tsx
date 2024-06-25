import { render, screen } from '@testing-library/react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import userEvent from '@testing-library/user-event'

describe('Tabs Component', () => {
  test('renders the tabs list', () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>,
    )

    const tabList = screen.getByRole('tablist')
    expect(tabList).toBeInTheDocument()

    const tab1 = screen.getByRole('tab', { name: /tab 1/i })
    expect(tab1).toBeInTheDocument()
    expect(tab1).toHaveAttribute('data-state', 'active')

    const tab2 = screen.getByRole('tab', { name: /tab 2/i })
    expect(tab2).toBeInTheDocument()
    expect(tab2).toHaveAttribute('data-state', 'inactive')
  })

  test('renders the tab content', () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>,
    )

    const content1 = screen.getByText(/content 1/i)
    expect(content1).toBeInTheDocument()

    const content2 = screen.queryByText(/content 2/i)
    expect(content2).not.toBeInTheDocument()
  })

  test('switches tab content on trigger click', async () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>,
    )

    const tab2 = screen.getByRole('tab', { name: /tab 2/i })
    await userEvent.click(tab2)

    const content1 = screen.queryByText(/content 1/i)
    expect(content1).not.toBeInTheDocument()

    const content2 = screen.getByText(/content 2/i)
    expect(content2).toBeInTheDocument()
  })

  test('renders custom className on TabsList', () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList className="custom-class">
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>,
    )

    const tabList = screen.getByRole('tablist')
    expect(tabList).toHaveClass('custom-class')
  })
})
