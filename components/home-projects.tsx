import Link from "next/link"
import { ArrowRight, Check } from "lucide-react"

import { SectionHeading } from "@/components/section-heading"
import { Button } from "@/components/ui/button"

const points = [
  "Start from a real problem, not a toy dataset.",
  "Version, test, and document your work like a team would.",
  "Ship something you can show, run, and explain in an interview.",
]

/** Illustrative pipeline: no real systems or figures are implied. */
const stages = [
  { label: "Ingest", detail: "Collect and validate data" },
  { label: "Model", detail: "Train and evaluate" },
  { label: "Serve", detail: "Deploy behind an API" },
  { label: "Monitor", detail: "Watch quality over time" },
]

export function HomeProjects() {
  return (
    <section className="border-b bg-[oklch(0.2_0.05_262)] text-white">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <SectionHeading
            dark
            eyebrow="Projects"
            title="Build the way production teams build"
            description="Projects are the core of every program. Each one is scoped like real work, from the first dataset to a running system."
          />

          <ul className="mt-8 flex flex-col gap-3">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-white/85">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-[oklch(0.82_0.11_192)]/20 text-[oklch(0.82_0.11_192)]">
                  <Check className="size-3.5" />
                </span>
                {point}
              </li>
            ))}
          </ul>

          <Button
            asChild
            size="lg"
            className="mt-9 h-11 bg-white px-6 text-base text-[oklch(0.2_0.05_262)] hover:bg-white/90"
          >
            <Link href="/projects">
              Explore projects
              <ArrowRight data-icon="inline-end" />
            </Link>
          </Button>
        </div>

        <div
          role="img"
          aria-label="Illustration of a project pipeline: ingest, model, serve, monitor"
          className="rounded-2xl bg-black/25 p-5 ring-1 ring-white/10 sm:p-6"
        >
          <p className="font-mono text-xs tracking-wide text-white/50 uppercase">
            Project pipeline · illustrative
          </p>
          <ol aria-hidden className="mt-5 flex flex-col">
            {stages.map((stage, i) => (
              <li key={stage.label} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[oklch(0.82_0.11_192)]/15 font-mono text-sm text-[oklch(0.82_0.11_192)] ring-1 ring-[oklch(0.82_0.11_192)]/40">
                    {i + 1}
                  </span>
                  {i < stages.length - 1 && (
                    <span className="my-1 w-px flex-1 bg-white/15" />
                  )}
                </div>
                <div className="pb-6">
                  <p className="font-medium">{stage.label}</p>
                  <p className="text-sm text-white/60">{stage.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
