import type { Metadata } from "next";
import Container from "@/components/common/Container";
import BlogGrid from "@/components/blog/BlogGrid";
import BlogSearchInput from "@/components/blog/BlogSearchInput";
import Pagination from "@/components/blog/Pagination";
import Breadcrumb from "@/components/blog/Breadcrumb";
import {
  getSortedPosts,
  searchPosts,
  paginatePosts,
  getCategories,
  getTags,
} from "@/data/blog/utils";
import Link from "next/link";
import { SITE_URL } from "@/lib/constants/site";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Articles, tutorials, and guides about image processing, PDF tools, and web development.",
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: "Blog | ImageConvertersACRAV",
    description:
      "Articles, tutorials, and guides about image processing, PDF tools, and web development.",
    url: `${SITE_URL}/blog`,
    siteName: "ImageConvertersACRAV",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | ImageConvertersACRAV",
    description:
      "Articles, tutorials, and guides about image processing, PDF tools, and web development.",
  },
};

interface BlogPageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { page, search } = await searchParams;
  const currentPage = Math.max(1, parseInt(page || "1", 10) || 1);

  const filteredPosts = search ? searchPosts(search) : getSortedPosts();
  const { posts, totalPages } = paginatePosts(filteredPosts, currentPage, 9);
  const categories = getCategories();
  const tags = getTags();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Blog | ImageConvertersACRAV",
    description:
      "Articles, tutorials, and guides about image processing, PDF tools, and web development.",
    url: `${SITE_URL}/blog`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: getSortedPosts().slice(0, 9).map((post, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${SITE_URL}/blog/${post.slug}`,
      })),
    },
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
            { label: "Blog" },
          ]}
        />
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl leading-tight">
          Blog
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400 leading-relaxed">
          Articles, tutorials, and guides about image processing, PDF tools, and web development.
        </p>
      </div>

      <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-12">
        <div>
          <div className="mb-8">
            <BlogSearchInput />
          </div>

          {search && (
            <p className="mb-6 text-sm text-zinc-500 dark:text-zinc-400">
              {filteredPosts.length === 0
                ? `No results found for "${search}".`
                : `Showing results for "${search}" (${filteredPosts.length} article${filteredPosts.length === 1 ? "" : "s"}).`}
            </p>
          )}

          <BlogGrid posts={posts} searchQuery={search} />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath="/blog"
            searchParams={search ? { search } : {}}
          />
        </div>

        <aside className="mt-10 lg:mt-0 space-y-6">
          {categories.length > 0 && (
            <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-4">
                Categories
              </h2>
              <ul className="space-y-2" role="list">
                {categories.map((cat) => (
                  <li key={cat.slug}>
                    <Link
                      href={`/blog/category/${cat.slug}`}
                      className="flex items-center justify-between text-sm text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50 rounded"
                    >
                      <span>{cat.name}</span>
                      <span className="text-xs font-medium text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded-md dark:text-zinc-500 dark:bg-zinc-800">
                        {cat.count}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {tags.length > 0 && (
            <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-4">
                Tags
              </h2>
              <div className="flex flex-wrap gap-1.5" role="list" aria-label="Tags">
                {tags.map((tag) => (
                  <Link
                    key={tag.slug}
                    href={`/blog/tag/${tag.slug}`}
                    className="text-xs font-medium text-zinc-600 bg-zinc-100 px-2.5 py-1 rounded-md hover:bg-zinc-200 dark:text-zinc-400 dark:bg-zinc-800 dark:hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  >
                    {tag.name}
                    <span className="ml-1 text-zinc-400 dark:text-zinc-500">({tag.count})</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </Container>
  );
}
