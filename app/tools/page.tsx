import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import Container from "@/components/common/Container";
import ToolGrid from "@/components/tools/ToolGrid";
import CategoryCard from "@/components/tools/CategoryCard";
import JsonLd from "@/components/JsonLd";
import {
  collectionPageSchema,
  breadcrumbListSchema,
  webPageSchema,
} from "@/lib/structured-data";
import { SITE_URL } from "@/lib/constants/site";
import { tools, categories } from "@/data";

export const metadata: Metadata = {
  title: "All Tools",
  description: "Browse our collection of free online tools for image conversion, PDF manipulation, color utilities, QR codes, calculators, and more.",
  keywords: ["online tools", "free tools", "image converter", "PDF tools", "color picker", "QR code generator", "calculator"],
  openGraph: {
    title: "All Tools — ImageConvertersACRAV",
    description: "Browse our collection of free online tools for image conversion, PDF manipulation, color utilities, QR codes, calculators, and more.",
  },
};

interface ToolsPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function ToolsPage({ searchParams }: ToolsPageProps) {
  const { category } = await searchParams;

  const filteredTools = category
    ? tools.filter((t) => t.category === category)
    : tools;

  const selectedCategory = category
    ? categories.find((c) => c.id === category)
    : null;

  return (
    <>
      <JsonLd
        data={collectionPageSchema(
          selectedCategory ? selectedCategory.title : "All Tools",
          selectedCategory
            ? selectedCategory.description
            : "Browse our collection of free online utilities.",
          `${SITE_URL}/tools${category ? `?category=${category}` : ""}`,
          tools.map((t) => ({ url: `${SITE_URL}/tools/${t.slug}` })),
        )}
      />
      <JsonLd
        data={breadcrumbListSchema([
          { name: "Home", item: SITE_URL },
          { name: selectedCategory ? selectedCategory.title : "Tools" },
        ])}
      />
      <JsonLd
        data={webPageSchema(
          selectedCategory ? selectedCategory.title : "All Tools",
          selectedCategory
            ? selectedCategory.description
            : "Browse our collection of free online utilities.",
          `${SITE_URL}/tools${category ? `?category=${category}` : ""}`,
        )}
      />
    <Container className="py-12">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            {selectedCategory ? selectedCategory.title : "All Tools"}
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            {selectedCategory
              ? selectedCategory.description
              : "Browse our collection of free online utilities."}
          </p>
        </div>
        {category && (
          <Link
            href="/tools"
            className="shrink-0 text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-500 dark:hover:text-blue-400 transition-colors"
          >
            View all tools &rarr;
          </Link>
        )}
      </div>

      <div className="mt-10">
        {category ? (
          <Suspense fallback={<div className="text-zinc-500">Loading tools...</div>}>
            <ToolGrid tools={filteredTools} />
          </Suspense>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {categories.map((cat) => (
                <CategoryCard key={cat.id} category={cat} />
              ))}
            </div>

            <section className="mt-16">
              <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                All Tools
              </h2>
              <p className="mt-1 text-zinc-600 dark:text-zinc-400">
                {tools.length} tools available
              </p>
              <div className="mt-6">
                <ToolGrid tools={filteredTools} />
              </div>
            </section>
          </>
        )}
      </div>
    </Container>
    </>
  );
}
