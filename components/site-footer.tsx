import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { BrandLogo } from "@/components/brand-logo"
import { Button } from "@/components/ui/button"
import {
  authLinks,
  programLinks,
  resourceLinks,
  whyUsGroups,
  type NavLink,
} from "@/lib/navigation"

const columns: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Programs",
    links: [
      ...programLinks,
      { title: "Program quiz", href: "/programs/quiz" },
    ],
  },
  {
    heading: "Why us",
    links: whyUsGroups.flatMap((group) => group.links),
  },
  {
    heading: "Resources",
    links: [
      ...resourceLinks,
      { title: "Apply Now", href: authLinks.apply.href },
      { title: "Login", href: authLinks.login.href },
    ],
  },
]

const linkClass =
  "rounded-sm text-sm text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"

// `new Date()` must not run at prerender time under cacheComponents, so the
// year lives in its own cached component.
async function CurrentYear() {
  "use cache"
  return new Date().getFullYear()
}

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="mx-auto max-w-6xl px-4 pt-14 pb-8 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_2fr] lg:gap-16">
          <div className="max-w-sm">
            <BrandLogo />
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Rigorous, mentor-led programs in data science, analytics, and AI.
              Learn by building real projects, with people who have done the
              work.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Button asChild className="h-10 px-4">
                <Link href={authLinks.apply.href}>
                  {authLinks.apply.title}
                  <ArrowRight data-icon="inline-end" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-10 px-4">
                <Link href="/programs/quiz">Find your program</Link>
              </Button>
            </div>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3"
          >
            {columns.map((column) => (
              <section
                key={column.heading}
                aria-label={column.heading}
                className={column.heading === "Programs" ? "col-span-2 sm:col-span-1" : undefined}
              >
                <h2 className="text-xs font-semibold tracking-wide text-brand uppercase">
                  {column.heading}
                </h2>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className={linkClass}>
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; <CurrentYear /> Data Bridge Academy. All rights reserved.
          </p>
          <p>Built to bridge the gap between learning and a data career.</p>
        </div>
      </div>
    </footer>
  )
}
