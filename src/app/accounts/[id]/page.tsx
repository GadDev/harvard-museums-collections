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

import { CurrencyExchangeRateCard } from '@/components/currency-exchange-rate-card'

import { getAccounts } from '@/services/account'
import { AccountCards } from './account-cards'

export async function generateStaticParams() {
  const accounts = await getAccounts()

  return accounts.map((account) => ({
    id: account.id,
  }))
}

export default async function AccountPage({
  params,
}: {
  params: { id: string }
}) {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <AccountCards id={params.id} />
    </main>
  )
}
