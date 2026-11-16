import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PagePlaceholder } from "@/components/page-placeholder";
import { resourceLinks } from "@/lib/navigation";

const findResource = (slug: string) =>
  resourceLinks.find((p) => p.href === `/resources/${slug}`);

export function generateStaticParams() {
  return resourceLinks.map((p) => ({ slug: p.href.split("/").pop()! }));
}

export async function generateMetadata({
  params,
}: PageProps<"/resources/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return { title: findResource(slug)?.title };
}

export default async function Page({ params }: PageProps<"/resources/[slug]">) {
  const { slug } = await params;
  const resource = findResource(slug);
  if (!resource) notFound();

  return (
    <PagePlaceholder
      eyebrow="Resources"
      title={resource.title}
      description={resource.description ?? ""}
    />
  );
}
