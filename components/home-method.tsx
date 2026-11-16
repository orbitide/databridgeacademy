import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { SectionHeading } from "@/components/section-heading"

const steps = [
  {
    title: "Learn the foundations",
    body: "A structured curriculum takes you from core concepts to applied techniques, in a deliberate order.",
    href: "/why-us/curriculum",
    cta: "See the curriculum",
  },
  {
    title: "Build real projects",
    body: "Apply every idea to projects that look like the work data and AI teams actually do.",
    href: "/projects",
    cta: "Explore projects",
  },
  {
    title: "Get mentor feedback",
    body: "Review your work with practitioners who point out what to fix and why it matters.",
    href: "/why-us/mentorship",
    cta: "How mentorship works",
  },
  {
    title: "Step into the field",
    body: "Turn your portfolio into a story employers can follow, with support for the job search.",
    href: "/career-support",
    cta: "Career support",
  },
]

export function HomeMethod() {
  return (
    <section className="border-b bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <SectionHeading
          eyebrow="How it works"
          title="From first lesson to first role, one clear path"
          description="Every program follows the same four-part method, so you always know what comes next."
        />

        <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-border ring-1 ring-border sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.title} className="flex bg-card">
              <Link
                href={step.href}
                className="group flex flex-1 flex-col p-6 outline-none transition-colors hover:bg-background focus-visible:ring-3 focus-visible:ring-ring/60 focus-visible:ring-inset"
              >
                <span className="font-mono text-sm text-brand">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 font-heading text-lg font-semibold">
                  {step.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand">
                  {step.cta}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
