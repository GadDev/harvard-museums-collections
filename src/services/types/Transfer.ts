import { Currency } from './Currency'

export interface Transfer {
  fromAccountId: string
  toAccountId: string
  amount: number
  currency?: Currency
  description?: string
  executedAt?: string
}
