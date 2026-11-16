import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/page-placeholder";

export const metadata: Metadata = { title: "Mentorship" };

export default function Page() {
  return (
    <PagePlaceholder
      eyebrow="Why us"
      title="Mentorship"
      description="Regular feedback and code review from practitioners who work in data and AI."
    />
  );
}
