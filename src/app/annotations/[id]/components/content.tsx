'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeftIcon } from 'lucide-react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { formatDateTime } from '@/lib/utils'
import { getAnnotationById } from '@/services/others'
import { Error } from '@/components/error'

import { Annotation } from '@/services/types/Annotation'

export const Content = ({ id }: { id: string }) => {
  const { data, isLoading, isError } = useQuery({
    queryFn: async () => await getAnnotationById(id),
    queryKey: ['annotation', id],
    staleTime: Infinity,
    placeholderData: keepPreviousData,
  })

  const renderAnnotationDetails = (
    data: Annotation | undefined,
    error: boolean,
    isLoading: boolean,
  ) => {
    if (error) {
      return <Error />
    }

    if (isLoading) {
      return (
        <div className="mx-auto max-w-5xl px-4 py-10 md:px-1 md:py-10 lg:py-20">
          <div className="flex flex-1 items-center">
            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900 dark:border-gray-600 dark:border-t-gray-400" />
            Loading...
          </div>
        </div>
      )
    }

    return (
      <div className="mx-auto max-w-5xl px-4 py-10 md:px-1 md:py-10 lg:py-20">
        <div className="grid items-start gap-8">
          <div>
            <Image
              key={data?.imageid}
              src={data?.target || ''}
              alt={data?.source || ''}
              width={500}
              height={320}
              className="mb-6 aspect-[4/3] w-[500px] object-cover"
              priority={true}
              style={{
                maxWidth: '100%',
                height: 'auto',
              }}
            />
          </div>
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Annotation #{data?.annotationid}
              </h1>
              <p className="text-muted-foreground">{data?.source}</p>
            </div>
            <div className="prose prose-lg">
              <div className="mt-5 grid gap-2">
                <h2 className="text-xl font-bold">Details</h2>
                <div className="flex justify-between">
                  <span className="font-medium">Body:</span>
                  <span>{data?.body}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Created at:</span>
                  <span>{formatDateTime(data?.createdate || '')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Last update:</span>
                  <span>{formatDateTime(data?.lastupdate || '')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <>
      <div className="flex flex-1 items-center px-4 py-4">
        <Link
          href="/annotations"
          className="flex items-center gap-2 text-muted-foreground underline-offset-4 hover:underline"
          prefetch={false}
        >
          <ArrowLeftIcon className="h-4 w-4" />
          <span className="text-sm">Back to Annotations</span>
        </Link>
      </div>
      {renderAnnotationDetails(data, isError, isLoading)}
    </>
  )
}
