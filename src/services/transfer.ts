import axios from 'axios' 
import { Transfer } from './types/Transfer'
import { API_URL } from '@/lib/constants/api'

export const getTransfers = async (): Promise<Transfer[]> => {
  const response = await axios.get(`${API_URL}/transfers`)
  return response.data
}
