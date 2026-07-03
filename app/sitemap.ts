import { tools } from "@/data";
import { getSortedPosts, getCategories, getTags } from "@/data/blog/utils";
import { SITE_URL } from "@/lib/constants/site";
import type { MetadataRoute } from "next";

function escapeXml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: escapeXml(SITE_URL), lastModified: new Date(), changeFrequency: "weekly" as const, priority: 1 },
    { url: escapeXml(`${SITE_URL}/tools`), lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.9 },
    { url: escapeXml(`${SITE_URL}/blog`), lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.8 },
    { url: escapeXml(`${SITE_URL}/about`), lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.5 },
    { url: escapeXml(`${SITE_URL}/contact`), lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.4 },
    { url: escapeXml(`${SITE_URL}/privacy`), lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
    { url: escapeXml(`${SITE_URL}/terms`), lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
    { url: escapeXml(`${SITE_URL}/disclaimer`), lastModified: new Date(), changeFrequency: "yearly" as const, priority: 0.3 },
  ];

  const toolPages = tools.map((tool) => ({
    url: escapeXml(`${SITE_URL}/tools/${tool.slug}`),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const blogPages = getSortedPosts().map((post) => ({
    url: escapeXml(`${SITE_URL}/blog/${post.slug}`),
    lastModified: new Date(post.updatedAt || post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const categoryPages = getCategories().map((cat) => ({
    url: escapeXml(`${SITE_URL}/blog/category/${cat.slug}`),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  const tagPages = getTags().map((tag) => ({
    url: escapeXml(`${SITE_URL}/blog/tag/${tag.slug}`),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.4,
  }));

  return [...staticPages, ...toolPages, ...blogPages, ...categoryPages, ...tagPages];
}
