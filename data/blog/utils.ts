import { blogPosts } from "./posts";
import { tools } from "@/data";
import type { BlogPost } from "./types";

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export interface HighlightResult {
  post: BlogPost;
  highlights: {
    title?: string;
    description?: string;
  };
}

export function getSortedPosts(): BlogPost[] {
  return [...blogPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getCategories() {
  const map = new Map<string, number>();
  blogPosts.forEach((post) => {
    post.categories.forEach((cat) => {
      map.set(cat, (map.get(cat) || 0) + 1);
    });
  });
  return Array.from(map.entries())
    .map(([name, count]) => ({
      name,
      slug: name.toLowerCase().replace(/\s+/g, "-"),
      count,
    }))
    .sort((a, b) => b.count - a.count);
}

export function getTags() {
  const map = new Map<string, number>();
  blogPosts.forEach((post) => {
    post.tags.forEach((tag) => {
      map.set(tag, (map.get(tag) || 0) + 1);
    });
  });
  return Array.from(map.entries())
    .map(([name, count]) => ({
      name,
      slug: name.toLowerCase().replace(/\s+/g, "-"),
      count,
    }))
    .sort((a, b) => b.count - a.count);
}

export function getPostsByCategory(slug: string): BlogPost[] {
  return getSortedPosts().filter((post) =>
    post.categories.some((cat) => cat.toLowerCase().replace(/\s+/g, "-") === slug)
  );
}

export function getPostsByTag(slug: string): BlogPost[] {
  return getSortedPosts().filter((post) =>
    post.tags.some((tag) => tag.toLowerCase().replace(/\s+/g, "-") === slug)
  );
}

export function searchPosts(query: string): BlogPost[] {
  const q = query.toLowerCase();
  return getSortedPosts().filter(
    (post) =>
      post.title.toLowerCase().includes(q) ||
      post.description.toLowerCase().includes(q) ||
      post.tags.some((tag) => tag.toLowerCase().includes(q))
  );
}

export function searchPostsWithHighlights(query: string): HighlightResult[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return getSortedPosts()
    .filter(
      (post) =>
        post.title.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q) ||
        post.tags.some((tag) => tag.toLowerCase().includes(q))
    )
    .map((post) => {
      const highlights: HighlightResult["highlights"] = {};
      const titleLower = post.title.toLowerCase();
      const descLower = post.description.toLowerCase();
      if (titleLower.includes(q)) {
        highlights.title = highlightMatch(post.title, q);
      }
      if (descLower.includes(q)) {
        highlights.description = highlightMatch(post.description, q);
      }
      return { post, highlights };
    });
}

function highlightMatch(text: string, query: string): string {
  const regex = new RegExp(`(${escapeRegex(query)})`, "gi");
  return text.replace(regex, "<mark class=\"bg-yellow-200 dark:bg-yellow-800 rounded px-0.5\">$1</mark>");
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function getRelatedPosts(post: BlogPost, limit = 6): BlogPost[] {
  const related = getSortedPosts()
    .filter(
      (p) =>
        p.slug !== post.slug &&
        p.categories.some((c) => post.categories.includes(c))
    );
  if (related.length >= limit) return related.slice(0, limit);
  const slugs = new Set(related.map((r) => r.slug));
  slugs.add(post.slug);
  const tagRelated = getSortedPosts().filter(
    (p) => !slugs.has(p.slug) && p.tags.some((t) => post.tags.includes(t))
  );
  return [...related, ...tagRelated].slice(0, limit);
}

export function getRelatedTools(post: BlogPost, limit = 6) {
  const postText = `${post.title} ${post.description} ${post.tags.join(" ")}`.toLowerCase();
  return tools
    .map((tool) => {
      const toolText = `${tool.title} ${tool.description} ${tool.keywords.join(" ")}`.toLowerCase();
      let score = 0;
      const words = postText.split(/\s+/);
      for (const word of words) {
        if (word.length > 2 && toolText.includes(word)) score++;
      }
      return { tool, score };
    })
    .filter((t) => t.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((t) => t.tool);
}

export function getAdjacentPosts(post: BlogPost) {
  const sorted = getSortedPosts();
  const idx = sorted.findIndex((p) => p.slug === post.slug);
  return {
    prev: idx < sorted.length - 1 ? sorted[idx + 1] : null,
    next: idx > 0 ? sorted[idx - 1] : null,
  };
}

export function paginatePosts(posts: BlogPost[], page: number, perPage = 9) {
  const start = (page - 1) * perPage;
  return {
    posts: posts.slice(start, start + perPage),
    totalPages: Math.max(1, Math.ceil(posts.length / perPage)),
    currentPage: page,
  };
}

export function calculateReadingTime(content: string): number {
  const text = content.replace(/<[^>]*>/g, "");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function extractToc(content: string): TocItem[] {
  const headingRegex = /<(h[2-3])(?:[^>]*)>(.*?)<\/\1>/gi;
  const items: TocItem[] = [];
  const idCount = new Map<string, number>();
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const text = match[2];
    const baseId = text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
    const count = idCount.get(baseId) ?? 0;
    idCount.set(baseId, count + 1);
    const id = count === 0 ? baseId : `${baseId}-${count + 1}`;
    items.push({ id, text, level: parseInt(match[1][1]) });
  }
  return items;
}

export function processContent(content: string): string {
  const idCount = new Map<string, number>();
  return content.replace(
    /<(h[2-3])([^>]*)>(.*?)<\/\1>/gi,
    (_match, tag, attrs, text) => {
      const baseId = text
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
      const count = idCount.get(baseId) ?? 0;
      idCount.set(baseId, count + 1);
      const id = count === 0 ? baseId : `${baseId}-${count + 1}`;
      return `<${tag}${attrs} id="${id}">${text}</${tag}>`;
    }
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
