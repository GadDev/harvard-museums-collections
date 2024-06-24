import {
  useQuery,
  keepPreviousData,
  UseQueryOptions,
} from '@tanstack/react-query'
import { getItems } from '@/services/others'
import type { PaginationState } from '@tanstack/react-table'
import type { ResourceType } from '@/services/others'

type UseItems = {
  pagination?: PaginationState
  query?: string
  type: ResourceType
  options?: Partial<UseQueryOptions>
}

export const useGetItems = <TData>({
  pagination = { pageIndex: 0, pageSize: 10 },
  query,
  type,
  options,
}: UseItems) => {
  const fetch = getItems<TData>(type)

  const { data, ...rest } = useQuery({
    queryFn: async () => {
      return await fetch({
        page: pagination.pageIndex + 1,
        size: pagination.pageSize,
        query: query ?? '',
      })
    },
    queryKey: [
      `${type}s`,
      pagination.pageIndex + 1,
      pagination.pageSize,
      query,
    ],
    staleTime: Infinity,
    placeholderData: keepPreviousData,
    ...options,
  })

  return { data, ...rest }
}
