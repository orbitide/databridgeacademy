import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/page-placeholder";

export const metadata: Metadata = { title: "Structured curriculum" };

export default function Page() {
  return (
    <PagePlaceholder
      eyebrow="Why us"
      title="Structured curriculum"
      description="Programs built in a clear order, from fundamentals to portfolio, so you always know what comes next."
    />
  );
}
