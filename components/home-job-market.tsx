import { GrowthChart } from "@/components/growth-chart"
import { SectionHeading } from "@/components/section-heading"
import { sampleRoles } from "@/lib/job-market"

/** Illustrative roles from several regions. Not live postings. */
function SampleRoles() {
  return (
    <div className="mt-16">
      <h3 className="font-heading text-xl font-semibold">
        Roles you can aim for, worldwide
      </h3>
      <p className="mt-1 text-sm text-white/60">
        Illustrative examples, not live job postings.
      </p>

      <ul className="mt-6 flex flex-wrap gap-2.5">
        {sampleRoles.map((role) => (
          <li
            key={role.title + role.location}
            className="rounded-full bg-white/[0.07] px-4 py-2 text-sm ring-1 ring-white/10"
          >
            <span className="font-medium">{role.title}</span>
            <span className="text-white/60"> · {role.location}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function HomeJobMarket() {
  return (
    <section className="border-b bg-[oklch(0.26_0_0)] text-white">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        <SectionHeading
          dark
          eyebrowClassName="text-white/60"
          eyebrow="Job market"
          title="Demand for data and AI skills keeps growing"
        />

        <div className="mt-12">
          <GrowthChart />
        </div>

        <SampleRoles />
      </div>
    </section>
  )
}
