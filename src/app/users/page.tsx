'use client'

import { useQuery } from '@tanstack/react-query'
import { Plus } from 'lucide-react'

import type { User } from '@/services/types/User'
import { getUsers } from '@/services/user'

import { columns } from './columns'
import { DataTable } from '@/components/data-table'
import { Error } from '@/components/error'
import { NavButton } from '@/components/nav-button'

export default function UsersPage() {
  const { data, isLoading, isError } = useQuery({
    queryFn: async () => await getUsers(),
    queryKey: ['users'],
  })

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="container mx-auto">
        <div className="mb-7 flex flex-1 items-center justify-between">
          <h1 className="text-lg font-semibold md:text-2xl">
            Users management
          </h1>
          <NavButton href="/create-user" variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            New User
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
          <DataTable<User, User[]>
            columns={columns}
            data={data as User[]}
            searchInputPlaceholder="Filter users..."
          />
        )}
      </div>
    </main>
  )
}
