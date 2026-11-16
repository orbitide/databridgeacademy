import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { HeroHighlights } from "@/components/hero-highlights"
import { HeroVideo } from "@/components/hero-video"
import { Button } from "@/components/ui/button"

/**
 * Stand-in stock footage (Mixkit), played as a short montage of different
 * scenes. Replace with the academy's own clips, e.g. files in /public/videos
 * referenced as "/videos/clip-1.mp4".
 */
const heroVideo = {
  sources: [
    // Programmer at a workstation
    "https://assets.mixkit.co/videos/41641/41641-720.mp4",
    // Teacher explaining a chart to a student
    "https://assets.mixkit.co/videos/50114/50114-720.mp4",
    // Students working together
    "https://assets.mixkit.co/videos/48166/48166-720.mp4",
    // Team presentation with graphics
    "https://assets.mixkit.co/videos/42666/42666-720.mp4",
    // People moving between data visualisations
    "https://assets.mixkit.co/videos/5410/5410-720.mp4",
  ],
  poster:
    "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=70",
  label: "Montage of learners coding, studying, and presenting data",
}

export function Hero() {
  return (
    <section className="relative -mt-16 flex min-h-svh items-center overflow-hidden border-b pt-16 section-wash-ttb">
      <div className="mx-auto grid w-full max-w-6xl gap-14 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-12 lg:items-end lg:gap-10 lg:px-8 lg:py-32">
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
        <div className="relative lg:col-span-5 xl:col-span-7 xl:px-24">
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
