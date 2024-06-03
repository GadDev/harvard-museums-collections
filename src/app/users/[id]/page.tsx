import { getUsers } from '@/services/user'
import { UserCards } from './user-cards'

export async function generateStaticParams() {
  const users = await getUsers()

  return users.map((user) => ({
    id: user.id,
  }))
}

export default async function UserPage({ params }: { params: { id: string } }) {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <UserCards id={params.id} />
    </main>
  )
}
