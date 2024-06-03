import Image from 'next/image'
import Link from 'next/link'
import { LogInIcon, MoveIcon, UsersIcon } from 'lucide-react'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-12">
      <section className="w-full pb-12">
        <div className="space-y-10 px-4 md:px-6 xl:space-y-16">
          <div className="mx-auto grid max-w-[1300px] gap-4 px-4 sm:px-6 md:grid-cols-2 md:gap-16 md:px-10">
            <div>
              <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                GOM Bank Manage Your Finances with Ease
              </h1>
              <p className="mx-auto mt-10 max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
                Our bank accounts management app provides a seamless experience
                for creating, editing, searching, and deleting your accounts, as
                well as transferring funds between them with ease.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full border-t pb-10 pt-10 dark:border-gray-600">
        <div className="container space-y-12 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Key Features
              </h2>
              <p className="max-w-[680px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our bank accounts management app offers a comprehensive set of
                features to help you stay on top of your finances.
              </p>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-10 grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
          <div className="grid gap-1">
            <Link href="/accounts">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-gray-100 p-2 dark:bg-gray-800">
                  <LogInIcon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold">Account Management</h3>
              </div>
              <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                Create, edit, search, and delete your bank accounts with ease.
              </p>
            </Link>
          </div>
          <div className="grid gap-1">
            <Link href="/transfers">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-gray-100 p-2 dark:bg-gray-800">
                  <MoveIcon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold">Fund Transfers</h3>
              </div>
              <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                Transfer funds between your accounts, even with different
                currencies.
              </p>
            </Link>
          </div>
          <div className="grid gap-1">
            <Link href="/users">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-gray-100 p-2 dark:bg-gray-800">
                  <UsersIcon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold">User Management</h3>
              </div>
              <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                Create, edit, search, and delete new users with ease.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
