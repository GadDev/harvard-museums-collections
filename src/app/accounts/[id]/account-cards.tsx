'use client'
import type { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { Account } from '@/services/types/Account'
import { getAccountById } from '@/services/account'
import { Error } from '@/components/error'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
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
import { toast } from '@/components/ui/use-toast'
import { TransferFundsForm } from '@/components/forms/transfer'
import { CurrencyExchangeRateCard } from '@/components/currency-exchange-rate-card'

import { ViewAccountCard } from './view-account-card'
import { EditAccountCard } from './edit-account-card'
import { deleteAccount } from '@/services/account'

const AccountCards = ({ id }: { id: string }) => {
  const queryClient = useQueryClient()
  const router = useRouter()
  const { data, isLoading, isError } = useQuery({
    queryFn: async () => await getAccountById(id as string),
    queryKey: ['accounts', `${id}`],
  })

  const { mutate, isPending } = useMutation<
    Account,
    AxiosError | Error,
    { id: string }
  >({
    mutationFn: ({ id }) => deleteAccount(id as string),
    onSuccess: () => {
      toast({
        title: 'Account deleted!',
        description: 'Account has been deleted successfully.',
      })
      queryClient.refetchQueries({
        queryKey: ['accounts'],
        type: 'active',
      })
      router.push('/accounts')
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
          <ViewAccountCard account={data as Account} />
          <EditAccountCard account={data as Account} />
        </div>
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Transfers</CardTitle>
              <CardDescription>Transfer funds between accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <TransferFundsForm fromAccount={data?.id} />
            </CardContent>
          </Card>
          <CurrencyExchangeRateCard currency={data?.currency} />
        </div>
      </div>
      <div className="w-full border-t pt-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Need to delete this user?
          </p>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete Account</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This account and all associated
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
                  {isPending ? 'Delete account ...' : 'Confirm'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </>
  )
}

AccountCards.displayName = 'AccountCards'

export { AccountCards }
