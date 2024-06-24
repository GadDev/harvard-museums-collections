'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeftIcon } from 'lucide-react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { getArtObjectById } from '@/services/object'
import { Error } from '@/components/error'

import type { ArtObjectItem } from '@/services/types/Item'

export const Content = ({ id }: { id: string }) => {
  const { data, isLoading, isError } = useQuery({
    queryFn: async () => await getArtObjectById(id),
    queryKey: ['object', id],
    staleTime: Infinity,
    placeholderData: keepPreviousData,
  })

  const renderItemDetails = (
    data: ArtObjectItem | undefined,
    error: boolean,
  ) => {
    if (error) {
      return <Error />
    }

    if (isLoading) {
      return (
        <div className="flex flex-1 items-center">
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900 dark:border-gray-600 dark:border-t-gray-400" />
          Loading...
        </div>
      )
    }

    return (
      <div className="mx-auto max-w-5xl px-4 py-10 md:px-1 md:py-10 lg:py-20">
        <div className="grid items-start gap-8 md:grid-cols-2">
          <div>
            {data?.images && data?.images.length > 0 ? (
              data?.images.map((image) => (
                <Image
                  key={image.idsid}
                  src={`https://ids.lib.harvard.edu/ids/view/${image.idsid}?height=800&width=600&usqp=CAU&f=0&qlt=80&resMode=sharp2&op_usm=1.75,0.1,2,0&fmt=jpg&fit=crop`}
                  alt={data?.title}
                  width={image.width}
                  height={image.height}
                  className="mb-6 aspect-[4/3] w-full object-cover"
                  priority={true}
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                  }}
                />
              ))
            ) : (
              <Image
                key={data?.id}
                src={`https://ids.lib.harvard.edu/ids/view/${data?.id}?&usqp=CAU&f=0&qlt=80&resMode=sharp2&op_usm=1.75,0.1,2,0&fmt=jpg`}
                className="mb-6 aspect-[4/3] w-full object-cover"
                priority={true}
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
                alt={data?.title || 'No image alt text available'}
              />
            )}
          </div>
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                {data?.title}
              </h1>
              <p className="text-muted-foreground">{data?.creditline}</p>
            </div>
            <div className="prose prose-lg">
              <h2 className="mb-3 text-xl font-bold">Description</h2>
              <p>{data?.description ?? 'No description available'}</p>
              <div className="mt-5 grid gap-2">
                <h2 className="text-xl font-bold">Details</h2>
                <div className="flex justify-between">
                  <span className="font-medium">Object Number:</span>
                  <span>{data?.objectnumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Accession Year:</span>
                  <span>{data?.accessionyear}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Date:</span>
                  <span>{data?.dated}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Century:</span>
                  <span>{data?.century}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Classification:</span>
                  <span>{data?.classification}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Medium:</span>
                  <span>{data?.medium || 'Unspecified'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Technique:</span>
                  <span>{data?.technique}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Division:</span>
                  <span>{data?.division}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Culture:</span>
                  <span>{data?.culture}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Dimensions:</span>
                  <span>{data?.dimensions || 'Unspecified'}</span>
                </div>
                <h2 className="text-xl font-bold">Credit Line</h2>
                <div className="flex justify-between">
                  <span>{data?.creditline}</span>
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
          href="/objects"
          className="flex items-center gap-2 text-muted-foreground underline-offset-4 hover:underline"
          prefetch={false}
        >
          <ArrowLeftIcon className="h-4 w-4" />
          <span className="text-sm">Back to Objects</span>
        </Link>
      </div>
      {renderItemDetails(data, isError)}
    </>
  )
}
