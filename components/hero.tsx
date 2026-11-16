import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { HeroHighlights } from "@/components/hero-highlights"
import { HeroVideo } from "@/components/hero-video"
import { Button } from "@/components/ui/button"

/**
 * Stand-in stock footage and poster. Replace with the academy's own video
 * (e.g. put a file in /public/videos and use "/videos/hero.mp4").
 */
const heroVideo = {
  src: "https://videos.pexels.com/video-files/3129671/3129671-hd_1920_1080_30fps.mp4",
  poster:
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=70",
  label: "Learners working together on code",
}

export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-hidden border-b bg-background">
      <div className="mx-auto grid w-full max-w-6xl gap-14 xl:max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-12 lg:items-end lg:gap-10 lg:px-8 lg:py-32">
        {/* Copy */}
        <div className="lg:col-span-7 xl:col-span-5">
          <h1 className="font-heading text-4xl leading-[1.08] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl xl:text-[3.25rem]">
            Build your
            <br />
            <span className="text-brand">future in data and AI</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Hands-on programs in data science, machine learning, and AI, with
            real projects and mentors beside you.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-11 px-6 text-base">
              <Link href="/programs">
                Explore Programs
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-11 px-6 text-base"
            >
              <Link href="/apply">Apply Now</Link>
            </Button>
          </div>
        </div>

        {/* Video with overlapping cards */}
        <div className="relative lg:col-span-5 xl:col-span-7 xl:px-40">
          <HeroVideo
            {...heroVideo}
            className="relative aspect-[3/4] shadow-sm sm:aspect-[4/3] lg:aspect-[2/3]"
          />

          <HeroHighlights />
        </div>
      </div>
    </section>
  )
}
