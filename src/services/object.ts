import axios from 'axios'
import type { Info } from './types/Info'
import type { ArtObject } from './types/Object'
import type { ArtObjectItem } from './types/Item'
import { BASE_HARVARD_API_URL } from '@/lib/constants/api'

export interface ArtObjectResponse {
  info: Info
  records: ArtObject[]
}

const BASE_URL = `${BASE_HARVARD_API_URL}/object`

export const getArtObjects = async ({
  page = 1,
  size = 15,
  query = '',
}: {
  page?: number
  size?: number
  query?: string
}): Promise<ArtObjectResponse> => {
  const response = await axios.get(
    `${BASE_URL}?apikey=${process.env.NEXT_PUBLIC_API_KEY}&size=${size}&page=${page}${query ? `&${query}` : ''}`,
  )
  return response.data
}

export const getArtObjectById = async (id: string): Promise<ArtObjectItem> => {
  const response = await axios.get(
    `${BASE_URL}/${id}?apikey=${process.env.NEXT_PUBLIC_API_KEY}`,
  )
  return response.data
}
