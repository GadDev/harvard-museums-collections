'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDateTime } from '@/lib/utils'

import type { User } from '@/services/types/User'

const ViewUserCard = ({ user }: { user: User }) => {
  const { firstName, lastName, email, id, createdAt, updatedAt } = user
  console.log('ViewUserCard', user)
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {firstName} {lastName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Unique ID
            </div>
            <div className="font-medium">{id}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Email
            </div>
            <div className="font-medium">{email}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Created at
            </div>
            <div className="font-medium">{formatDateTime(createdAt || '')}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Updated at
            </div>
            <div className="font-medium">{formatDateTime(updatedAt || '')}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

ViewUserCard.displayName = 'ViewUserCard'

export { ViewUserCard }
