import Link from "next/link"
import { ArrowUpRight, UserRound } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Translucent cards that overlap the hero video. Each card carries a small
 * visual that illustrates its meaning. All visuals are illustrative: no real
 * people or figures are implied.
 */

function OverlayCard({
  title,
  href,
  className,
  children,
}: {
  title: string
  href: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <li className={className}>
      <Link
        href={href}
        className="group block rounded-xl bg-background/60 p-4 ring-1 ring-foreground/10 backdrop-blur-md transition-colors outline-none hover:bg-background/75 focus-visible:ring-3 focus-visible:ring-ring/60"
      >
        <p className="flex items-center justify-between gap-2 text-sm font-medium">
          {title}
          <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </p>
        {children}
      </Link>
    </li>
  )
}

/** Overlapping avatar silhouettes: learning from people in the field. */
function InstructorsVisual() {
  return (
    <div className="mt-3">
      <div aria-hidden className="flex -space-x-2">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={cn(
              "flex size-9 items-center justify-center rounded-full ring-2 ring-background",
              i % 2 === 0 ? "bg-brand text-brand-foreground" : "bg-secondary text-foreground/70"
            )}
          >
            <UserRound className="size-4" />
          </span>
        ))}
      </div>
      <p className="mt-2.5 text-[0.8125rem] leading-snug text-muted-foreground">
        Learn from tech insiders who work in the field.
      </p>
    </div>
  )
}

/** A rising trend line with no numbers, labelled as illustrative. */
function MarketVisual() {
  return (
    <div className="mt-3">
      <svg
        viewBox="0 0 160 56"
        role="img"
        aria-label="Illustration of a rising trend line"
        className="h-[4.5rem] w-full"
      >
        <path
          d="M4 46 C 28 44, 40 38, 62 34 S 100 26, 118 16 S 144 8, 156 6 L156 52 L4 52 Z"
          className="fill-brand/15"
        />
        <path
          d="M4 46 C 28 44, 40 38, 62 34 S 100 26, 118 16 S 144 8, 156 6"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          className="stroke-brand"
        />
        <circle cx="156" cy="6" r="3.5" className="fill-brand" />
        <path d="M4 52 H156" strokeWidth="1" className="stroke-foreground/20" />
      </svg>
      <p className="mt-1.5 flex items-baseline justify-between gap-2 text-[0.8125rem] leading-snug text-muted-foreground">
        <span>Where data and AI careers are heading.</span>
      </p>
      <p className="label-mono mt-1 text-[0.625rem] text-muted-foreground/80">
        Illustrative
      </p>
    </div>
  )
}

/** Blinking binary: the low-level machinery behind production systems. */
const binaryRows = ["10110011101001", "01001101010110", "11010010111001", "00101101001110"]

function ProjectsVisual() {
  return (
    <div className="mt-3">
      <div
        aria-hidden
        className="rounded-md bg-foreground/5 px-3 py-2.5 font-mono text-[0.8125rem] leading-5 tracking-[0.3em]"
      >
        {binaryRows.map((row, r) => (
          <div key={r} className="flex justify-between">
            {row.split("").map((bit, i) => (
              <span
                key={i}
                className={cn(
                  "bit-blink",
                  (i + r) % 3 === 0 ? "font-semibold text-brand" : "text-foreground/60"
                )}
                style={{
                  animationDelay: `${(((r + 2) * 7 + i * 5) % 13) * 0.19}s`,
                  animationDuration: `${2 + ((i + r) % 4) * 0.45}s`,
                }}
              >
                {bit}
              </span>
            ))}
          </div>
        ))}
      </div>
      <p className="mt-2.5 text-[0.8125rem] leading-snug text-muted-foreground">
        Build projects as production-grade systems.
      </p>
    </div>
  )
}

export function HeroHighlights() {
  return (
    <ul className="relative -mt-14 mr-4 ml-4 flex flex-col gap-3 sm:mr-8 sm:ml-8 xl:static xl:m-0">
      <OverlayCard
        title="Meet your instructors"
        href="/about"
        className="xl:absolute xl:top-8 xl:left-1 xl:w-52"
      >
        <InstructorsVisual />
      </OverlayCard>
      <OverlayCard
        title="Market overview"
        href="/resources/guides"
        className="xl:absolute xl:top-14 xl:-right-2 xl:w-56"
      >
        <MarketVisual />
      </OverlayCard>
      <OverlayCard
        title="Production-grade projects"
        href="/projects"
        className="xl:absolute xl:bottom-12 xl:-right-5 xl:w-60"
      >
        <ProjectsVisual />
      </OverlayCard>
    </ul>
  )
}
