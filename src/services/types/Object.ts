export interface Image {
  date: string
  copyright: string
  imageid: number
  idsid: number
  format: string
  description: string | null
  technique: string | null
  renditionnumber: string
  displayorder: number
  baseimageurl: string
  alttext: string | null
  width: number
  publiccaption: string | null
  iiifbaseuri: string
  height: number
}

interface WorkType {
  worktypeid: string
  worktype: string
}

interface Color {
  color: string
  spectrum: string
  hue: string
  percent: number
  css3: string
}

interface Person {
  role: string
  birthplace: string | null
  gender: string
  displaydate: string
  prefix: string | null
  culture: string
  displayname: string
  alphasort: string
  name: string
  personid: number
  deathplace: string | null
  displayorder: number
}

interface SeeAlso {
  id: string
  type: string
  format: string
  profile: string
}

export interface ArtObject {
  copyright: string | null
  contextualtextcount: number
  creditline: string
  accesslevel: number
  dateoflastpageview: string
  classificationid: number
  division: string
  markscount: number
  publicationcount: number
  totaluniquepageviews: number
  contact: string
  colorcount: number
  rank: number
  id: number
  state: string
  verificationleveldescription: string
  period: string | null
  images: Image[]
  worktypes: WorkType[]
  imagecount: number
  totalpageviews: number
  accessionyear: number
  standardreferencenumber: string
  signed: string
  classification: string
  relatedcount: number
  verificationlevel: number
  primaryimageurl: string
  titlescount: number
  peoplecount: number
  style: string | null
  lastupdate: string
  commentary: string | null
  periodid: string | null
  technique: string
  edition: string | null
  description: string | null
  medium: string | null
  lendingpermissionlevel: number
  title: string
  accessionmethod: string
  colors: Color[]
  provenance: string | null
  groupcount: number
  dated: string
  department: string
  dateend: number
  people: Person[]
  url: string
  dateoffirstpageview: string
  century: string
  objectnumber: string
  labeltext: string | null
  datebegin: number
  culture: string
  exhibitioncount: number
  imagepermissionlevel: number
  mediacount: number
  objectid: number
  techniqueid: number
  dimensions: string
  seeAlso: SeeAlso[]
}
