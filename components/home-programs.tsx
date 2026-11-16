import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { SectionHeading } from "@/components/section-heading"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { programGroups } from "@/lib/navigation"

const groupIntro: Record<string, string> = {
  "For beginners": "Start from zero. No prior experience required.",
  "For tech professionals":
    "Already building software? Go deeper into AI and data systems.",
}

export function HomePrograms() {
  return (
    <section className="border-b bg-background">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <SectionHeading
          eyebrow="Programs"
          title="A path for where you are, and where you want to go"
          description="Whether you are starting out or already shipping code, each program is built around real projects and mentor feedback."
        />

        <Tabs defaultValue={programGroups[0].label} className="mt-12">
          <TabsList>
            {programGroups.map((group) => (
              <TabsTrigger key={group.label} value={group.label}>
                {group.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {programGroups.map((group) => (
            <TabsContent
              key={group.label}
              value={group.label}
              className="flex flex-col gap-6"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-muted-foreground">
                  {groupIntro[group.label]}
                </p>
                {group.footer && (
                  <Link
                    href={group.footer.href}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-brand underline-offset-4 hover:underline"
                  >
                    {group.footer.title}
                    <ArrowRight className="size-4" />
                  </Link>
                )}
              </div>

              <ul className="flex flex-col gap-3">
                {group.links.map((program) => (
                  <li key={program.href}>
                    <Link
                      href={program.href}
                      className="group grid grid-cols-[1fr_auto_auto] items-center gap-x-4 rounded-2xl bg-card p-4 shadow-xs ring-1 ring-foreground/10 transition-colors outline-none hover:bg-secondary/60 focus-visible:ring-3 focus-visible:ring-ring/60 sm:gap-x-8 sm:p-5"
                    >
                      <span className="min-w-0">
                        <span className="flex flex-wrap items-center gap-2">
                          <h3 className="font-heading text-lg leading-snug font-semibold">
                            {program.title}
                          </h3>
                          {program.badge && (
                            <Badge variant="secondary">{program.badge}</Badge>
                          )}
                        </span>
                        <span className="mt-1 block text-sm text-muted-foreground">
                          {program.duration}
                        </span>
                      </span>
                      <span className="font-heading text-lg font-semibold text-brand">
                        {program.price}
                      </span>
                      <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-brand" />
                    </Link>
                  </li>
                ))}
              </ul>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
