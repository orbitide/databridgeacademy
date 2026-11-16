import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/page-placeholder";

export const metadata: Metadata = { title: "Skills audit" };

export default function Page() {
  return (
    <PagePlaceholder
      eyebrow="Programs"
      title="Skills audit"
      description="A three-minute check of your current skills, with a recommended starting point."
    />
  );
}
