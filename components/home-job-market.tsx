import { GrowthChart } from "@/components/growth-chart"
import { HomeRoles } from "@/components/home-roles"
import { SectionHeading } from "@/components/section-heading"

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

        <HomeRoles />
      </div>
    </section>
  )
}
