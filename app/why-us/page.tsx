import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/page-placeholder";

export const metadata: Metadata = { title: "Why Data Bridge Academy" };

export default function Page() {
  return (
    <PagePlaceholder
      eyebrow="Why us"
      title="Why Data Bridge Academy"
      description="How we teach, who teaches you, and how we help you move into your next role."
    />
  );
}
