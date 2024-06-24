import axios from 'axios'
import type { Info } from './types/Info'
import type { Annotation } from './types/Annotation'
import { BASE_HARVARD_API_URL } from '@/lib/constants/api'

const BASE_URL = `${BASE_HARVARD_API_URL}`

export type ResourceType =
  | 'object'
  | 'person'
  | 'color'
  | 'exhibition'
  | 'annotation'
  | 'publication'
  | 'place'
  | 'worktype'
  | 'technique'
  | 'century'
  | 'classification'
  | 'image'
  | 'video'
  | 'audio'
  | 'gallery'
  | 'culture'

export interface AnnotationResponse {
  info: Info
  records: Annotation[]
}

export const getItems =
  <TData>(type: ResourceType) =>
  async ({
    page = 1,
    size = 15,
    query = '',
  }: {
    page?: number
    size?: number
    query?: string
  }): Promise<TData> => {
    const response = await axios.get(
      `${BASE_URL}/${type}?apikey=${process.env.NEXT_PUBLIC_API_KEY}&size=${size}&page=${page}${query ? `&q=${query}` : ''}`,
    )

    return response.data
  }

export const getAnnotationById = async (id: string): Promise<Annotation> => {
  const response = await axios.get(
    `${BASE_URL}/annotation/${id}?apikey=${process.env.NEXT_PUBLIC_API_KEY}`,
  )
  return response.data
}
