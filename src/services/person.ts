import axios from 'axios'
import type { Info } from './types/Info'
import type { Person } from './types/Person'
import { BASE_HARVARD_API_URL } from '@/lib/constants/api'

interface ArtObjectResponse {
  info: Info
  records: Person[]
}

const BASE_URL = `${BASE_HARVARD_API_URL}/person`

export const getPersons = async ({
  page = 1,
  size = 15,
  query = '',
}: {
  page?: number
  size?: number
  query?: string
}): Promise<ArtObjectResponse> => {
  const response = await axios.get(
    `${BASE_URL}?apikey=${process.env.NEXT_PUBLIC_API_KEY}&size=${size}&page=${page}${query ? `&q=${query}` : ''}`,
  )
  return response.data
}

export const getPersonById = async (id: string): Promise<Person> => {
  const response = await axios.get(
    `${BASE_URL}/${id}?apikey=${process.env.NEXT_PUBLIC_API_KEY}`,
  )
  return response.data
}
