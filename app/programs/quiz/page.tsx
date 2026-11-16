import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/page-placeholder";

export const metadata: Metadata = { title: "Find your program" };

export default function Page() {
  return (
    <PagePlaceholder
      eyebrow="Programs"
      title="Find your program"
      description="A short quiz to help you choose the program that fits your background and goals."
    />
  );
}
