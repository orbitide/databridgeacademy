"use client"

import * as React from "react"
import { Pause, Play } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Muted video montage with an accessible pause/play control.
 * Plays the clips in order, crossfading between them, and loops the list.
 * Does not autoplay for visitors who prefer reduced motion.
 */
export function HeroVideo({
  sources,
  poster,
  label,
  className,
}: {
  sources: string[]
  poster?: string
  /** Accessible description of what the video shows. */
  label: string
  className?: string
}) {
  const layerA = React.useRef<HTMLVideoElement>(null)
  const layerB = React.useRef<HTMLVideoElement>(null)
  const frontLayer = React.useRef<0 | 1>(0)
  const [front, setFront] = React.useState<0 | 1>(0)
  const [playing, setPlaying] = React.useState(true)

  React.useEffect(() => {
    const layers = [layerA.current, layerB.current]
    if (!layers[0]) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      layers[0].pause()
    }

    let clipIndex = 0
    let switching = false
    let timer: number | undefined

    // Start the next clip on the hidden layer, then fade it in.
    const advance = () => {
      if (switching || sources.length < 2) return
      const incomingIndex: 0 | 1 = frontLayer.current === 0 ? 1 : 0
      const incoming = layers[incomingIndex]
      if (!incoming) return

      switching = true
      clipIndex = (clipIndex + 1) % sources.length
      incoming.src = sources[clipIndex]
      incoming.currentTime = 0
      void incoming.play().catch(() => {})

      frontLayer.current = incomingIndex
      setFront(incomingIndex)
      timer = window.setTimeout(() => {
        switching = false
      }, 1500)
    }

    const cleanups = layers.map((video, layer) => {
      if (!video) return () => {}

      const onTimeUpdate = () => {
        if (layer !== frontLayer.current) return
        if (video.duration && video.duration - video.currentTime < 0.9) {
          advance()
        }
      }
      const onPlay = () => {
        if (layer === frontLayer.current) setPlaying(true)
      }
      const onPause = () => {
        if (layer === frontLayer.current) setPlaying(false)
      }

      video.addEventListener("timeupdate", onTimeUpdate)
      video.addEventListener("play", onPlay)
      video.addEventListener("pause", onPause)
      return () => {
        video.removeEventListener("timeupdate", onTimeUpdate)
        video.removeEventListener("play", onPlay)
        video.removeEventListener("pause", onPause)
      }
    })

    return () => {
      cleanups.forEach((cleanup) => cleanup())
      window.clearTimeout(timer)
    }
  }, [sources])

  const toggle = () => {
    const video = (frontLayer.current === 0 ? layerA : layerB).current
    if (!video) return
    if (video.paused) {
      void video.play()
    } else {
      video.pause()
    }
  }

  const layerClass = (layer: 0 | 1) =>
    cn(
      "absolute inset-0 size-full object-cover transition-opacity duration-700",
      front === layer ? "opacity-100" : "opacity-0"
    )

  return (
    <div className={cn("relative overflow-hidden rounded-xl bg-muted", className)}>
      <div role="img" aria-label={label} className="absolute inset-0">
        <video
          ref={layerA}
          className={layerClass(0)}
          src={sources[0]}
          poster={poster}
          autoPlay
          muted
          loop={sources.length < 2}
          playsInline
          preload="auto"
        />
        {sources.length > 1 && (
          <video
            ref={layerB}
            className={layerClass(1)}
            muted
            playsInline
            preload="auto"
          />
        )}
      </div>
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause video" : "Play video"}
        className="absolute right-3 bottom-3 z-10 flex size-10 items-center justify-center rounded-full bg-background/90 text-foreground outline-none transition-colors hover:bg-background focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
      </button>
    </div>
  )
}
