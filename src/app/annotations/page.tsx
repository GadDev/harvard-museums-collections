'use client'

import { AnnotationsTable } from '@/components/tables/annotations-table'

export default function AnnotationsPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="container mx-auto">
        <div className="mb-7 flex flex-1 flex-col justify-between">
          <h1 className="text-lg font-semibold md:text-2xl">Annotations</h1>
        </div>
        <AnnotationsTable />
      </div>
    </main>
  )
}
