'use client'
import { useQuery } from '@tanstack/react-query'
import type { Account } from '@/services/types/Account'
import { getAccountsByOwnerId } from '@/services/account'

import { DataTable } from '@/components/data-table'
import { Error } from '@/components/error'
import { columns } from '@/components/tables/account-columns'
import { ColumnDef } from '@tanstack/react-table'

const UserAccountsTable = ({ userId }: { userId: string }) => {
  const { data, isLoading, isError } = useQuery({
    queryFn: async () => await getAccountsByOwnerId(userId),
    queryKey: ['user-accounts', `${userId}`],
  })
  console.log(columns)
  return isError ? (
    <Error />
  ) : isLoading ? (
    <div className="flex flex-1 items-center">
      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900 dark:border-gray-600 dark:border-t-gray-400" />
      Loading...
    </div>
  ) : (
    <DataTable<Account, Account[]>
      columns={columns.filter(
        (column: ColumnDef<Account>) => column.id !== 'createdAt',
      )}
      data={data as Account[]}
      searchInputPlaceholder="Filter accounts..."
    />
  )
}

UserAccountsTable.displayName = 'UserAccountsTable'

export { UserAccountsTable }
