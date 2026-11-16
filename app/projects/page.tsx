import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/page-placeholder";

export const metadata: Metadata = { title: "Student projects" };

export default function Page() {
  return (
    <PagePlaceholder
      eyebrow="Projects"
      title="Student projects"
      description="Real-world projects our learners build with real datasets, from exploratory analysis to deployed models."
    />
  );
}
