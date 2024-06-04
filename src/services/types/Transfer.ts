import { Currency } from './Currency'

export interface Transfer {
  fromAccountId: string
  toAccountId: string
  amount: number
  currency?: Currency | string
  description?: string
  executedAt?: string
}
