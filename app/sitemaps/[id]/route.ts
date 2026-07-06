import { getToolsSitemapChunks } from "@/app/tools-sitemap";
import { getStaticSitemap, getBlogPostSitemap } from "@/app/blog-sitemap";
import { getCategorySitemap } from "@/app/category-sitemap";
import { getTagSitemapChunks } from "@/app/tag-sitemap";
import { resolveRouteData } from "next/dist/build/webpack/loaders/metadata/resolve-route-data";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const params: { id: string }[] = [];

  params.push({ id: "static.xml" });
  params.push({ id: "blog.xml" });
  params.push({ id: "categories.xml" });

  for (const chunk of getToolsSitemapChunks()) {
    params.push({ id: `${chunk.id}.xml` });
  }

  for (const chunk of getTagSitemapChunks()) {
    params.push({ id: `${chunk.id}.xml` });
  }

  return params;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const key = id.replace(/\.xml$/, "");

  let entries:
    | {
        url: string;
        lastModified: Date;
        changeFrequency?: string;
        priority?: number;
      }[]
    | undefined;

  if (key === "static") {
    entries = getStaticSitemap();
  }

  if (key === "blog") {
    entries = getBlogPostSitemap();
  }

  if (key === "categories") {
    entries = getCategorySitemap();
  }

  const toolChunks = getToolsSitemapChunks();
  const toolChunk = toolChunks.find((c) => c.id === key);
  if (toolChunk) entries = toolChunk.entries;

  const tagChunks = getTagSitemapChunks();
  const tagChunk = tagChunks.find((c) => c.id === key);
  if (tagChunk) entries = tagChunk.entries;

  if (!entries) {
    return new Response("Not Found", { status: 404 });
  }

  const xml = resolveRouteData(entries as any, "sitemap");

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
