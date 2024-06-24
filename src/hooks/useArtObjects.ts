import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { getArtObjects } from '@/services/object'
import type { PaginationState } from '@tanstack/react-table'

type UseArtObjects = {
  pagination: PaginationState
  query?: string
}

export const useArtObjects = ({ pagination, query }: UseArtObjects) => {
  return useQuery({
    queryFn: async () => {
      return await getArtObjects({
        page: pagination.pageIndex + 1,
        size: pagination.pageSize,
        query: query ? `title=${query}` : '',
      })
    },
    queryKey: ['objects', pagination.pageIndex + 1, pagination.pageSize, query],
    staleTime: Infinity,
    placeholderData: keepPreviousData,
  })
}
