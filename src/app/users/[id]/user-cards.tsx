'use client'

import type { AxiosError } from 'axios'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import type { User } from '@/services/types/User'
import { getUserById, deleteUser } from '@/services/user'
import { Error } from '@/components/error'
import { useRouter } from 'next/navigation'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'

import { ViewUserCard } from './view-user-card'
import { EditUserCard } from './edit-user-card'
import { UserAccountsTable } from './user-accounts-table'

const UserCards = ({ id }: { id: string }) => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { data, isLoading, isError } = useQuery({
    queryFn: async () => await getUserById(id as string),
    queryKey: ['users', `${id}`],
  })

  const { mutate, isPending } = useMutation<
    User,
    AxiosError | Error,
    { id: string }
  >({
    mutationFn: ({ id }) => deleteUser(id as string),
    onSuccess: () => {
      toast({
        title: 'User deleted!',
        description: 'User has been deleted successfully.',
      })
      queryClient.refetchQueries({
        queryKey: ['users'],
        type: 'active',
      })
      router.push('/users')
    },
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'An error occurred.',
        description: error.message,
      })
    },
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
    <>
      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
        <div className="flex flex-col gap-6">
          <ViewUserCard user={data as User} />
          <UserAccountsTable userId={id} />
        </div>
        <div className="flex flex-col gap-6">
          <EditUserCard user={data as User} />
        </div>
      </div>
      <div className="w-full border-t pt-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Need to delete this user?
          </p>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete User</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This user and all associated
                  data will be permanently deleted.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  disabled={isPending}
                  onClick={() => mutate({ id })}
                  style={{ backgroundColor: '#f87171' }}
                >
                  {isPending ? 'Delete user ...' : 'Confirm'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </>
  )
}

UserCards.displayName = 'UserCards'

export { UserCards }
