import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PagePlaceholder } from "@/components/page-placeholder";
import { programLinks } from "@/lib/navigation";

const findProgram = (slug: string) =>
  programLinks.find((p) => p.href === `/programs/${slug}`);

export function generateStaticParams() {
  return programLinks.map((p) => ({ slug: p.href.split("/").pop()! }));
}

export async function generateMetadata({
  params,
}: PageProps<"/programs/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return { title: findProgram(slug)?.title };
}

export default async function Page({ params }: PageProps<"/programs/[slug]">) {
  const { slug } = await params;
  const program = findProgram(slug);
  if (!program) notFound();

  return (
    <PagePlaceholder
      eyebrow="Programs"
      title={program.title}
      description={program.description ?? ""}
    />
  );
}
