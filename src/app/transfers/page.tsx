'use client'

import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { columns } from './columns'
import { DataTable } from '@/components/data-table'
import { Error } from '@/components/error'
import { NavButton } from '@/components/nav-button'
import type { Transfer } from '@/services/types/Transfer'
import { getTransfers } from '@/services/transfer'

export default function TransfersPage() {
  const { data, isLoading, isError } = useQuery({
    queryFn: async () => await getTransfers(),
    queryKey: ['transfers'],
  })

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="container mx-auto">
        <div className="mb-7 flex flex-1 items-center justify-between">
          <h1 className="text-lg font-semibold md:text-2xl">
            Transfers management
          </h1>
          <NavButton href="/make-transfer" variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Make Transfer
          </NavButton>
        </div>
        {isError ? (
          <Error />
        ) : isLoading ? (
          <div className="flex flex-1 items-center">
            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900 dark:border-gray-600 dark:border-t-gray-400" />
            Loading...
          </div>
        ) : (
          <DataTable<Transfer, Transfer[]>
            columns={columns}
            data={data as Transfer[]}
            searchInputPlaceholder="Filter transfers..."
          />
        )}
      </div>
    </main>
  )
}
