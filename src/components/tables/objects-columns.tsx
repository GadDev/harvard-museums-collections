'use client'

import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
import type { ArtObject } from '@/services/types/Object'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { Badge } from '../ui/badge'
import { formatDateTime } from '@/lib/utils'

export const columns: ColumnDef<ArtObject>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => {
      return <p className="w-80 truncate text-ellipsis">{row.original.title}</p>
    },
  },
  {
    accessorKey: 'period',
    header: 'Period',
    cell: ({ row }) => {
      const period = row.original.period
      return period ? (
        <span>{row.original.period}</span>
      ) : (
        <Badge variant="outline">Unspecified</Badge>
      )
    },
  },
  {
    accessorKey: 'division',
    header: 'Division',
  },
  {
    id: 'lastupdate',
    accessorKey: 'lastupdate',
    header: () => <div className="text-right">Last update</div>,
    cell: ({ row }) => {
      const date = formatDateTime(row.getValue('lastupdate'))

      return <div className="font-small text-right">{date}</div>
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
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
                <Link href={`/objects/${row.original.id}`}>View object</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
    enableHiding: false,
  },
]
