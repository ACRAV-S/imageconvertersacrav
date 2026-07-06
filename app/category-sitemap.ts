import { getCategories } from "@/data/blog/utils";
import { SITE_URL } from "@/lib/constants/site";

export function getCategorySitemap() {
  return getCategories().map((cat) => ({
    url: `${SITE_URL}/blog/category/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));
}
