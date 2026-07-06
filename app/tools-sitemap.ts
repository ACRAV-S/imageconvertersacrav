import { tools } from "@/data";
import { SITE_URL } from "@/lib/constants/site";

const MAX_URLS = 99;

function chunk<T>(arr: T[]): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += MAX_URLS) {
    result.push(arr.slice(i, i + MAX_URLS));
  }
  return result;
}

export function getToolsSitemapChunks() {
  return chunk(tools).map((chunk, i) => ({
    id: `tools-${i}`,
    entries: chunk.map((tool) => ({
      url: `${SITE_URL}/tools/${tool.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  }));
}
