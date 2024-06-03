import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { User } from './types/User'
import { getAccountsByOwnerId } from './account'
import { API_URL } from '@/lib/constants/api'

export const getUsers = async (): Promise<User[]> => {
  const response = await axios.get(`${API_URL}/users`)
  return response.data
}

export const getUserById = async (id: string): Promise<User> => {
  const response = await axios.get(`${API_URL}/users/${id}`)
  return response.data
}

export const addUser = async (user: Omit<User, 'id'>): Promise<User> => {
  const newUser: User = {
    ...user,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
  }
  const response = await axios.post(`${API_URL}/users`, newUser)
  return response.data
}

export const updateUser = async (
  id: string,
  user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>,
): Promise<User> => {
  const { createdAt } = await getUserById(id)
  const updatedUser: User = {
    id: id,
    ...user,
    createdAt,
    updatedAt: new Date().toISOString(),
  }
  const response = await axios.put(`${API_URL}/users/${id}`, updatedUser)
  return response.data
}

export const deleteUser = async (id: string): Promise<User> => {
  const userAccounts = await getAccountsByOwnerId(id)

  if (userAccounts.length > 0) {
    throw new Error('User has accounts. Please delete them first.')
  }

  const response = await axios.delete(`${API_URL}/users/${id}`)
  return response.data
}
