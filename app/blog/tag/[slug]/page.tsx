import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/common/Container";
import BlogGrid from "@/components/blog/BlogGrid";
import Pagination from "@/components/blog/Pagination";
import Breadcrumb from "@/components/blog/Breadcrumb";
import { getPostsByTag, getTags, paginatePosts } from "@/data/blog/utils";
import { SITE_URL } from "@/lib/constants/site";
import JsonLd from "@/components/JsonLd";
import {
  collectionPageSchema,
  breadcrumbListSchema,
  webPageSchema,
} from "@/lib/structured-data";

interface TagPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateStaticParams() {
  return getTags().map((tag) => ({ slug: tag.slug }));
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = getTags().find((t) => t.slug === slug);
  if (!tag) return {};
  return {
    title: `#${tag.name} Articles`,
    description: `Browse all articles tagged with #${tag.name}.`,
    alternates: { canonical: `${SITE_URL}/blog/tag/${slug}` },
    openGraph: {
      title: `#${tag.name} Articles | ImageConvertersACRAV Blog`,
      description: `Browse all articles tagged with #${tag.name}.`,
      url: `${SITE_URL}/blog/tag/${slug}`,
      siteName: "ImageConvertersACRAV",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `#${tag.name} Articles | ImageConvertersACRAV Blog`,
      description: `Browse all articles tagged with #${tag.name}.`,
    },
  };
}

export default async function TagPage({ params, searchParams }: TagPageProps) {
  const { slug } = await params;
  const { page } = await searchParams;
  const currentPage = Math.max(1, parseInt(page || "1", 10) || 1);
  const tag = getTags().find((t) => t.slug === slug);

  if (!tag) {
    notFound();
  }

  const allPosts = getPostsByTag(slug);
  const { posts, totalPages } = paginatePosts(allPosts, currentPage, 9);

  return (
    <>
      <JsonLd
        data={collectionPageSchema(
          `#${tag.name} Articles | ImageConvertersACRAV Blog`,
          `Browse all articles tagged with #${tag.name}.`,
          `${SITE_URL}/blog/tag/${slug}`,
          allPosts.map((post) => ({ url: `${SITE_URL}/blog/${post.slug}` })),
        )}
      />
      <JsonLd
        data={breadcrumbListSchema([
          { name: "Home", item: SITE_URL },
          { name: "Blog", item: `${SITE_URL}/blog` },
          { name: `#${tag.name}` },
        ])}
      />
      <JsonLd
        data={webPageSchema(
          `#${tag.name} Articles | ImageConvertersACRAV Blog`,
          `Browse all articles tagged with #${tag.name}.`,
          `${SITE_URL}/blog/tag/${slug}`,
        )}
      />
    <Container className="py-10 sm:py-12">
      <div className="mb-10">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: `#${tag.name}` },
          ]}
        />
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl leading-tight">
          #{tag.name}
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          {allPosts.length} article{allPosts.length === 1 ? "" : "s"} with this tag.
        </p>
      </div>

      <BlogGrid posts={posts} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath={`/blog/tag/${slug}`}
        searchParams={{}}
      />
    </Container>
    </>
  );
}
