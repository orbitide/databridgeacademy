import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"

/** Temporary page shell for routes that don't have real content yet. */
export function PagePlaceholder({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string
  title: string
  description: string
}) {
  return (
    <main className="flex-1">
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        {eyebrow && (
          <p className="text-sm font-medium text-brand">{eyebrow}</p>
        )}
        <h1 className="mt-3 font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          {description}
        </p>
        <p className="mt-8 inline-flex rounded-md bg-muted px-3 py-1.5 text-sm text-muted-foreground">
          This page is coming soon.
        </p>
        <div className="mt-10">
          <Button asChild variant="outline">
            <Link href="/">
              <ArrowLeft data-icon="inline-start" />
              Back to home
            </Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
