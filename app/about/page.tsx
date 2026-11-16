import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/page-placeholder";

export const metadata: Metadata = { title: "About Data Bridge Academy" };

export default function Page() {
  return (
    <PagePlaceholder
      eyebrow="About"
      title="About Data Bridge Academy"
      description="A career-focused technology education platform helping beginners, graduates, and career switchers build practical skills in data and AI."
    />
  );
}
