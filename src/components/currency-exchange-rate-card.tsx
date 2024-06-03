'use client'
import { useState, useEffect } from 'react'
import { CURRENCIES } from '@/lib/constants/currencies'
import { Card, CardHeader, CardTitle, CardContent } from './ui/card'
import { Label } from './ui/label'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from './ui/select'

const CurrencyExchangeRateCard = ({
  currency = 'USD',
}: {
  currency?: string
}) => {
  const [baseCurrency, setBaseCurrency] = useState(currency)
  const [exchangeRates, setExchangeRates] = useState<
    Record<string, number | undefined>
  >(CURRENCIES[0].rates)
  useEffect(() => {
    const rates = CURRENCIES.find(
      (currency) => currency.code === baseCurrency,
    )?.rates

    const newRates = Object.fromEntries(
      Object.entries(rates || {}).filter(([key]) => key !== baseCurrency),
    )

    setExchangeRates(newRates)
  }, [baseCurrency])
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Currency Exchange Rate</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="base-currency">Base Currency</Label>
          <Select value={baseCurrency} onValueChange={setBaseCurrency}>
            <SelectTrigger>
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              {CURRENCIES.map((currency) => (
                <SelectItem key={currency.code} value={currency.code}>
                  {currency.code}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <div key={baseCurrency} className="flex items-center justify-between">
            <span>{baseCurrency}</span>
            <span className="font-medium">1.00</span>
          </div>
          {Object.entries(exchangeRates).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <span>{key}</span>
              <span className="font-medium">{value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

CurrencyExchangeRateCard.displayName = 'CurrencyExchangeRateCard'

export { CurrencyExchangeRateCard }
