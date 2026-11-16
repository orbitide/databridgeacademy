import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/page-placeholder";

export const metadata: Metadata = { title: "Upcoming cohorts" };

export default function Page() {
  return (
    <PagePlaceholder
      eyebrow="Cohorts"
      title="Upcoming cohorts"
      description="Learn alongside a cohort of peers on a guided schedule, with fixed start dates and dedicated mentors."
    />
  );
}
