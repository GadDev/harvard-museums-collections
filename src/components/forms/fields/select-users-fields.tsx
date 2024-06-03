'use client'

import { useQuery } from '@tanstack/react-query'
import type { Control } from 'react-hook-form'
import { Error } from '@/components/error'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { getUsers } from '@/services/user'
const SelectUsersField = ({
  control,
  isDisabled = false,
}: {
  control: any
  isDisabled?: boolean
}) => {
  const { data, isLoading, isError } = useQuery({
    queryFn: async () => await getUsers(),
    queryKey: ['users'],
  })

  if (isLoading)
    return (
      <div className="flex flex-1 items-center">
        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900 dark:border-gray-600 dark:border-t-gray-400" />
        Loading...
      </div>
    )

  if (isError) return <Error />

  return (
    <FormField
      control={control}
      name="ownerId"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Owner</FormLabel>
          <FormControl>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              disabled={isDisabled}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select owner" />
              </SelectTrigger>
              <SelectContent>
                {data?.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.firstName} {user.lastName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

SelectUsersField.displayName = 'SelectUsersField'

export { SelectUsersField }
