import Link from "next/link"
import { ArrowRight, Briefcase, Users, type LucideIcon } from "lucide-react"

import { SectionHeading } from "@/components/section-heading"

const pillars: {
  icon: LucideIcon
  title: string
  body: string
  href: string
  cta: string
}[] = [
  {
    icon: Users,
    title: "Mentors who work in the field",
    body: "Learn from instructors who use these tools every day, and get direct feedback on your own work.",
    href: "/why-us/instructors",
    cta: "Meet the instructors",
  },
  {
    icon: Users,
    title: "Learn alongside a cohort",
    body: "Study with peers on the same journey, share what you build, and keep each other moving.",
    href: "/cohorts",
    cta: "Cohorts & community",
  },
  {
    icon: Briefcase,
    title: "Support beyond graduation",
    body: "Portfolio reviews, interview practice, and guidance on positioning yourself for the roles you want.",
    href: "/career-support",
    cta: "Career support",
  },
]

export function HomeSupport() {
  return (
    <section className="border-b bg-background">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 xl:max-w-7xl">
        <SectionHeading
          eyebrow="Why Data Bridge"
          title="You are never learning alone"
          description="Strong programs are more than content. People and support are what carry you through the hard parts."
        />

        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {pillars.map(({ icon: Icon, title, body, href, cta }) => (
            <li key={title}>
              <Link
                href={href}
                className="group flex h-full flex-col rounded-2xl bg-card p-6 shadow-xs ring-1 ring-foreground/10 transition-colors outline-none hover:bg-secondary/50 focus-visible:ring-3 focus-visible:ring-ring/60"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-brand-muted text-brand">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-5 font-heading text-lg font-semibold">
                  {title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {body}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand">
                  {cta}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
