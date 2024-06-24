import { getItems, ResourceType, AnnotationResponse } from '@/services/others'
import { server } from '../../mocks/node'
import { http, HttpResponse } from 'msw'
import { BASE_HARVARD_API_URL } from '@/lib/constants/api'
import { Annotation } from '@/services/types/Annotation'

describe('getItems', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  it('fetches items successfully', async () => {
    const type: ResourceType = 'annotation'
    const mockData = {
      info: { totalrecords: 100, page: 1 },
      records: [{ id: 1 }] as Annotation[],
    } as AnnotationResponse

    server.use(
      http.get(`${BASE_HARVARD_API_URL}/${type}**`, () => {
        return HttpResponse.json(mockData)
      }),
    )

    const data = await getItems<AnnotationResponse>(type)({ page: 1, size: 15 })
    expect(data).toEqual(mockData)
  })

  it('handles errors correctly', async () => {
    const type: ResourceType = 'annotation'

    server.use(
      http.get(`${BASE_HARVARD_API_URL}/${type}**`, () => {
        return HttpResponse.error()
      }),
    )

    await expect(
      getItems<AnnotationResponse>(type)({ page: 1, size: 15 }),
    ).rejects.toThrow()
  })
})
