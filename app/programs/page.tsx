import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/page-placeholder";

export const metadata: Metadata = { title: "Programs" };

export default function Page() {
  return (
    <PagePlaceholder
      eyebrow="Programs"
      title="Programs"
      description="Structured programs in Data Science, Machine Learning, and Artificial Intelligence, built around theory, practice, real-world projects, and mentorship."
    />
  );
}
