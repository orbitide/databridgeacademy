import Link from "next/link"
import { UserRound } from "lucide-react"

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
  dark = false,
  children,
}: {
  title: string
  href: string
  className?: string
  /** Dark navy surface instead of the translucent light one. */
  dark?: boolean
  children: React.ReactNode
}) {
  return (
    <li className={className}>
      <Link
        href={href}
        className={cn(
          "group block rounded-xl p-4 backdrop-blur-md transition-colors duration-200 outline-none focus-visible:ring-3 focus-visible:ring-ring/60",
          dark
            ? "bg-[oklch(0.2_0.05_262)]/90 text-white hover:bg-[oklch(0.2_0.05_262)]"
            : "bg-background/60 ring-1 ring-foreground/10 hover:bg-[oklch(0.2_0.05_262)] hover:text-white hover:ring-white/10 focus-visible:bg-[oklch(0.2_0.05_262)] focus-visible:text-white"
        )}
      >
        <p className="font-heading text-xl leading-snug font-semibold sm:text-2xl">
          {title}
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
              "flex size-9 items-center justify-center rounded-full ring-2 ring-background transition-colors duration-200 group-hover:ring-[oklch(0.2_0.05_262)]",
              i % 2 === 0 ? "bg-brand text-brand-foreground" : "bg-secondary text-foreground/70"
            )}
          >
            <UserRound className="size-4" />
          </span>
        ))}
      </div>
      <p className="mt-2.5 text-[0.8125rem] leading-snug text-muted-foreground transition-colors duration-200 group-hover:text-white/75">
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
          className="fill-brand/15 group-hover:fill-[oklch(0.82_0.11_192)]/20"
        />
        <path
          d="M4 46 C 28 44, 40 38, 62 34 S 100 26, 118 16 S 144 8, 156 6"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          className="stroke-brand group-hover:stroke-[oklch(0.82_0.11_192)]"
        />
        <circle cx="156" cy="6" r="3.5" className="fill-brand group-hover:fill-[oklch(0.82_0.11_192)]" />
        <path d="M4 52 H156" strokeWidth="1" className="stroke-foreground/20 group-hover:stroke-white/25" />
      </svg>
      <p className="mt-1.5 flex items-baseline justify-between gap-2 text-[0.8125rem] leading-snug text-muted-foreground transition-colors duration-200 group-hover:text-white/75">
        <span>Where data and AI careers are heading.</span>
      </p>
      <p className="label-mono mt-1 text-[0.625rem] text-muted-foreground/80 group-hover:text-white/55">
        Illustrative
      </p>
    </div>
  )
}

/** Binary digits that flip between 1 and 0: the machinery behind production systems. */
const binaryRows = [
  "10110011101001",
  "01001101010110",
  "11010010111001",
  "00101101001110",
]

const ACCENT = "oklch(0.82 0.11 192)"

function ProjectsVisual() {
  return (
    <div className="mt-3">
      <div
        aria-hidden
        className="overflow-hidden rounded-md bg-black/30"
      >
        <div className="px-3 py-2.5 font-mono text-[0.8125rem] leading-5 [mask-image:linear-gradient(to_bottom,transparent,black_24%,black_76%,transparent)]">
          {binaryRows.map((row, r) => (
            <div key={r} className="flex justify-between">
              {row.split("").map((bit, i) => {
                const other = bit === "1" ? "0" : "1"
                const delay = (((r + 2) * 7 + i * 5) % 13) * -0.23
                const duration = 1.2 + ((i + r) % 4) * 0.4
                const bright = (i + r) % 3 === 0
                return (
                  <span
                    key={i}
                    className={cn(
                      "inline-grid",
                      bright ? "font-semibold" : "text-white/45"
                    )}
                    style={
                      {
                        "--bit-delay": `${delay}s`,
                        "--bit-duration": `${duration}s`,
                        ...(bright
                          ? { color: ACCENT, textShadow: `0 0 10px ${ACCENT}` }
                          : null),
                      } as React.CSSProperties
                    }
                  >
                    <span className="bit-first col-start-1 row-start-1">{bit}</span>
                    <span className="bit-second col-start-1 row-start-1">{other}</span>
                  </span>
                )
              })}
            </div>
          ))}
        </div>
      </div>
      <p className="mt-2.5 text-[0.8125rem] leading-snug text-white/75">
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
        className="xl:absolute xl:top-36 xl:-left-20 xl:w-52"
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
        dark
        title="Production-grade projects"
        href="/projects"
        className="xl:absolute xl:bottom-12 xl:-right-8 xl:w-[17rem]"
      >
        <ProjectsVisual />
      </OverlayCard>
    </ul>
  )
}
