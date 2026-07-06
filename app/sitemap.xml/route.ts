import { getToolsSitemapChunks } from "../tools-sitemap";
import { getTagSitemapChunks } from "../tag-sitemap";
import { SITE_URL } from "@/lib/constants/site";

export const dynamic = "force-static";

export async function GET() {
  const sitemaps: { url: string; lastModified: Date }[] = [];

  sitemaps.push({
    url: `${SITE_URL}/sitemaps/static.xml`,
    lastModified: new Date(),
  });

  sitemaps.push({
    url: `${SITE_URL}/sitemaps/blog.xml`,
    lastModified: new Date(),
  });

  for (const chunk of getToolsSitemapChunks()) {
    sitemaps.push({
      url: `${SITE_URL}/sitemaps/${chunk.id}.xml`,
      lastModified: new Date(),
    });
  }

  sitemaps.push({
    url: `${SITE_URL}/sitemaps/categories.xml`,
    lastModified: new Date(),
  });

  for (const chunk of getTagSitemapChunks()) {
    sitemaps.push({
      url: `${SITE_URL}/sitemaps/${chunk.id}.xml`,
      lastModified: new Date(),
    });
  }

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  for (const sitemap of sitemaps) {
    xml += "  <sitemap>\n";
    xml += `    <loc>${sitemap.url}</loc>\n`;
    xml += `    <lastmod>${sitemap.lastModified.toISOString()}</lastmod>\n`;
    xml += "  </sitemap>\n";
  }

  xml += "</sitemapindex>";

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
