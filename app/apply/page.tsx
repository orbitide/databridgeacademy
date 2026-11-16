import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/page-placeholder";

export const metadata: Metadata = { title: "Apply to Data Bridge Academy" };

export default function Page() {
  return (
    <PagePlaceholder
      eyebrow="Admissions"
      title="Apply to Data Bridge Academy"
      description="Start your application to join an upcoming cohort. The admissions form will be available here soon."
    />
  );
}
