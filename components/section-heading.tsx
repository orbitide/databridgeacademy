import { cn } from "@/lib/utils"

/** Eyebrow + serif heading + optional lede, shared by home page sections. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  dark = false,
}: {
  eyebrow: string
  title: React.ReactNode
  description?: string
  className?: string
  /** Use on dark navy surfaces. */
  dark?: boolean
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <p
        className={cn(
          "text-sm font-medium",
          dark ? "text-[oklch(0.82_0.11_192)]" : "text-brand"
        )}
      >
        {eyebrow}
      </p>
      <h2 className="mt-3 font-heading text-3xl leading-tight font-semibold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-lg leading-relaxed",
            dark ? "text-white/70" : "text-muted-foreground"
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
