"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { ProjectVisual } from "@/components/project-visuals"
import { cn } from "@/lib/utils"
import type { ProjectVisualKind } from "@/lib/projects"

export type ProjectSlide = {
  /** Program name, shown as the category. */
  category: string
  /** Small tag next to the category, e.g. "Coming soon". */
  badge?: string
  title: string
  description: string
  tools: string[]
  visual: ProjectVisualKind
}

const GAP_PX = 16

/**
 * One sample project per program. The track is full width and each card is
 * 60% of it on large screens (wider on small ones), centred by scroll-snap so
 * the neighbouring cards peek in on both sides. Native scrolling handles
 * touch, trackpad and keyboard; the buttons and dots sit on top of it.
 */
export function ProjectsSlider({
  slides,
  label,
}: {
  slides: ProjectSlide[]
  label: string
}) {
  const trackRef = React.useRef<HTMLUListElement>(null)
  const [index, setIndex] = React.useState(0)

  const stride = React.useCallback(() => {
    const slide = trackRef.current?.querySelector<HTMLElement>("li")
    return slide ? slide.offsetWidth + GAP_PX : 1
  }, [])

  const update = React.useCallback(() => {
    const el = trackRef.current
    if (!el) return
    const next = Math.round(el.scrollLeft / stride())
    setIndex(Math.min(Math.max(next, 0), slides.length - 1))
  }, [stride, slides.length])

  React.useEffect(() => {
    const el = trackRef.current
    if (!el) return
    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => observer.disconnect()
  }, [update])

  function goTo(i: number) {
    const clamped = Math.min(Math.max(i, 0), slides.length - 1)
    trackRef.current?.scrollTo({ left: clamped * stride(), behavior: "smooth" })
  }

  /* Mouse dragging. Touch and pen already scroll the track natively. */
  const drag = React.useRef({ active: false, startX: 0, startLeft: 0 })
  const [dragging, setDragging] = React.useState(false)

  function onPointerDown(e: React.PointerEvent<HTMLUListElement>) {
    const el = trackRef.current
    if (!el || e.pointerType !== "mouse" || e.button !== 0) return
    drag.current = { active: true, startX: e.clientX, startLeft: el.scrollLeft }
    el.setPointerCapture(e.pointerId)
    setDragging(true)
  }

  function onPointerMove(e: React.PointerEvent<HTMLUListElement>) {
    const el = trackRef.current
    if (!el || !drag.current.active) return
    el.scrollLeft = drag.current.startLeft - (e.clientX - drag.current.startX)
  }

  function endDrag(e: React.PointerEvent<HTMLUListElement>) {
    const el = trackRef.current
    if (!el || !drag.current.active) return
    const { startX, startLeft } = drag.current
    drag.current.active = false
    if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId)
    setDragging(false)

    // Snap to the nearest card; a short flick moves one card in its direction.
    const dx = e.clientX - startX
    const startIndex = Math.round(startLeft / stride())
    let target = Math.round(el.scrollLeft / stride())
    if (target === startIndex && Math.abs(dx) > 40) {
      target += dx < 0 ? 1 : -1
    }
    goTo(target)
  }

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
    >
      <ul
        ref={trackRef}
        tabIndex={0}
        onScroll={update}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onDragStart={(e) => e.preventDefault()}
        className={cn(
          "flex gap-4 overflow-x-auto px-[6%] py-2 outline-none select-none [scrollbar-width:none] focus-visible:ring-3 focus-visible:ring-ring/60 sm:px-[14%] lg:px-[20%] [&::-webkit-scrollbar]:hidden",
          // Snapping and smooth scrolling are off while a drag is in progress.
          dragging
            ? "cursor-grabbing snap-none scroll-auto"
            : "cursor-grab snap-x snap-mandatory scroll-smooth motion-reduce:scroll-auto"
        )}
      >
        {slides.map((slide, i) => (
          <li
            key={slide.title}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}`}
            aria-current={i === index}
            className={cn(
              "flex basis-full shrink-0 snap-center transition-[opacity,scale] duration-300 motion-reduce:transition-none",
              i === index ? "opacity-100" : "scale-[0.97] opacity-70"
            )}
          >
            <ProjectCard slide={slide} />
          </li>
        ))}
      </ul>

      <div className="mx-auto mt-6 flex max-w-6xl items-center justify-center gap-5 px-4">
        <ArrowButton
          label="Previous project"
          disabled={index === 0}
          onClick={() => goTo(index - 1)}
        >
          <ChevronLeft className="size-5" />
        </ArrowButton>

        <div className="flex items-center gap-2">
          {slides.map((slide, i) => (
            <button
              key={slide.title}
              type="button"
              aria-label={`Show ${slide.title}`}
              aria-current={i === index}
              onClick={() => goTo(i)}
              className={cn(
                "h-2 rounded-full transition-all outline-none focus-visible:ring-3 focus-visible:ring-ring/60",
                i === index
                  ? "w-6 bg-brand"
                  : "w-2 bg-foreground/20 hover:bg-foreground/40"
              )}
            />
          ))}
        </div>

        <ArrowButton
          label="Next project"
          disabled={index === slides.length - 1}
          onClick={() => goTo(index + 1)}
        >
          <ChevronRight className="size-5" />
        </ArrowButton>
      </div>
    </div>
  )
}

function ArrowButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string
  disabled: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="flex size-10 items-center justify-center rounded-full bg-card text-foreground ring-1 ring-foreground/15 transition-colors outline-none hover:bg-foreground hover:text-background focus-visible:ring-3 focus-visible:ring-ring/60 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:bg-card disabled:hover:text-foreground"
    >
      {children}
    </button>
  )
}

function ProjectCard({ slide }: { slide: ProjectSlide }) {
  return (
    <article className="grid w-full overflow-hidden rounded-2xl bg-[oklch(0.2_0.05_262)] text-white shadow-sm ring-1 ring-foreground/10 xl:min-h-[420px] xl:grid-cols-[1.35fr_1fr]">
      {/* Starts at the card's top-left edge and fills its full height. */}
      <div className="relative">
        <ProjectVisual
          kind={slide.visual}
          className="xl:absolute xl:inset-0"
        />
      </div>

      <div className="flex flex-col justify-center p-5 sm:p-8 xl:pl-10">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-mono text-xs tracking-wide text-[oklch(0.82_0.11_192)] uppercase">
            {slide.category}
          </p>
          {slide.badge && (
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-white/70 uppercase">
              {slide.badge}
            </span>
          )}
        </div>

        <h3 className="mt-4 font-heading text-2xl leading-snug font-semibold text-balance sm:text-3xl">
          {slide.title}
        </h3>
        <p className="mt-4 leading-relaxed text-white/70">
          {slide.description}
        </p>

        <p className="mt-8 text-xs tracking-wide text-white/50 uppercase">
          Tools
        </p>
        <ul className="mt-2 flex flex-wrap gap-2">
          {slide.tools.map((tool) => (
            <li
              key={tool}
              className="rounded-full bg-[oklch(0.82_0.11_192)]/10 px-3 py-1 text-sm font-medium text-[oklch(0.82_0.11_192)] ring-1 ring-[oklch(0.82_0.11_192)]/25"
            >
              {tool}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
