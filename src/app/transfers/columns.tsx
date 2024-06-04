'use client'

import { ColumnDef } from '@tanstack/react-table'
import type { Transfer } from '@/services/types/Transfer'

import { formatDateTime, formattedCurrency } from '@/lib/utils'


export const columns: ColumnDef<Transfer>[] = [
  {
    accessorKey: 'fromAccountId',
    header: 'Sender Account',
  },
  {
    accessorKey: 'toAccountId',
    header: 'Receiver Account',
  },
  {
    accessorKey: 'currency',
    header: 'currency',
  },
  {
    accessorKey: 'amount',
    header: () => <div className="text-right">Balance</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'))
      const currency = row.original.currency as string

      const formatted = formattedCurrency(amount, currency)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: 'executedAt',
    header: () => <div className="text-right">Updated at</div>,
    cell: ({ row }) => {
      const date = formatDateTime(row.getValue('executedAt'))

      return <div className="font-small text-right">{date}</div>
    },
  },
]
