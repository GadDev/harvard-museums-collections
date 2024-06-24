import { getArtObjects } from '@/services/object'
import { Content } from './components/content'

export async function generateStaticParams() {
  const objects = await getArtObjects({ page: 1, size: 24464 })

  return objects.records.map((object) => ({ id: String(object.id) }))
}

export default async function ArtObjectItemPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params

  return <Content id={id} />
}
