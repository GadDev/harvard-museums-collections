import type { Metadata } from 'next'
import Link from 'next/link'
import {
  LibraryIcon,
  CuboidIcon,
  UsersIcon,
  BookDashedIcon,
  NotebookPenIcon,
} from 'lucide-react'

import { ModeToggle } from '@/components/mode-toggle'
import { NavItem } from '@/components/nav-item'
import ReactQueryProvider from '@/components/react-query-provider'
import { ThemeProvider } from '@/components/theme-provider'
import { SpeedInsights } from '@vercel/speed-insights/next'

import './globals.css'

export const metadata: Metadata = {
  title: 'Harvard Art Museums',
  description:
    'A simple web app to explore the Harvard Art Museums collection.',
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
                    <LibraryIcon className="h-4 w-4" />
                    <span className="">Harvard Art Museums</span>
                  </Link>
                </div>
                <div className="flex-1 overflow-auto py-2">
                  <nav className="grid items-start px-4 text-sm font-medium">
                    <NavItem href="/dashboard">
                      <BookDashedIcon className="h-4 w-4" />
                      Dashboard
                    </NavItem>
                    <NavItem href="/persons">
                      <UsersIcon className="h-4 w-4" />
                      Persons
                    </NavItem>
                    <NavItem href="/objects">
                      <CuboidIcon className="h-4 w-4" />
                      Artifacts
                    </NavItem>
                    <NavItem href="/annotations">
                      <NotebookPenIcon className="h-4 w-4" />
                      Annotations
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
                  <LibraryIcon className="h-4 w-4" />
                  <span className="">Harvard Art Museums</span>
                </Link>
                <ModeToggle />
              </header>
              <ReactQueryProvider>
                <div className="flex-1 overflow-y-auto">{children}</div>
              </ReactQueryProvider>
            </div>
          </div>
          <footer className="border-t bg-gray-100/40 p-4 text-xs text-muted-foreground dark:bg-black md:p-6">
            <div className="mx-auto flex justify-start">
              <p>&copy; 2024 Harvard Art Museums</p>
            </div>
          </footer>
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  )
}
