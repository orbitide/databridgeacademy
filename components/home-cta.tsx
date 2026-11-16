import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export function HomeCta() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <div className="rounded-3xl bg-brand-muted px-6 py-14 text-center ring-1 ring-brand/15 sm:px-12 sm:py-16">
          <h2 className="mx-auto max-w-2xl font-heading text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl">
            Ready to build your future in data and AI?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Apply when you are ready, or take a few minutes to find the program
            that fits you best.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-11 px-6 text-base">
              <Link href="/apply">
                Apply Now
                <ArrowRight data-icon="inline-end" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-11 px-6 text-base"
            >
              <Link href="/programs/quiz">Take the program quiz</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
