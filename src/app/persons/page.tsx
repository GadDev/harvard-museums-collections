'use client'

import { keepPreviousData, useQuery } from '@tanstack/react-query'
import type { Person } from '@/services/types/Person'
import { getPersons } from '@/services/person'
import { DataTable } from '@/components/data-table'
import { Error } from '@/components/error'
import { columns } from '@/components/tables/persons-columns'
import type { PaginationState } from '@tanstack/react-table'
import { useState } from 'react'

export default function PersonsPage() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [query, setQuery] = useState('')

  const { data, isLoading, isError } = useQuery({
    queryFn: async () =>
      await getPersons({
        page: pagination.pageIndex + 1,
        size: pagination.pageSize,
        query: query ? `*:${query}` : '',
      }),
    queryKey: ['persons', pagination.pageIndex + 1, pagination.pageSize, query],
    staleTime: Infinity,
    placeholderData: keepPreviousData,
  })

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="container mx-auto">
        <div className="mb-7 flex flex-1 flex-col justify-between">
          <h1 className="text-lg font-semibold md:text-2xl">Persons</h1>
          <p className="mt-2 text-sm">
            Artists in the Harvard Art Museums collections
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
          <DataTable<Person, Person[]>
            columns={columns}
            data={data?.records as Person[]}
            searchInputPlaceholder="Filter persons..."
            pageCount={data?.info.pages}
            rowCount={data?.info.totalrecords}
            pagination={pagination}
            onPaginationChange={setPagination}
            onSearch={setQuery}
          />
        )}
      </div>
    </main>
  )
}
