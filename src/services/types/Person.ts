interface Role {
  role: string
  context: string
  frequency: number
}

interface Name {
  displayname: string
  type: string
}

export interface Person {
  gender: string
  displaydate: string
  objectcount: number
  roles: Role[]
  wikidata_id: string
  dateend: number
  url: string
  viaf_id: string
  names: Name[]
  birthplace: string | null
  wikipedia_id: string
  datebegin: number
  culture: string | null
  displayname: string
  alphasort: string
  ulan_id: string
  personid: number
  deathplace: string | null
  id: number
  lastupdate: string
  lcnaf_id: string
}
