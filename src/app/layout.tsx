import type { Metadata } from 'next'
import Link from 'next/link'
import { LandmarkIcon, MoveIcon } from 'lucide-react'

import { Logo, UsersIcon } from '@/components/icons'
import { ModeToggle } from '@/components/mode-toggle'
import { NavButton } from '@/components/nav-button'
import { NavItem } from '@/components/nav-item'
import ReactQueryProvider from '@/components/react-query-provider'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'

import './globals.css'

export const metadata: Metadata = {
  title: 'GOM Bank',
  description:
    'A simple banking application built with Next.js, TypeScript, and Tailwind CSS.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="grid min-h-screen w-full dark:bg-black lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r bg-gray-100/40 dark:bg-gray-800/40 lg:block">
              <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-[60px] items-center border-b px-5">
                  <Link
                    className="flex items-center gap-2 font-semibold"
                    href="/"
                  >
                    <Logo />
                    <span className="">GOM Bank</span>
                  </Link>
                </div>
                <div className="flex-1 overflow-auto py-2">
                  <nav className="grid items-start px-4 text-sm font-medium">
                    <NavItem href="/accounts">
                      <LandmarkIcon className="h-4 w-4" />
                      Accounts
                    </NavItem>
                    <NavItem href="/users">
                      <UsersIcon className="h-4 w-4" />
                      Users
                    </NavItem>
                    <NavItem href="/transfers">
                      <MoveIcon className="h-4 w-4" />
                      Transfers
                    </NavItem>
                  </nav>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <header className="flex h-14 items-center justify-between gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40 lg:h-[60px] lg:justify-end">
                <Link
                  className="flex items-center gap-2 font-semibold lg:hidden"
                  href="/"
                >
                  <Logo />
                  <span className="">GOM Bank</span>
                </Link>
                <ModeToggle />
              </header>
              <ReactQueryProvider>
                <div className="flex-1 overflow-y-auto">{children}</div>
              </ReactQueryProvider>
            </div>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
