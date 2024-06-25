interface RawAnnotation {
  id: string
  name?: string
  value?: number
  app_id?: string
  annotationFragment?: string
  description?: string
  boundingPoly?: {
    vertices: { x: number; y: number }[]
  }
  iiifTextImageURL?: string
}

interface Selector {
  value: string
  type: string
}

export interface Annotation {
  raw: RawAnnotation
  body: string
  createdate: string
  fileid: number
  confidence: number
  type: string
  imageid: number
  id: number
  lastupdate: string
  annotationid: number
  source: string
  selectors: Selector[]
  target: string
  feature: string
  idsid: number
}
