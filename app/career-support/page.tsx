import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/page-placeholder";

export const metadata: Metadata = { title: "Career support" };

export default function Page() {
  return (
    <PagePlaceholder
      eyebrow="Career Support"
      title="Career support"
      description="Resume reviews, portfolio feedback, interview preparation, and guidance for landing your next role in tech."
    />
  );
}
