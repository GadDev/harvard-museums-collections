'use client'

import Image from 'next/image'
import { Error } from '@/components/error'

import type { Person } from '@/services/types/Person'
import type { Image as ImageType } from '@/services/types/Object'
import { useGetItems } from '@/hooks/useGetItems'
import { ArtObjectResponse } from '@/services/object'

export const Images = ({ personData }: { personData: Person | undefined }) => {
  const { data, isLoading, isError } = useGetItems<ArtObjectResponse>({
    pagination: {
      pageIndex: 0,
      pageSize: 5,
    },
    query: personData ? `title:${encodeURI(personData.displayname)}` : '',
    type: 'object',
    options: {
      enabled: !!personData,
    },
  })

  if (!personData) return null

  if (isError) {
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

  const records = (data as ArtObjectResponse)?.records || []

  const images: ImageType[] = records.reduce(
    (acc: any, record) => {
      const newArr = [...acc]
      if (record.images && record.images.length > 0) {
        record.images.map((image) => newArr.push(image))

        return newArr
      }

      return newArr
    },
    [] as ImageType[] | any[],
  )
  return (
    <div className="grid items-start gap-8 md:grid-cols-4">
      {images.slice(0, 4).map((image) => (
        <Image
          key={image?.idsid}
          src={`https://ids.lib.harvard.edu/ids/view/${image?.idsid}?height=800&width=600&usqp=CAU&f=0&qlt=80&resMode=sharp2&op_usm=1.75,0.1,2,0&fmt=jpg&fit=crop`}
          alt={image?.description || 'No image alt text available'}
          width={250}
          height={250}
          className="mb-6 aspect-[4/3] w-full object-cover"
          priority={true}
          style={{
            maxWidth: '100%',
            height: 'auto',
          }}
        />
      ))}
    </div>
  )
}
