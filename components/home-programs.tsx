import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { SectionHeading } from "@/components/section-heading"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { programGroups } from "@/lib/navigation"

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
              <ul className="flex flex-col gap-3">
                {group.links.map((program) => (
                  <li key={program.href}>
                    <Link
                      href={program.href}
                      className="group grid grid-cols-[1fr_auto_auto] items-center gap-x-4 rounded-2xl bg-card p-4 shadow-xs ring-1 ring-foreground/10 transition-colors duration-200 outline-none hover:bg-foreground hover:text-background hover:ring-transparent focus-visible:bg-foreground focus-visible:text-background focus-visible:ring-3 focus-visible:ring-ring/60 sm:gap-x-8 sm:p-5"
                    >
                      <span className="min-w-0">
                        <span className="flex flex-wrap items-center gap-2">
                          <h3 className="font-heading text-xl leading-snug font-semibold sm:text-2xl">
                            {program.title}
                          </h3>
                          {program.badge && (
                            <Badge
                              variant="secondary"
                              className="group-hover:bg-background/20 group-hover:text-background"
                            >
                              {program.badge}
                            </Badge>
                          )}
                        </span>
                        <span className="mt-1 block text-sm text-muted-foreground transition-colors duration-200 group-hover:text-background/70">
                          {program.duration}
                        </span>
                      </span>
                      <span className="font-heading text-xl font-semibold transition-colors sm:text-3xl duration-200">
                        {program.price}
                      </span>
                      <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-background" />
                    </Link>
                  </li>
                ))}
              </ul>
            </TabsContent>
          ))}
        </Tabs>

        <Link
          href="/programs/quiz"
          className="group relative mx-auto mt-10 flex max-w-2xl flex-col items-center overflow-hidden rounded-3xl bg-foreground px-6 py-10 text-center text-background transition-colors duration-200 outline-none hover:bg-foreground/90 focus-visible:ring-3 focus-visible:ring-ring/60 sm:px-12 sm:py-14"
        >
          {/* Faint dot grid, fading out toward the edges */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(var(--background) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
              maskImage:
                "radial-gradient(ellipse at center, black 20%, transparent 75%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at center, black 20%, transparent 75%)",
            }}
          />

          <div className="relative flex flex-col items-center">
            <span className="rounded-full px-3 py-1 text-xs font-medium tracking-wide text-background/80 uppercase ring-1 ring-background/25">
              Find your path
            </span>
            <h3 className="mt-5 font-heading text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl">
              Not sure where to start?
            </h3>
            <p className="mt-4 max-w-md leading-relaxed text-pretty text-background/70">
              Answer a few questions about your background and goals. We will
              show how your skills match your target roles and point you to the
              program that fits.
            </p>
            <span className="mt-8 inline-flex h-11 items-center gap-2 rounded-full bg-background px-6 text-sm font-medium text-foreground transition-colors duration-200 group-hover:bg-background/90">
              Take the quiz
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </Link>
      </div>
    </section>
  )
}
