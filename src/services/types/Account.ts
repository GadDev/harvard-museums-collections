import { Currency } from './Currency'

enum AccountType {
  Checking = 'Checking',
  Savings = 'Savings',
  Credit = 'Credit',
  Investment = 'Investment',
}

export interface Account {
  id: string
  ownerId: string
  currency: Currency | string
  balance: number
  name: string
  accountNumber: string
  accountType: AccountType | string
  createdAt?: string
  updatedAt?: string
}
