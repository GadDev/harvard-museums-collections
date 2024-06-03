'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import type { Account } from '@/services/types/Account'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { formattedCurrency, formatDateTime } from '@/lib/utils'
import Link from 'next/link'

export const columns: ColumnDef<Account>[] = [
  {
    accessorKey: 'name',
    header: 'Account Name',
  },
  {
    accessorKey: 'accountNumber',
    header: 'Account Number',
  },
  {
    accessorKey: 'accountType',
    header: 'Account Type',
  },
  {
    accessorKey: 'currency',
    header: 'Currency',
  },
  {
    accessorKey: 'balance',
    header: () => <div className="text-right">Balance</div>,
    cell: ({ row }) => {
      const balance = parseFloat(row.getValue('balance'))
      const currency = row.original.currency

      const formatted = formattedCurrency(balance, currency)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    id: 'createdAt',
    accessorKey: 'createdAt',
    header: () => <div className="text-right">Created at</div>,
    cell: ({ row }) => {
      const date = formatDateTime(row.getValue('createdAt'))

      return <div className="font-small text-right">{date}</div>
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const account = row.original

      return (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={`/accounts/${row.original.id}`}>
                  View / Edit account
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={`/users/${row.original.ownerId}`}>View owner</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
    enableHiding: false,
  },
]
