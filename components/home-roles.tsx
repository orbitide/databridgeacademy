"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { sampleRoles } from "@/lib/job-market"

const VISIBLE = 4
const INTERVAL_MS = 3200

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
  mq.addEventListener("change", onChange)
  return () => mq.removeEventListener("change", onChange)
}

function usePrefersReducedMotion() {
  return React.useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  )
}

/**
 * Left: a short pitch. Right: one list of sample roles that scrolls through the
 * full set, a few at a time. Pauses on hover or focus; with reduced motion it
 * shows every role and does not rotate. Roles are illustrative, not postings.
 */
export function HomeRoles() {
  const reduced = usePrefersReducedMotion()
  const [start, setStart] = React.useState(0)
  const [ticks, setTicks] = React.useState(0)
  const [paused, setPaused] = React.useState(false)

  React.useEffect(() => {
    if (reduced || paused) return
    const id = window.setInterval(() => {
      setStart((s) => (s + 1) % sampleRoles.length)
      setTicks((t) => t + 1)
    }, INTERVAL_MS)
    return () => window.clearInterval(id)
  }, [reduced, paused])

  const count = reduced ? sampleRoles.length : VISIBLE
  const shown = Array.from(
    { length: count },
    (_, i) => sampleRoles[(start + i) % sampleRoles.length]
  )

  return (
    <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-5">
        <h3 className="flex items-center gap-3 font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
          <span aria-hidden className="relative flex size-3">
            <span className="absolute inline-flex size-full rounded-full bg-white/60 motion-safe:animate-ping" />
            <span className="relative inline-flex size-3 rounded-full bg-white" />
          </span>
          Active right now
        </h3>
        <p className="mt-3 text-sm text-white/50">
          Illustrative examples, not live job postings.
        </p>
      </div>

      <ul
        className="lg:col-span-7"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {shown.map((role, i) => {
          const entering = ticks > 0 && i === shown.length - 1
          return (
            <li
              key={role.title + role.location}
              className={cn(
                "border-t border-white/10 py-5 last:border-b",
                entering && "animate-in fade-in slide-in-from-bottom-2 duration-500"
              )}
            >
              <span className="block text-lg font-medium">{role.title}</span>
              <span className="mt-0.5 block text-sm text-white/55">
                {role.location} · {role.mode}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
