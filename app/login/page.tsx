import type { Metadata } from "next";

import { PagePlaceholder } from "@/components/page-placeholder";

export const metadata: Metadata = { title: "Login" };

export default function Page() {
  return (
    <PagePlaceholder
      eyebrow="Account"
      title="Login"
      description="Student login will be available here soon."
    />
  );
}
