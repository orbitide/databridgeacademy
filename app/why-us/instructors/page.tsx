import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/page-placeholder";

export const metadata: Metadata = { title: "Meet the instructors" };

export default function Page() {
  return (
    <PagePlaceholder
      eyebrow="Why us"
      title="Meet the instructors"
      description="Learn from practitioners who work in data science, machine learning, and AI."
    />
  );
}
