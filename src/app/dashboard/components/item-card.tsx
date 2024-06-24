'use client'

import Link from 'next/link'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import type { ResourceType } from '@/services/others'
import { useGetItems } from '@/hooks/useGetItems'

export type ItemCardProps = {
  type: ResourceType
  label: string
  icon: React.ReactNode
}

export function ItemCard<TData>({ type, label, icon }: ItemCardProps) {
  const { data, isLoading, isError } = useGetItems<TData>({
    pagination: {
      pageIndex: 0,
      pageSize: 10,
    },
    query: '',
    type,
  })

  if (isError) return null

  if (isLoading) {
    return (
      <Card className="animate-pulse" role="status">
        <CardContent className="space-y-4 p-4">
          <div className="h-6 w-3/4 rounded bg-muted-foreground/20"></div>
          <div className="h-4 w-1/2 rounded bg-muted-foreground/20"></div>
          <div className="h-4 w-1/2 rounded bg-muted-foreground/20"></div>
          <div className="flex justify-start">
            <div className="h-4 w-20 rounded bg-muted-foreground/20" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{label}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {(data as TData as any)?.info?.totalrecords} items
        </div>
        <p className="text-xs text-muted-foreground">
          Explore our diverse {type} collection
        </p>
      </CardContent>
      <CardFooter>
        <Link href={`/${type}s`} className="text-primary" prefetch={false}>
          View {label}
        </Link>
      </CardFooter>
    </Card>
  )
}
