'use client'
import { useQuery } from '@tanstack/react-query'
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
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { TransferFundsForm } from '@/components/forms/transfer'
import { CurrencyExchangeRateCard } from '@/components/currency-exchange-rate-card'

import { ViewAccountCard } from './view-account-card'
import { EditAccountCard } from './edit-account-card'

const AccountCards = ({ id }: { id: string }) => {
  const { data, isLoading, isError } = useQuery({
    queryFn: async () => await getAccountById(id as string),
    queryKey: ['accounts', `${id}`],
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
  )
}

AccountCards.displayName = 'AccountCards'

export { AccountCards }
