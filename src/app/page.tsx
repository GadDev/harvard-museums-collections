import Image from 'next/image'
import Link from 'next/link'
import {
  BrushIcon,
  CameraIcon,
  UsersIcon,
  CuboidIcon,
} from 'lucide-react'

export default function Home() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-10">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <Image
                src="https://harvardartmuseums.org/assets/images/pages/getting-here-1350-880.jpg"
                width={521}
                height={340}
                alt="Featured Artwork"
                className="mx-auto overflow-hidden object-cover sm:w-full lg:order-last"
              />
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                    Harvard Art Museums
                  </div>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Explore the World-Class Collection
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Discover the rich history and diverse artworks of the
                    Harvard Art Museums through our comprehensive API.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Explore Collection
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full bg-muted py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Explore by Category
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Browse the Harvard Art Museums&apos;s collection by category
                  to discover new and fascinating artworks.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-6">
                <Link
                  href="/objects"
                  className="group flex flex-col items-center justify-center space-y-2 rounded-lg bg-background p-4 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  <CuboidIcon className="h-8 w-8 text-muted-foreground group-hover:text-accent-foreground" />
                  <span className="text-sm font-medium">Artifacts</span>
                </Link>
                <Link
                  href="/persons"
                  className="group flex flex-col items-center justify-center space-y-2 rounded-lg bg-background p-4 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  <UsersIcon className="h-8 w-8 text-muted-foreground group-hover:text-accent-foreground" />
                  <span className="text-sm font-medium">People</span>
                </Link>
                <Link
                  href="#"
                  className="group flex flex-col items-center justify-center space-y-2 rounded-lg bg-background p-4 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  <CameraIcon className="h-8 w-8 text-muted-foreground group-hover:text-accent-foreground" />
                  <span className="text-sm font-medium">Photography</span>
                </Link>
                <Link
                  href="#"
                  className="group flex flex-col items-center justify-center space-y-2 rounded-lg bg-background p-4 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  <BrushIcon className="h-8 w-8 text-muted-foreground group-hover:text-accent-foreground" />
                  <span className="text-sm font-medium">Drawing</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full border-t py-12 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Unlock the Power of the Harvard Art Museums API
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Sign up today to access our comprehensive collection of
                world-class artworks and start building your next innovative
                application.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm">
              <Link
                href="https://docs.google.com/forms/d/1Fe1H4nOhFkrLpaeBpLAnSrIMYvcAxnYWm0IU9a6IkFA/viewform"
                className="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                prefetch={false}
              >
                Sign Up for API Access
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
