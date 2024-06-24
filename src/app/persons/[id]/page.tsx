'use client'

import Link from 'next/link'
import { ArrowLeftIcon } from 'lucide-react'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { getPersonById } from '@/services/person'
import { Error } from '@/components/error'

import type { Person } from '@/services/types/Person'
import { Images } from './components/images'

export default function PersonPage({ params }: { params: { id: string } }) {
  const { id } = params

  const { data, isLoading, isError } = useQuery<Person>({
    queryFn: async () => await getPersonById(id),
    queryKey: ['person', id],
    staleTime: Infinity,
    placeholderData: keepPreviousData,
  })

  const renderPersonDetails = (data: Person | undefined, error: boolean) => {
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
      <div className="mx-auto max-w-5xl px-4 py-2 md:px-1 md:py-2 lg:py-2">
        <header className="mb-8 md:mb-12">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div>
              <h1 className="text-3xl font-bold md:text-4xl">
                {data?.displayname}
              </h1>
              <p className="text-muted-foreground">{data?.displaydate}</p>
            </div>
            <p className="text-muted-foreground">
              Culture: {data?.culture || 'Unknown'}
            </p>
          </div>
        </header>
        <Images personData={data} />
        <section className="mb-12 md:mb-16">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">Details</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-2 text-lg font-semibold">Id</h3>
              <p>{data?.id ?? 'Unknown'}</p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold">Collections</h3>
              <Link
                href={data?.url || '#'}
                className="underline"
                prefetch={false}
              >
                Link
              </Link>
            </div>
          </div>
        </section>
        <section className="mb-12 md:mb-16">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">Biography</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-2 text-lg font-semibold">Birthplace</h3>
              <p>{data?.birthplace ?? 'Unknown'}</p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold">Deathplace</h3>
              <p>{data?.deathplace ?? 'Unknown'}</p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold">VIAF</h3>
              <p>
                <Link
                  href={`https://viaf.org/viaf/${data?.viaf_id}`}
                  className="underline"
                  prefetch={false}
                >
                  {data?.viaf_id ?? 'Unknown'}
                </Link>
              </p>
            </div>

            <div>
              <h3 className="mb-2 text-lg font-semibold">Wikidata</h3>
              <p>
                <Link
                  href={`https://www.wikidata.org/wiki/${data?.wikidata_id}`}
                  className="underline"
                  prefetch={false}
                >
                  {data?.wikidata_id}
                </Link>
              </p>
            </div>
          </div>
        </section>
      </div>
    )
  }
  return (
    <>
      <div className="flex flex-1 items-center px-4 py-4">
        <Link
          href="/persons"
          className="flex items-center gap-2 text-muted-foreground underline-offset-4 hover:underline"
          prefetch={false}
        >
          <ArrowLeftIcon className="h-4 w-4" />
          <span className="text-sm">Back to Persons</span>
        </Link>
      </div>
      {renderPersonDetails(data, isError)}
    </>
  )
}
