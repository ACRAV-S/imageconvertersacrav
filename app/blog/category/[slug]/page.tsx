import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/common/Container";
import BlogGrid from "@/components/blog/BlogGrid";
import Pagination from "@/components/blog/Pagination";
import Breadcrumb from "@/components/blog/Breadcrumb";
import { getPostsByCategory, getCategories, paginatePosts } from "@/data/blog/utils";
import { SITE_URL } from "@/lib/constants/site";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateStaticParams() {
  return getCategories().map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategories().find((c) => c.slug === slug);
  if (!cat) return {};
  return {
    title: `${cat.name} Articles`,
    description: `Browse all articles in the ${cat.name} category.`,
    alternates: { canonical: `${SITE_URL}/blog/category/${slug}` },
    openGraph: {
      title: `${cat.name} Articles | ImageConvertersACRAV Blog`,
      description: `Browse all articles in the ${cat.name} category.`,
      url: `${SITE_URL}/blog/category/${slug}`,
      siteName: "ImageConvertersACRAV",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `${cat.name} Articles | ImageConvertersACRAV Blog`,
      description: `Browse all articles in the ${cat.name} category.`,
    },
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { slug } = await params;
  const { page } = await searchParams;
  const currentPage = Math.max(1, parseInt(page || "1", 10) || 1);
  const cat = getCategories().find((c) => c.slug === slug);

  if (!cat) {
    notFound();
  }

  const allPosts = getPostsByCategory(slug);
  const { posts, totalPages } = paginatePosts(allPosts, currentPage, 9);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${cat.name} Articles | ImageConvertersACRAV Blog`,
    description: `Browse all articles in the ${cat.name} category.`,
    url: `${SITE_URL}/blog/category/${slug}`,
  };

  return (
    <Container className="py-10 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mb-10">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: cat.name },
          ]}
        />
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl leading-tight">
          {cat.name}
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          {allPosts.length} article{allPosts.length === 1 ? "" : "s"} in this category.
        </p>
      </div>

      <BlogGrid posts={posts} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        basePath={`/blog/category/${slug}`}
        searchParams={{}}
      />
    </Container>
  );
}
