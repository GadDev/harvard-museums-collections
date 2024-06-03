'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { Error } from '@/components/error'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { Account } from '@/services/types/Account'
import { UpdateAccountForm } from '@/components/forms/update-account'

const EditAccountCard = ({ account }: { account: Account }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Details</CardTitle>
        <CardDescription>Edit your account information</CardDescription>
      </CardHeader>
      <CardContent>
        {false ? (
          <Error />
        ) : false ? (
          <div className="flex flex-1 items-center">
            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900 dark:border-gray-600 dark:border-t-gray-400" />
            Loading...
          </div>
        ) : (
          <UpdateAccountForm account={account} />
        )}
      </CardContent>
    </Card>
  )
}

EditAccountCard.displayName = 'EditAccountCard'

export { EditAccountCard }
