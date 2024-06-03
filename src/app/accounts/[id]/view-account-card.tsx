'use client'

import { formattedCurrency, getCurrencyName } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Account } from '@/services/types/Account'

const ViewAccountCard = ({ account }: { account: Account }) => {
  const { accountNumber, accountType, balance, currency, name, ownerId } =
    account
  const accountBalance = formattedCurrency(balance || 0, currency || 'USD')
  const currencyName = getCurrencyName(currency)

  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>
          <div className="flex items-center gap-2">
            <div className="text-lg font-medium">{accountBalance}</div>
            <Badge variant="outline" className="px-2 py-1 text-xs">
              Active
            </Badge>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Currency
            </div>
            <div className="font-medium">
              {currency} ({currencyName})
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Owner
            </div>
            <div className="font-medium">{ownerId}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Account Number
            </div>
            <div className="font-medium">{accountNumber}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Account Type
            </div>
            <div className="font-medium">{accountType}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Balance
            </div>
            <div className="font-medium">{accountBalance}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Available Balance
            </div>
            <div className="font-medium">{accountBalance}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

ViewAccountCard.displayName = 'ViewAccountCard'

export { ViewAccountCard }
