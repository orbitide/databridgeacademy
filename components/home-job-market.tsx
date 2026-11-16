import Link from "next/link"
import { ArrowRight, Globe, MapPin } from "lucide-react"

import { GrowthChart } from "@/components/growth-chart"
import { SectionHeading } from "@/components/section-heading"
import { SkillsTimeline } from "@/components/skills-timeline"
import { Badge } from "@/components/ui/badge"
import { sampleRoles } from "@/lib/job-market"

/** Illustrative listings from several regions. Not live postings. */
function SampleRoles() {
  return (
    <div className="mt-16">
      <div className="flex items-center gap-2">
        <Globe className="size-4 text-brand" />
        <h3 className="font-heading text-xl font-semibold">
          Roles you can aim for, worldwide
        </h3>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        Sample roles that mirror what graduates apply for across regions.
        Illustrative examples, not live job postings.
      </p>

      <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sampleRoles.map((role) => (
          <li
            key={role.title + role.location}
            className="rounded-xl bg-secondary/60 p-5 ring-1 ring-foreground/5"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="font-medium">{role.title}</p>
              <Badge variant="outline">{role.mode}</Badge>
            </div>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="size-3.5" />
              {role.location}
            </p>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {role.skills.map((skill) => (
                <li key={skill}>
                  <Badge variant="secondary" className="bg-card">
                    {skill}
                  </Badge>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function HomeJobMarket() {
  return (
    <section className="border-b bg-background">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 xl:max-w-7xl">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Job market"
            title="Demand for data and AI skills keeps growing"
            description="Employers are hiring for the skills our programs teach. Here is where the outlook points, and the kinds of roles that open up."
          />
          <Link
            href="/resources/guides"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand underline-offset-4 hover:underline"
          >
            Read the career guides
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-12">
          <GrowthChart />
        </div>

        <SkillsTimeline />

        <SampleRoles />
      </div>
    </section>
  )
}
