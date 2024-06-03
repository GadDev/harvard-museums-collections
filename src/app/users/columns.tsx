'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import type { User } from '@/services/types/User'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { formatDateTime } from '@/lib/utils'
import Link from 'next/link'

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'firstName',
    header: 'First Name',
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
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
    accessorKey: 'updatedAt',
    header: () => <div className="text-right">Updated at</div>,
    cell: ({ row }) => {
      const date = formatDateTime(row.getValue('updatedAt'))

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
                <Link href={`/users/${row.original.id}`}>View / Edit user</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
    enableHiding: false,
  },
]
