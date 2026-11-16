"use client"

import * as React from "react"
import { Pause, Play } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Muted, looping background-style video with an accessible pause/play control.
 * Does not autoplay for visitors who prefer reduced motion.
 */
export function HeroVideo({
  src,
  poster,
  label,
  className,
}: {
  src: string
  poster?: string
  /** Accessible description of what the video shows. */
  label: string
  className?: string
}) {
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = React.useState(true)

  React.useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause()
    }
  }, [])

  const toggle = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      void video.play()
    } else {
      video.pause()
    }
  }

  return (
    <div className={cn("relative overflow-hidden rounded-xl bg-muted", className)}>
      <video
        ref={videoRef}
        className="size-full object-cover"
        src={src}
        poster={poster}
        aria-label={label}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause video" : "Play video"}
        className="absolute right-3 bottom-3 flex size-10 items-center justify-center rounded-full bg-background/90 text-foreground outline-none transition-colors hover:bg-background focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
      </button>
    </div>
  )
}
