'use client'

import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
import type { Annotation } from '@/services/types/Annotation'
import { formatDateTime } from '@/lib/utils'

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

export const columns: ColumnDef<Annotation>[] = [
  {
    accessorKey: 'id',
    header: 'Id',
  },
  {
    accessorKey: 'type',
    header: 'Type',
  },
  {
    accessorKey: 'source',
    header: 'Source',
  },
  {
    id: 'createdate',
    accessorKey: 'createdate',
    header: () => <div className="text-right">Created at</div>,
    cell: ({ row }) => {
      const date = formatDateTime(row.getValue('createdate'))

      return <div className="font-small text-right">{date}</div>
    },
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
                <Link href={`/annotations/${row.original.id}`}>
                  View annotation
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
    enableHiding: false,
  },
]
