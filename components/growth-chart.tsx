"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { demandRoles } from "@/lib/job-market"

/**
 * Large line chart of projected U.S. employment growth, indexed to 2025 = 100.
 *
 * Only two points per occupation are real BLS data: the 2025 estimate and the
 * 2035 projection. The years in between assume steady annual growth, and the
 * chart says so. One occupation is emphasised at a time (accent), the rest sit
 * in gray; the legend switches the emphasis.
 */

const START = 2025
const END = 2035
const SPAN = END - START
const YEARS = Array.from({ length: SPAN + 1 }, (_, i) => START + i)
const Y_MIN = 100
const Y_MAX = 140
const Y_TICKS = [100, 110, 120, 130, 140]

const SERIES = demandRoles.map((role) => {
  const ratio = role.jobs2035 / role.jobs2025
  return {
    ...role,
    values: YEARS.map((_, i) => 100 * Math.pow(ratio, i / SPAN)),
  }
})

const compact = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1,
})
const full = new Intl.NumberFormat("en-US")
const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
})

export function GrowthChart() {
  const wrapRef = React.useRef<HTMLDivElement>(null)
  const [width, setWidth] = React.useState(880)
  const [visible, setVisible] = React.useState(false)
  const [active, setActive] = React.useState(0)
  const [hover, setHover] = React.useState<number | null>(null)

  React.useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      const w = Math.round(entry.contentRect.width)
      if (w > 0) setWidth(w)
    })
    ro.observe(el)
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.25 }
    )
    io.observe(el)
    return () => {
      ro.disconnect()
      io.disconnect()
    }
  }, [])

  const narrow = width < 520
  const m = {
    top: 20,
    right: narrow ? 48 : 72,
    bottom: 36,
    left: narrow ? 36 : 48,
  }
  const height = narrow ? 300 : Math.round(Math.min(480, width * 0.5))
  const plotW = width - m.left - m.right
  const plotH = height - m.top - m.bottom

  const x = (i: number) => m.left + (i / SPAN) * plotW
  const y = (v: number) =>
    m.top + (1 - (v - Y_MIN) / (Y_MAX - Y_MIN)) * plotH

  const linePath = (values: number[]) =>
    values
      .map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`)
      .join(" ")

  const current = SERIES[active]
  const areaPath = `${linePath(current.values)} L${x(SPAN).toFixed(1)} ${y(
    Y_MIN
  ).toFixed(1)} L${x(0).toFixed(1)} ${y(Y_MIN).toFixed(1)} Z`

  const xTickYears = narrow ? [2025, 2030, 2035] : [2025, 2027, 2029, 2031, 2033, 2035]

  function onPointerMove(e: React.PointerEvent<SVGRectElement>) {
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    setHover(Math.min(SPAN, Math.max(0, Math.round(ratio * SPAN))))
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowRight") {
      e.preventDefault()
      setHover((h) => Math.min(SPAN, (h ?? -1) + 1))
    } else if (e.key === "ArrowLeft") {
      e.preventDefault()
      setHover((h) => Math.max(0, (h ?? 1) - 1))
    } else if (e.key === "Escape") {
      setHover(null)
    }
  }

  const tooltipRows =
    hover === null
      ? []
      : SERIES.map((s, i) => ({ s, i, v: s.values[hover] })).sort(
          (a, b) => b.v - a.v
        )

  return (
    <div className="rounded-2xl bg-card p-5 shadow-xs ring-1 ring-foreground/10 sm:p-8">
      {/* Headline figure for the emphasised occupation */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            {current.title}
          </p>
          <p className="mt-1 flex items-baseline gap-3">
            <span className="text-6xl font-semibold tracking-tight text-brand sm:text-7xl">
              +{current.growth}%
            </span>
            <span className="max-w-[14rem] text-sm leading-snug text-muted-foreground">
              projected growth in U.S. employment, 2025–35
            </span>
          </p>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground tabular-nums sm:text-right">
          {compact.format(current.jobs2025)} jobs in 2025
          <br />
          {compact.format(current.jobs2035)} projected in 2035
          <br />
          Median pay {usd.format(current.medianPay)}
        </p>
      </div>

      {/* Legend: also the control that moves the emphasis */}
      <ul className="mt-6 flex flex-wrap gap-2" aria-label="Occupations">
        {SERIES.map((s, i) => (
          <li key={s.title}>
            <button
              type="button"
              aria-pressed={i === active}
              onClick={() => setActive(i)}
              className={cn(
                "flex items-center gap-2 rounded-full px-3 py-1.5 text-sm outline-none ring-1 transition-colors focus-visible:ring-3 focus-visible:ring-ring/60",
                i === active
                  ? "bg-brand-muted font-medium ring-brand/40"
                  : "bg-background ring-foreground/10 hover:bg-muted"
              )}
            >
              <span
                aria-hidden
                className={cn(
                  "h-0.5 w-5 rounded-full",
                  i === active ? "bg-brand" : "bg-foreground/30"
                )}
              />
              {s.title}
              <span className="text-muted-foreground tabular-nums">
                +{s.growth}%
              </span>
            </button>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-xs text-muted-foreground">
        Employment index, 2025 = 100
      </p>

      {/* Chart */}
      <div
        ref={wrapRef}
        tabIndex={0}
        role="group"
        aria-label="Line chart of projected employment growth, 2025 to 2035. Use the left and right arrow keys to inspect each year; a data table follows."
        onKeyDown={onKeyDown}
        onBlur={() => setHover(null)}
        className="relative mt-2 rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/60"
      >
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label={`Projected employment index for five data and AI occupations, rising from 100 in 2025 to between ${Math.round(
            SERIES[SERIES.length - 1].values[SPAN]
          )} and ${Math.round(SERIES[0].values[SPAN])} in 2035.`}
          className="block"
        >
          {/* Grid */}
          {Y_TICKS.map((t) => (
            <g key={t}>
              <line
                x1={m.left}
                x2={m.left + plotW}
                y1={y(t)}
                y2={y(t)}
                strokeWidth={1}
                className={
                  t === Y_MIN ? "stroke-foreground/25" : "stroke-border"
                }
              />
              <text
                x={m.left - 8}
                y={y(t)}
                dy="0.32em"
                textAnchor="end"
                fontSize={12}
                className="fill-muted-foreground"
              >
                {t}
              </text>
            </g>
          ))}
          {xTickYears.map((yr) => (
            <text
              key={yr}
              x={x(yr - START)}
              y={height - 12}
              textAnchor={yr === START ? "start" : yr === END ? "end" : "middle"}
              fontSize={12}
              className="fill-muted-foreground"
            >
              {yr}
            </text>
          ))}

          {/* De-emphasised series */}
          {SERIES.map((s, i) =>
            i === active ? null : (
              <path
                key={s.title}
                d={linePath(s.values)}
                pathLength={1}
                fill="none"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="chart-line stroke-foreground/25"
                data-visible={visible || undefined}
                style={{
                  opacity: visible ? undefined : 0,
                  animationDelay: `${i * 90}ms`,
                }}
              />
            )
          )}

          {/* Emphasised series: area wash + line, replayed when it changes */}
          <path
            key={`area-${active}`}
            d={areaPath}
            className="chart-fade fill-brand/10"
            style={{ opacity: visible ? undefined : 0 }}
          />
          <path
            key={`line-${active}`}
            d={linePath(current.values)}
            pathLength={1}
            fill="none"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="chart-line stroke-brand"
            style={{ opacity: visible ? undefined : 0 }}
          />

          {/* End marker + label for the emphasised series */}
          <g
            key={`end-${active}`}
            className="chart-fade"
            style={{ opacity: visible ? undefined : 0, animationDelay: "1.1s" }}
          >
            <circle
              cx={x(SPAN)}
              cy={y(current.values[SPAN])}
              r={5}
              strokeWidth={2}
              className="fill-brand stroke-card"
            />
            <text
              x={x(SPAN) + 12}
              y={y(current.values[SPAN])}
              dy="0.32em"
              fontSize={13}
              fontWeight={600}
              className="fill-foreground"
            >
              +{current.growth}%
            </text>
          </g>

          {/* Hover layer */}
          {hover !== null && (
            <g>
              <line
                x1={x(hover)}
                x2={x(hover)}
                y1={m.top}
                y2={m.top + plotH}
                strokeWidth={1}
                className="stroke-foreground/30"
              />
              {SERIES.map((s, i) => (
                <circle
                  key={s.title}
                  cx={x(hover)}
                  cy={y(s.values[hover])}
                  r={4}
                  strokeWidth={2}
                  className={cn(
                    "stroke-card",
                    i === active ? "fill-brand" : "fill-muted-foreground"
                  )}
                />
              ))}
            </g>
          )}

          <rect
            x={m.left}
            y={m.top}
            width={plotW}
            height={plotH}
            fill="transparent"
            onPointerMove={onPointerMove}
            onPointerLeave={() => setHover(null)}
          />
        </svg>

        {hover !== null && (
          <div
            className="pointer-events-none absolute z-10 w-56 rounded-lg bg-popover p-3 text-xs text-popover-foreground shadow-md ring-1 ring-foreground/10"
            style={{
              top: m.top,
              left: x(hover),
              transform:
                hover > SPAN / 2
                  ? "translateX(calc(-100% - 12px))"
                  : "translateX(12px)",
            }}
          >
            <p className="font-medium">{YEARS[hover]}</p>
            <ul className="mt-2 flex flex-col gap-1.5">
              {tooltipRows.map(({ s, i, v }) => (
                <li
                  key={s.title}
                  className={cn(
                    "flex items-center justify-between gap-3 tabular-nums",
                    i === active ? "font-medium" : "text-muted-foreground"
                  )}
                >
                  <span className="flex items-center gap-2 truncate">
                    <span
                      aria-hidden
                      className={cn(
                        "size-2 shrink-0 rounded-full",
                        i === active ? "bg-brand" : "bg-foreground/30"
                      )}
                    />
                    <span className="truncate">{s.title}</span>
                  </span>
                  <span>+{Math.round(v - 100)}%</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
        BLS publishes the 2025 estimate and the 2035 projection. Years in
        between assume steady annual growth.
      </p>

      <details className="mt-5 text-sm">
        <summary className="w-fit cursor-pointer font-medium text-brand underline-offset-4 outline-none hover:underline focus-visible:underline">
          View data table
        </summary>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[32rem] text-left tabular-nums">
            <thead className="text-xs text-muted-foreground">
              <tr className="border-b">
                <th className="py-2 pr-4 font-medium">Occupation</th>
                <th className="py-2 pr-4 text-right font-medium">Jobs 2025</th>
                <th className="py-2 pr-4 text-right font-medium">
                  Projected 2035
                </th>
                <th className="py-2 pr-4 text-right font-medium">Growth</th>
                <th className="py-2 text-right font-medium">Median pay</th>
              </tr>
            </thead>
            <tbody>
              {SERIES.map((s) => (
                <tr key={s.title} className="border-b last:border-0">
                  <td className="py-2 pr-4">
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline-offset-4 hover:underline"
                    >
                      {s.title}
                    </a>
                  </td>
                  <td className="py-2 pr-4 text-right">
                    {full.format(s.jobs2025)}
                  </td>
                  <td className="py-2 pr-4 text-right">
                    {full.format(s.jobs2035)}
                  </td>
                  <td className="py-2 pr-4 text-right">+{s.growth}%</td>
                  <td className="py-2 text-right">{usd.format(s.medianPay)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>

      <p className="mt-5 border-t pt-4 text-xs leading-relaxed text-muted-foreground">
        Source: U.S. Bureau of Labor Statistics, Occupational Outlook Handbook
        (projections 2025–35; median pay May 2025). U.S. figures only;
        projections, not guarantees.
      </p>
    </div>
  )
}
