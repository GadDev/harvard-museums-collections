import { getPersons } from '@/services/person'
import { Content } from './components/content'

export async function generateStaticParams() {
  const persons = await getPersons({ page: 1, size: 5000 })

  return persons.records.map((person) => ({ id: String(person.id) }))
}

export default function PersonPage({ params }: { params: { id: string } }) {
  const { id } = params

  return <Content id={id} />
}
