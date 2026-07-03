import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Container from "@/components/common/Container";
import ReadingProgressBar from "@/components/blog/ReadingProgressBar";
import TableOfContents from "@/components/blog/TableOfContents";
import AuthorBlock from "@/components/blog/AuthorBlock";
import ShareButtons from "@/components/blog/ShareButtons";
import BlogCard from "@/components/blog/BlogCard";
import Breadcrumb from "@/components/blog/Breadcrumb";
import CategoryBadge from "@/components/blog/CategoryBadge";
import ScrollToTop from "@/components/blog/ScrollToTop";
import NewsletterCTA from "@/components/blog/NewsletterCTA";
import Image from "next/image";
import {
  getPostBySlug,
  getAdjacentPosts,
  getRelatedPosts,
  getRelatedTools,
  extractToc,
  processContent,
  getSortedPosts,
  slugify,
} from "@/data/blog/utils";
import { SITE_URL } from "@/lib/constants/site";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getSortedPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const pageTitle = post.seoTitle ?? post.title;
  const pageDescription = post.metaDescription ?? post.description;
  return {
    title: pageTitle,
    description: pageDescription,
    alternates: { canonical: `${SITE_URL}/blog/${slug}` },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      url: `${SITE_URL}/blog/${slug}`,
      siteName: "ImageConvertersACRAV",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const contentHtml = processContent(post.content);
  const tocItems = extractToc(post.content);
  const { prev, next } = getAdjacentPosts(post);
  const relatedPosts = getRelatedPosts(post, 6);
  const relatedTools = getRelatedTools(post, 6);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    author: {
      "@type": "Person",
      name: post.author.name,
    },
    datePublished: post.publishedAt,
    ...(post.updatedAt ? { dateModified: post.updatedAt } : {}),
    publisher: {
      "@type": "Organization",
      name: "ImageConvertersACRAV",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${slug}`,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      ...(post.categories.length > 0
        ? [
            {
              "@type": "ListItem" as const,
              position: 3,
              name: post.categories[0],
              item: `${SITE_URL}/blog/category/${slugify(post.categories[0])}`,
            },
            {
              "@type": "ListItem" as const,
              position: 4,
              name: post.title,
            },
          ]
        : [
            {
              "@type": "ListItem" as const,
              position: 3,
              name: post.title,
            },
          ]),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ReadingProgressBar />
      <ScrollToTop />
      <Container className="py-10 sm:py-12">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            ...(post.categories.length > 0
              ? [
                  {
                    label: post.categories[0],
                    href: `/blog/category/${slugify(post.categories[0])}`,
                  },
                ]
              : []),
            { label: post.title },
          ]}
        />

        <div className="lg:grid lg:grid-cols-[1fr_240px] lg:gap-12">
          <article className="min-w-0">
            <header className="mb-10">
              <div className="flex flex-wrap gap-2 mb-4">
                {post.categories.map((cat) => (
                  <CategoryBadge key={cat} name={cat} />
                ))}
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl leading-tight">
                {post.title}
              </h1>

              <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {post.description}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-zinc-500 dark:text-zinc-400">
                <AuthorBlock author={post.author} inline />
                <span className="hidden sm:inline" aria-hidden="true">&middot;</span>
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                {post.updatedAt && post.updatedAt !== post.publishedAt && (
                  <>
                    <span aria-hidden="true">&middot;</span>
                    <span>
                      Updated{" "}
                      <time dateTime={post.updatedAt}>
                        {new Date(post.updatedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                    </span>
                  </>
                )}
                <span aria-hidden="true">&middot;</span>
                <span>{post.readingTime} min read</span>
              </div>

              {post.tags.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog/tag/${slugify(tag)}`}
                      className="text-xs font-medium text-zinc-500 bg-zinc-100 px-2.5 py-1 rounded-md hover:bg-zinc-200 dark:text-zinc-400 dark:bg-zinc-800 dark:hover:bg-zinc-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              )}
            </header>

            <div
              className="prose max-w-[720px]"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />

            <div className="mt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-5 border-t border-zinc-200 dark:border-zinc-800">
              <AuthorBlock author={post.author} />
              <ShareButtons title={post.title} slug={post.slug} />
            </div>

            <footer className="mt-8 border-t border-zinc-200 pt-8 dark:border-zinc-800">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                {prev ? (
                  <Link
                    href={`/blog/${prev.slug}`}
                    className="group flex-1 rounded-xl border border-zinc-200 bg-white p-5 hover:border-blue-200 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-blue-800 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  >
                    <span className="inline-flex items-center gap-1 text-xs text-zinc-400 dark:text-zinc-500">
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/></svg>
                      Previous Article
                    </span>
                    <p className="mt-1.5 text-sm font-medium text-zinc-900 group-hover:text-blue-600 dark:text-zinc-50 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                      {prev.title}
                    </p>
                  </Link>
                ) : (
                  <div className="flex-1" />
                )}
                {next ? (
                  <Link
                    href={`/blog/${next.slug}`}
                    className="group flex-1 rounded-xl border border-zinc-200 bg-white p-5 text-right hover:border-blue-200 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-blue-800 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  >
                    <span className="inline-flex items-center gap-1 justify-end text-xs text-zinc-400 dark:text-zinc-500">
                      Next Article
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>
                    </span>
                    <p className="mt-1.5 text-sm font-medium text-zinc-900 group-hover:text-blue-600 dark:text-zinc-50 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                      {next.title}
                    </p>
                  </Link>
                ) : (
                  <div className="flex-1" />
                )}
              </div>
            </footer>

            <div className="mt-12">
              <NewsletterCTA />
            </div>
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <TableOfContents items={tocItems} />
            </div>
          </aside>
        </div>

        {relatedPosts.length > 0 && (
          <section className="mt-16 border-t border-zinc-200 pt-12 dark:border-zinc-800">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                Related Articles
              </h2>
              <Link
                href="/blog"
                className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                View all
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.slice(0, 3).map((rp) => (
                <BlogCard key={rp.slug} post={rp} />
              ))}
            </div>
            {relatedPosts.length > 3 && (
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {relatedPosts.slice(3, 6).map((rp) => (
                  <BlogCard key={rp.slug} post={rp} />
                ))}
              </div>
            )}
          </section>
        )}

        {relatedTools.length > 0 && (
          <section className="mt-12 border-t border-zinc-200 pt-12 dark:border-zinc-800">
            <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-8">
              Related Tools
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedTools.slice(0, 6).map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="group flex items-center gap-3 rounded-xl border border-zinc-200 bg-white p-4 hover:border-blue-200 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-blue-800 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                >
                  <span className="text-2xl" aria-hidden="true">{tool.icon}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-zinc-900 group-hover:text-blue-600 dark:text-zinc-50 dark:group-hover:text-blue-400 transition-colors truncate">
                      {tool.title}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1">
                      {tool.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </Container>
    </>
  );
}
