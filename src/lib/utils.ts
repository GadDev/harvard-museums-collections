import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { CURRENCIES } from './constants/currencies'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCurrencyLocales(currencyCode: string): string | undefined {
  const currency = CURRENCIES.find((c) => c.code === currencyCode)
  return currency ? currency.locales : undefined
}

export function formattedCurrency(value: number, currencyCode: string): string {
  const locales = getCurrencyLocales(currencyCode)
  return new Intl.NumberFormat(locales, {
    style: 'currency',
    currency: currencyCode,
  }).format(value)
}

export function getCurrencyName(currencyCode: string): string | undefined {
  const currency = CURRENCIES.find((c) => c.code === currencyCode)
  return currency ? currency.name : undefined
}

export function formatDateTime(isoString: string) {
  const date = new Date(isoString)

  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }

  return new Intl.DateTimeFormat('en-GB', options).format(date)
}

export const getExchangeRate = (
  fromCurrency: string,
  toCurrency: string,
): number => {
  const currencyData = CURRENCIES.find(
    (currency) => currency.code === fromCurrency,
  ) as any
  return currencyData?.rates[toCurrency] || 1
}
