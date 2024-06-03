import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { Account } from './types/Account'
import { Transfer } from './types/Transfer'
import { getExchangeRate } from '@/lib/utils'

export const API_URL = 'http://localhost:5000'

export const getAccounts = async (): Promise<Account[]> => {
  const response = await axios.get(`${API_URL}/accounts`)
  return response.data
}

export const getAccountById = async (id: string): Promise<Account> => {
  const response = await axios.get(`${API_URL}/accounts/${id}`)
  return response.data
}

export const getAccountsByOwnerId = async (
  ownerId: string,
): Promise<Account[]> => {
  const response = await axios.get(`${API_URL}/accounts?ownerId=${ownerId}`)
  return response.data
}

export const addAccount = async (
  account: Omit<Account, 'id'>,
): Promise<Account> => {
  const newAccount: Account = {
    ...account,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
  }
  const response = await axios.post(`${API_URL}/accounts`, newAccount)
  return response.data
}

export const updateAccount = async (
  id: string,
  account: Omit<Account, 'id' | 'createdAt' | 'updatedAt'>,
): Promise<Account> => {
  const { createdAt } = await getAccountById(id)

  const updatedAccount: Account = {
    id: id,
    ...account,
    createdAt,
    updatedAt: new Date().toISOString(),
  }
  const response = await axios.put(`${API_URL}/accounts/${id}`, updatedAccount)
  return response.data
}

export const deleteAccount = async (id: number) => {
  const response = await axios.delete(`${API_URL}/accounts/${id}`)
  return response.data
}

export const transferFunds = async (transfer: Transfer): Promise<any> => {
  const { fromAccountId, toAccountId, amount, currency, description } = transfer

  const [fromAccountResponse, toAccountResponse] = await Promise.all([
    axios.get(`${API_URL}/accounts/${fromAccountId}`),
    axios.get(`${API_URL}/accounts/${toAccountId}`),
  ])

  const fromAccount = fromAccountResponse.data
  const toAccount = toAccountResponse.data

  if (fromAccount.balance < amount) {
    throw new Error(
      `Insufficient balance in your ${fromAccount.accountType} account`,
    )
  }

  let newBalanceFromAccount = fromAccount.balance - amount
  let newBalanceToAccount = toAccount.balance + amount

  if (fromAccount.currency !== toAccount.currency) {
    const rate = getExchangeRate(
      fromAccount.currency,
      currency || toAccount.currency,
    )
    newBalanceToAccount = toAccount.balance + amount * rate
  }

  const updatedFromAccount = {
    ...fromAccount,
    balance: newBalanceFromAccount,
  }

  const updatedToAccount = {
    ...toAccount,
    balance: newBalanceToAccount,
  }

  await Promise.all([
    axios.put(`${API_URL}/accounts/${fromAccountId}`, updatedFromAccount),
    axios.put(`${API_URL}/accounts/${toAccountId}`, updatedToAccount),
    axios.post(`${API_URL}/transfers`, {
      fromAccount: fromAccount.accountNumber,
      toAccount: toAccount.accountNumber,
      amount,
      description,
      currency: fromAccount.currency,
      executedAt: new Date().toISOString(),
    }),
  ])

  return {
    fromAccount: fromAccount.accountNumber,
    toAccount: toAccount.accountNumber,
    amount,
    description,
    currency: fromAccount.currency,
    executedAt: new Date().toISOString(),
  }
}
