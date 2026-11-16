import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/page-placeholder";

export const metadata: Metadata = { title: "Resources" };

export default function Page() {
  return (
    <PagePlaceholder
      eyebrow="Resources"
      title="Resources"
      description="Articles, guides, and free learning materials to support your journey into data and AI."
    />
  );
}
