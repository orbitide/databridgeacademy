import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/page-placeholder";

export const metadata: Metadata = { title: "Student stories" };

export default function Page() {
  return (
    <PagePlaceholder
      eyebrow="Why us"
      title="Student stories"
      description="How learners from different backgrounds moved into data and AI. Stories will appear here."
    />
  );
}
