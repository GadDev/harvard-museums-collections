import { server } from '../mocks/node'
import { http, HttpResponse } from 'msw'
import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import PersonsPage from '../src/app/persons/page'
import { Person } from '@/services/types/Person'
import { PersonsResponse } from '@/services/person'
import { BASE_HARVARD_API_URL } from '@/lib/constants/api'

// Establish API mocking before all tests.
beforeAll(() =>
  server.listen({
    onUnhandledRequest(request, print) {
      // Do not print warnings on unhandled requests to https://<:userId>.ingest.us.sentry.io/api/
      // Note: a request handler with passthrough is not suited with this type of url
      //       until there is a more permissible url catching system
      //       like requested at https://github.com/mswjs/msw/issues/1804
      if (request.url.includes('api.harvardartmuseums.org')) {
        return
      }

      // Print the regular MSW unhandled request warning otherwise.
      print.warning()
    },
  }),
)
// Reset any request handlers that are declared as a part of our tests (i.e. for testing one-time error scenarios)
afterEach(() => server.resetHandlers())
// Clean up after the tests are finished.
afterAll(() => server.close())

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retryDelay: 1,
      retry: 0,
    },
  },
})

function renderWithClient(ui: JSX.Element) {
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  )
}

const people = [
  {
    gender: 'male',
    displaydate: '1812-1870',
    objectcount: 2,
    roles: [
      {
        role: 'Sitter',
        context: 'object',
        frequency: 2,
      },
    ],
    wikidata_id: 'Q5686',
    dateend: 1870,
    url: 'https://www.harvardartmuseums.org/collections/person/2',
    viaf_id: '88666393',
    names: [
      {
        displayname: 'Charles Dickens',
        type: 'Primary Name',
      },
    ],
    birthplace: null,
    wikipedia_id: '5884',
    datebegin: 1812,
    culture: null,
    displayname: 'Charles Dickens',
    alphasort: 'Dickens, Charles',
    ulan_id: '500106117',
    personid: 2,
    deathplace: null,
    id: 2,
    lastupdate: '2024-06-21T06:16:48-0400',
    lcnaf_id: 'n78087607',
  },
  {
    gender: 'unknown',
    displaydate: null,
    objectcount: 0,
    roles: [
      {
        role: 'Author',
        context: 'publication',
        frequency: 1,
      },
    ],
    dateend: 0,
    url: 'https://www.harvardartmuseums.org/collections/person/5',
    birthplace: null,
    datebegin: 0,
    culture: null,
    displayname: 'Aspasia Papanastasiou',
    alphasort: 'Papanastasiou, Aspasia',
    personid: 5,
    deathplace: null,
    id: 5,
    lastupdate: '2024-06-21T06:16:36-0400',
  },
] as Person[]

it('handles error state', async () => {
  server.use(
    http.get(`**${BASE_HARVARD_API_URL}/persons**`, () => {
      return new HttpResponse('Internal Server Error', {
        status: 500,
        headers: {
          'Access-Control-Allow-Headers': 'x-interceptors-internal-request-id',
          'Access-Control-Allow-Credentials': 'true',
        },
      })
    }),
  )

  renderWithClient(<PersonsPage />)

  await waitFor(() => {
    screen.getByText(
      /We're sorry, but there seems to be an issue with your request. Please try again later or contact our support team if the problem persists./i,
    )
  })

  screen.getByRole('heading', {
    name: /Oops, something went wrong!/i,
  })
})

it('renders PersonsPage and loads data', async () => {
  const mockData = {
    info: { totalrecords: 100, page: 1 },
    records: people,
  } as PersonsResponse

  server.use(
    http.get(
      `**${BASE_HARVARD_API_URL}/person**`,
      () => {
        return HttpResponse.json(mockData, {
          headers: {
            'Access-Control-Allow-Headers':
              'x-interceptors-internal-request-id',
            'Access-Control-Allow-Credentials': 'true',
          },
        })
      },
      { once: true },
    ),
  )

  renderWithClient(<PersonsPage />)

  screen.getByRole('heading', {
    name: /Persons/i,
  })

  screen.getByText(/Artists in the Harvard Art Museums collections/i)

  // Check if loading state is displayed
  expect(screen.getByText(/Loading.../i)).toBeInTheDocument()

  // Wait for the data to be loaded
  await waitFor(() => {
    expect(screen.getByText(/Charles Dickens/i)).toBeInTheDocument()
  })

  expect(screen.getByText(/Aspasia Papanastasiou/i)).toBeInTheDocument()

  // Check if pagination is rendered
  expect(screen.getByRole('button', { name: /Next/i })).toBeInTheDocument()
})
