'use client'

import {
  BookIcon,
  CalendarIcon,
  CuboidIcon,
  ImageIcon,
  LayoutTemplateIcon,
  UsersIcon,
  VideoIcon,
  EarthIcon,
} from 'lucide-react'
import { Error } from '@/components/error'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AnnotationsTable } from '../../components/tables/annotations-table'
import { ItemCard } from './components/item-card'
import { useGetItems } from '@/hooks/useGetItems'

export default function ArtObjectItemPage() {
  const { data, isLoading, isError } = useGetItems({
    type: 'color',
    pagination: { pageIndex: 0, pageSize: 27 },
  })

  const renderColors = (data: any, error: boolean, isLoading: boolean) => {
    if (error) {
      return <Error />
    }

    if (isLoading) {
      const arr = Array.from({ length: 10 }, (_, i) => Math.random() * i)

      return (
        <div className="mt- 5 flex flex-1 flex-wrap justify-between gap-4">
          {arr.map((i) => (
            <div
              key={i}
              className="w-[150px] animate-pulse bg-[#f5f5f5] dark:bg-[#1f1f1f]"
            >
              <div className="space-y-4 p-4">
                <div className="h-6 w-3/4 rounded bg-muted-foreground/20" />
                <div className="h-4 w-1/2 rounded bg-muted-foreground/20" />
                <div className="h-4 w-1/2 rounded bg-muted-foreground/20" />
                <div className="flex justify-start">
                  <div className="h-3 w-20 rounded bg-muted-foreground/20" />
                  <div className="h-3 w-20 rounded bg-muted-foreground/20" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )
    }

    return (
      <div className="mt-7 flex flex-1 flex-wrap justify-between gap-4">
        {(data as any)?.records?.map((color: any) => (
          <div
            key={color.id}
            className="w-[150px] bg-[#f5f5f5] dark:bg-[#1f1f1f]"
          >
            <div
              className="h-32 w-full"
              style={{ backgroundColor: color.hex }}
            />
            <div className="p-4">
              <h3 className="text-sm font-medium">{color.name}</h3>
              <p className="text-sm text-muted-foreground">
                {color.hex.toUpperCase()}
              </p>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-10">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <ItemCard
          type="object"
          label="Artifacts"
          icon={<CuboidIcon className="h-4 w-4 text-muted-foreground" />}
        />
        <ItemCard
          type="person"
          label="People"
          icon={<UsersIcon className="h-4 w-4 text-muted-foreground" />}
        />
        <ItemCard
          type="exhibition"
          label="Exhibitions"
          icon={<CalendarIcon className="h-4 w-4 text-muted-foreground" />}
        />
        <ItemCard
          type="publication"
          label="Publications"
          icon={<BookIcon className="h-4 w-4 text-muted-foreground" />}
        />
        <ItemCard
          type="gallery"
          label="Galleries"
          icon={
            <LayoutTemplateIcon className="h-4 w-4 text-muted-foreground" />
          }
        />
        <ItemCard
          type="image"
          label="Images"
          icon={<ImageIcon className="h-4 w-4 text-muted-foreground" />}
        />
        <ItemCard
          type="video"
          label="Videos"
          icon={<VideoIcon className="h-4 w-4 text-muted-foreground" />}
        />
        <ItemCard
          type="culture"
          label="Cultures"
          icon={<EarthIcon className="h-4 w-4 text-muted-foreground" />}
        />
      </div>
      <div className="flex">
        <Tabs defaultValue="colors">
          <TabsList>
            <TabsTrigger value="colors">Colors</TabsTrigger>
            <TabsTrigger value="annotations">Annotations</TabsTrigger>
          </TabsList>
          <TabsContent value="colors">
            {renderColors(data, isError, isLoading)}
          </TabsContent>
          <TabsContent value="annotations">
            <AnnotationsTable />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
