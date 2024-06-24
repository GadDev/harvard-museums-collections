import { getItems } from '@/services/others'
import { Content } from './components/content'

export async function generateStaticParams() {
  const items = await getItems('annotation')({ page: 1, size: 500000 })

  return (items as any).records.map((item: any) => ({ id: String(item.id) }))
}

export default function AnnotationPage({ params }: { params: { id: string } }) {
  const { id } = params

  return <Content id={id} />
}
