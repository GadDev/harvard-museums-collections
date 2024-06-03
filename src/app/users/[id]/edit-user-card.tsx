'use client'

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { Error } from '@/components/error'
import { UpdateUserForm } from '@/components/forms/update-user'
import type { User } from '@/services/types/User'

const EditUserCard = ({ user }: { user: User }) => (
  <Card>
    <CardHeader>
      <CardTitle>Edit User</CardTitle>
      <CardDescription>Edit your user information</CardDescription>
    </CardHeader>
    {false ? (
      <Error />
    ) : false ? (
      <div className="flex flex-1 items-center">
        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900 dark:border-gray-600 dark:border-t-gray-400" />
        Loading...
      </div>
    ) : (
      <CardContent>
        <div className="grid gap-4">
          <UpdateUserForm user={user} />
        </div>
      </CardContent>
    )}
  </Card>
)

EditUserCard.displayName = 'EditUserCard'

export { EditUserCard }
