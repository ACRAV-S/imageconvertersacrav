import { getTags } from "@/data/blog/utils";
import { SITE_URL } from "@/lib/constants/site";

const MAX_URLS = 99;

function chunk<T>(arr: T[]): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += MAX_URLS) {
    result.push(arr.slice(i, i + MAX_URLS));
  }
  return result;
}

export function getTagSitemapChunks() {
  return chunk(getTags()).map((chunk, i) => ({
    id: `tags-${i}`,
    entries: chunk.map((tag) => ({
      url: `${SITE_URL}/blog/tag/${tag.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.4,
    })),
  }));
}
