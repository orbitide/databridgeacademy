"use client"

import * as React from "react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { aiPostingShare } from "@/lib/ai-postings"
import { demandRoles, skillTimeline } from "@/lib/job-market"

/**
 * Dark-section line chart of real data: the share of U.S. job postings that
 * mention AI, by month (Indeed Hiring Lab AI Tracker, CC BY 4.0). Dots mark
 * the month each skill in `skillTimeline` entered the toolkit.
 *
 * The headline "+35%" is a separate, real figure: the BLS projection for
 * data scientists, 2025–35.
 */

const ACCENT = "oklch(1 0 0)"
const NAVY = "oklch(0.28 0 0)"

const chartConfig = {
  share: { label: "Postings mentioning AI", color: ACCENT },
} satisfies ChartConfig

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]

/** "Apr 2023" -> "2023-04" */
const monthKey = (d: string) => {
  const [mon, year] = d.split(" ")
  return `${year}-${String(MONTHS.indexOf(mon) + 1).padStart(2, "0")}`
}
/** "2023-04" -> "Apr 2023" */
const monthLabel = (k: string) => `${MONTHS[+k.slice(5) - 1]} ${k.slice(0, 4)}`
/** "Apr 2023" -> "Apr ’23" (small-screen list) */
const shortDate = (d: string) => d.replace(/ 20(\d\d)$/, " ’$1")

const skillByMonth = new Map(
  skillTimeline.map((s) => [monthKey(s.date), s.skill])
)

const data = aiPostingShare.map((p) => ({
  ...p,
  skill: skillByMonth.get(p.month),
}))
const LAST = data.length - 1
const YEAR_TICKS = data.filter((p) => p.month.endsWith("-01")).map((p) => p.month)

/** Vertical grid lines: the first month of each quarter. */
const QUARTER_TICKS = data
  .filter((p) => ["01", "04", "07", "10"].includes(p.month.slice(5)))
  .map((p) => p.month)

const first = data[0]
const low = data.reduce((a, b) => (b.share < a.share ? b : a))
const latest = data[LAST]

const projected = demandRoles.find((r) => r.title === "Data scientists")!.growth

/** Dots only on skill milestones and the latest month. */
function Dot({ cx, cy, index }: { cx?: number; cy?: number; index?: number }) {
  if (cx == null || cy == null || index == null) return <g />
  const point = data[index]
  const end = index === LAST
  if (!point.skill && !end) return <g />
  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={end ? 6 : 5}
        strokeWidth={2.5}
        stroke={NAVY}
        fill={ACCENT}
      />
      {point.skill && (
        <text
          x={cx + 8}
          y={cy + 24}
          fontSize={13}
          fontWeight={600}
          fill="white"
          className="max-sm:hidden"
        >
          {point.skill}
        </text>
      )}
      {end && (
        <text
          x={cx}
          y={cy - 14}
          textAnchor="end"
          fontSize={13}
          fontWeight={600}
          fill={ACCENT}
        >
          {point.share.toFixed(1)}%
        </text>
      )}
    </g>
  )
}

export function GrowthChart() {
  const ref = React.useRef<HTMLDivElement>(null)
  const [visible, setVisible] = React.useState(false)
  const [animate, setAnimate] = React.useState(true)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(
            !window.matchMedia("(prefers-reduced-motion: reduce)").matches
          )
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.35 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div className="rounded-2xl bg-white/[0.04] p-4 ring-1 ring-white/10 sm:p-6">
      <p className="text-xs text-white/55">
        Share of U.S. job postings mentioning AI
      </p>
      <div
        ref={ref}
        role="img"
        aria-label={`Line chart of the share of U.S. job postings that mention AI, by month. It was ${first.share.toFixed(
          1
        )} percent in ${monthLabel(first.month)}, fell to a low of ${low.share.toFixed(
          1
        )} percent in ${monthLabel(low.month)}, then rose to ${latest.share.toFixed(
          1
        )} percent in ${monthLabel(latest.month)}. Dots mark when seven AI skills entered the toolkit. Data scientist jobs are projected to grow ${projected} percent in the U.S. from 2025 to 2035.`}
        className="relative mt-2 h-[19rem] sm:h-[22rem]"
      >
        {/* Headline sits in the empty top-left of the plot */}
        <div className="pointer-events-none absolute top-1 left-12 z-10 sm:left-16">
          <p className="text-5xl font-semibold tracking-tight text-white sm:text-6xl">
            +{projected}%
          </p>
          <p className="mt-1 max-w-[13rem] text-sm leading-snug text-white/70">
            projected U.S. job growth, 2025–35 (BLS)
          </p>
        </div>

        {visible && (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-full w-full [&_.recharts-cartesian-axis-tick_text]:fill-white/60"
          >
            <LineChart
              data={data}
              margin={{ top: 28, right: 24, bottom: 0, left: 0 }}
            >
              <CartesianGrid
                stroke="oklch(1 0 0 / 0.1)"
                horizontalValues={[0, 1, 2, 3, 4, 5, 6, 7, 8]}
                verticalValues={QUARTER_TICKS}
              />
              <XAxis
                dataKey="month"
                ticks={YEAR_TICKS}
                tickFormatter={(k: string) => k.slice(0, 4)}
                tickLine={false}
                axisLine={{ stroke: "oklch(1 0 0 / 0.2)" }}
                tickMargin={10}
                padding={{ left: 8, right: 8 }}
              />
              <YAxis
                domain={[0, 8]}
                ticks={[0, 2, 4, 6, 8]}
                tickFormatter={(v: number) => `${v}%`}
                tickLine={false}
                axisLine={false}
                width={40}
              />
              <ChartTooltip
                cursor={{ stroke: "oklch(1 0 0 / 0.3)" }}
                content={
                  <ChartTooltipContent
                    hideIndicator
                    className="min-w-40 border-white/15 bg-[oklch(0.32_0_0)] text-white [&_.text-muted-foreground]:text-white/70"
                    labelFormatter={(_, payload) => {
                      const p = payload?.[0]?.payload as
                        | (typeof data)[number]
                        | undefined
                      return p ? monthLabel(p.month) : null
                    }}
                    formatter={(value) => (
                      <>
                        <span className="flex-1 text-white/70">
                          Postings mentioning AI
                        </span>
                        <span className="font-mono font-medium tabular-nums">
                          {Number(value).toFixed(2)}%
                        </span>
                      </>
                    )}
                  />
                }
              />
              <Line
                dataKey="share"
                type="monotone"
                stroke="var(--color-share)"
                strokeWidth={3.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                dot={Dot}
                activeDot={{ r: 5, strokeWidth: 2.5, stroke: NAVY }}
                isAnimationActive={animate}
                animationDuration={2000}
              />
            </LineChart>
          </ChartContainer>
        )}
      </div>

      {/* Small screens: names don't fit on the chart, so list them here. */}
      <ol className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm sm:hidden">
        {skillTimeline.map((s) => (
          <li key={s.skill} className="text-white/85">
            <span className="text-white/50">{shortDate(s.date)}</span>{" "}
            {s.skill}
          </li>
        ))}
      </ol>

      <p className="mt-4 text-xs leading-relaxed text-white/55">
        Source: Indeed Hiring Lab AI Tracker (CC BY 4.0), monthly average to{" "}
        {monthLabel(latest.month)}. +{projected}%: U.S. BLS projection.
      </p>
    </div>
  )
}
