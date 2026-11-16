import { cn } from "@/lib/utils"
import { skillTimeline } from "@/lib/job-market"

/**
 * Milestones in the AI skill stack. Vertical on small screens, a single
 * horizontal rail from lg up. Evenly spaced: the order matters, not the gaps.
 */
export function SkillsTimeline() {
  const last = skillTimeline.length - 1

  return (
    <div className="mt-16">
      <h3 className="font-heading text-xl font-semibold">
        The skill stack keeps moving
      </h3>
      <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
        New tools and techniques keep entering the toolkit. Our programs are
        updated as they do, so you learn what teams use now.
      </p>

      <ol className="mt-8 ml-1.5 border-l lg:ml-0 lg:grid lg:grid-cols-7 lg:border-t lg:border-l-0">
        {skillTimeline.map((item, i) => (
          <li
            key={item.skill}
            className="relative pb-7 pl-7 last:pb-0 lg:pt-7 lg:pr-3 lg:pb-0 lg:pl-0"
          >
            <span
              aria-hidden
              className={cn(
                "absolute top-1 -left-[0.4375rem] size-3.5 rounded-full ring-4 ring-background lg:-top-[0.4375rem] lg:left-0",
                i === last ? "bg-brand" : "bg-foreground/25"
              )}
            />
            <p className="font-mono text-xs text-muted-foreground">
              {item.date}
            </p>
            <p
              className={cn(
                "mt-1 font-medium",
                i === last && "text-brand"
              )}
            >
              {item.skill}
            </p>
          </li>
        ))}
      </ol>
    </div>
  )
}
