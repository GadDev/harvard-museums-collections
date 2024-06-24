import { useGetItems } from '@/hooks/useGetItems'
import type { AnnotationResponse } from '@/services/others'
import { DataTable } from '@/components/data-table'
import { Error } from '@/components/error'
import { columns } from '@/components/tables/annotations-columns'
import type { PaginationState } from '@tanstack/react-table'
import { useState } from 'react'
import { Annotation } from '@/services/types/Annotation'

export const AnnotationsTable = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [query, setQuery] = useState('')

  const { data, isLoading, isError } = useGetItems<AnnotationResponse>({
    pagination,
    query,
    type: 'annotation',
  })

  return (
    <div className="container mx-auto mt-7 p-0">
      <div className="mb-7 flex flex-1 flex-col justify-between">
        <p className="text-sm">
          Each annotation indicates an area of interest in an image in our
          dataset. An area can be a small portion of an image or it can be the
          entire image. Small regions typically contain a persons face or words.
          Annotations on the full image are typically tags (e.g. cat,
          watermelon, rock) and descriptions (e.g. a cow standing in a field).
        </p>
      </div>
      {isError ? (
        <Error />
      ) : isLoading ? (
        <div className="flex flex-1 items-center">
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900 dark:border-gray-600 dark:border-t-gray-400" />
          Loading...
        </div>
      ) : (
        <DataTable<Annotation, Annotation[]>
          columns={columns}
          data={(data as any)?.records as unknown as Annotation[]}
          searchInputPlaceholder="Filter annotations..."
          pageCount={(data as any)?.info?.pages}
          rowCount={(data as any)?.info?.totalrecords}
          pagination={pagination}
          onPaginationChange={setPagination}
          onSearch={setQuery}
        />
      )}
    </div>
  )
}
