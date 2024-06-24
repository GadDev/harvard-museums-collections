interface Color {
  percent: number
  spectrum: string
  color: string
  css3: string
  hue: string
}

interface ContextualText {
  text: string
  textiletext: string | null
  context: string
  date: string | null
  type: string
}

interface Exhibition {
  citation: string
  title: string
  exhibitionid: number
  enddate: string | null
  begindate: string | null
}

interface Gallery {
  gallerynumber: string
  floor: number
  theme: string
  name: string
  galleryid: number
  begindate: string
}

interface Grouping {
  name: string
  groupid: number
}

interface Image {
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

interface Place {
  placeid: number
  type: string
  displayname: string
}

interface Publication {
  citation: string
  title: string
  citationremarks: string | null
  publicationplace: string
  publicationyear: number
  volumenumber: string | null
  format: string
  publicationid: number
  publicationdate: string
  volumetitle: string | null
  pagenumbers: string
}

interface TechnicalDetail {
  text: string
  type: string
  formattedtext: string
}

interface Term {
  id: number
  name: string
}

interface Title {
  title: string
  titletype: string
  displayorder: number
  titleid: number
}

interface WorkType {
  worktypeid: string
  worktype: string
}

interface SeeAlso {
  id: string
  type: string
  format: string
  profile: string
}

export interface ArtObjectItem {
  objectid: number
  objectnumber: string
  accessionyear: number
  dated: string
  datebegin: number
  dateend: number
  classification: string
  classificationid: number
  medium: string
  technique: string
  techniqueid: number
  period: string
  periodid: number
  century: string
  culture: string
  style: string | null
  signed: string | null
  state: string | null
  edition: string | null
  standardreferencenumber: string | null
  dimensions: string
  copyright: string | null
  creditline: string
  department: string
  division: string
  contact: string
  description: string
  provenance: string
  commentary: string
  labeltext: string | null
  imagecount: number
  mediacount: number
  colorcount: number
  markscount: number
  peoplecount: number
  titlescount: number
  publicationcount: number
  exhibitioncount: number
  contextualtextcount: number
  groupcount: number
  relatedcount: number
  totalpageviews: number
  totaluniquepageviews: number
  dateoffirstpageview: string
  dateoflastpageview: string
  verificationlevel: number
  verificationleveldescription: string
  imagepermissionlevel: number
  accesslevel: number
  accessionmethod: string
  rank: number
  url: string
  id: number
  lastupdate: string
  colors: Color[]
  contextualtext: ContextualText[]
  exhibitions: Exhibition[]
  gallery: Gallery
  groupings: Grouping[]
  primaryimageurl: string
  images: Image[]
  places: Place[]
  publications: Publication[]
  details: {
    technical: TechnicalDetail[]
  }
  terms: {
    medium: Term[]
    place: Term[]
    century: Term[]
    culture: Term[]
    topic: Term[]
  }
  title: string
  titles: Title[]
  worktypes: WorkType[]
  seeAlso: SeeAlso[]
}
