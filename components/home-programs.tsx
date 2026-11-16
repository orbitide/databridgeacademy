import Link from "next/link"
import {
  ArrowRight,
  Bot,
  Brain,
  ChartColumn,
  Code,
  Database,
  Server,
  ShieldCheck,
  Workflow,
  type LucideIcon,
} from "lucide-react"

import { SectionHeading } from "@/components/section-heading"
import { Badge } from "@/components/ui/badge"
import { programGroups } from "@/lib/navigation"

/** Icon per program slug (the last segment of the program href). */
const programIcons: Record<string, LucideIcon> = {
  "data-analytics": ChartColumn,
  "data-science": Database,
  "ai-machine-learning": Brain,
  "ai-automation": Workflow,
  "software-engineering-with-ai": Code,
  "llm-agent-engineering": Bot,
  "ai-security": ShieldCheck,
  "mlops-production-ai": Server,
  "data-engineering": Database,
}

const groupIntro: Record<string, string> = {
  "For beginners": "Start from zero. No prior experience required.",
  "For tech professionals":
    "Already building software? Go deeper into AI and data systems.",
}

export function HomePrograms() {
  return (
    <section className="border-b bg-background">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 xl:max-w-7xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Programs"
            title="A path for where you are, and where you want to go"
            description="Whether you are starting out or already shipping code, each program is built around real projects and mentor feedback."
          />
          <Link
            href="/programs"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand underline-offset-4 hover:underline"
          >
            See all programs
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-8">
          {programGroups.map((group) => (
            <div
              key={group.label}
              className="flex flex-col rounded-2xl bg-secondary/60 p-5 ring-1 ring-foreground/5 sm:p-6"
            >
              <h3 className="font-heading text-xl font-semibold">
                {group.label}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {groupIntro[group.label]}
              </p>

              <ul className="mt-5 flex flex-col gap-2.5">
                {group.links.map((program) => {
                  const slug = program.href.split("/").pop() ?? ""
                  const Icon = programIcons[slug] ?? Code
                  return (
                    <li key={program.href}>
                      <Link
                        href={program.href}
                        className="group flex items-start gap-4 rounded-xl bg-card p-4 shadow-xs ring-1 ring-foreground/10 transition-colors outline-none hover:bg-background focus-visible:ring-3 focus-visible:ring-ring/60"
                      >
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-muted text-brand">
                          <Icon className="size-5" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex flex-wrap items-center gap-2">
                            <span className="font-medium">{program.title}</span>
                            {program.badge && (
                              <Badge variant="secondary">{program.badge}</Badge>
                            )}
                          </span>
                          <span className="mt-1 block text-sm leading-snug text-muted-foreground">
                            {program.description}
                          </span>
                        </span>
                        <ArrowRight className="mt-1 size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-brand" />
                      </Link>
                    </li>
                  )
                })}
              </ul>

              {group.footer && (
                <Link
                  href={group.footer.href}
                  className="mt-5 inline-flex items-center gap-1.5 self-start text-sm font-medium text-brand underline-offset-4 hover:underline"
                >
                  {group.footer.title}
                  <ArrowRight className="size-4" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
