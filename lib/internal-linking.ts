import type { BlogPost } from "@/data/blog/types";
import type { Tool } from "@/types/tool";
import { getSortedPosts } from "@/data/blog/utils";
import { tools } from "@/data";

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/<[^>]*>/g, "")
    .split(/[\s,;:.!?()\[\]{}"']+/)
    .filter((t) => t.length > 2);
}

function scoreSimilarity(a: string[], b: string[]): number {
  const setB = new Set(b);
  let matches = 0;
  for (const word of a) {
    if (setB.has(word)) matches++;
  }
  return matches / Math.max(a.length, b.length);
}

function buildText(post: BlogPost): string {
  return `${post.title} ${post.description} ${post.tags.join(" ")}`;
}

function buildToolText(tool: Tool): string {
  return `${tool.title} ${tool.description} ${tool.keywords.join(" ")}`;
}

export function getRelatedPostsImproved(
  post: BlogPost,
  limit = 6,
): BlogPost[] {
  const candidates = getSortedPosts().filter((p) => p.slug !== post.slug);
  if (candidates.length === 0) return [];

  const postTokens = tokenize(buildText(post));
  const scored = candidates
    .map((p) => {
      let score = 0;

      const sharedCategories = p.categories.filter((c) =>
        post.categories.includes(c),
      ).length;
      score += sharedCategories * 3;

      const sharedTags = p.tags.filter((t) =>
        post.tags.includes(t),
      ).length;
      score += sharedTags * 2;

      const sim = scoreSimilarity(postTokens, tokenize(buildText(p)));
      score += sim * 5;

      return { post: p, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  const minResults = Math.min(limit, scored.length);
  const top = scored.slice(0, Math.max(minResults, 4));

  if (top.length < 4 && candidates.length > top.length) {
    const used = new Set(top.map((t) => t.post.slug));
    used.add(post.slug);
    const fillers = candidates
      .filter((p) => !used.has(p.slug))
      .slice(0, 4 - top.length);
    for (const f of fillers) {
      top.push({ post: f, score: 0 });
    }
  }

  return top.slice(0, limit).map((s) => s.post);
}

export function getRelatedToolsImproved(
  post: BlogPost,
  limit = 6,
): Tool[] {
  const postTokens = tokenize(buildText(post));
  const scored = tools
    .map((tool) => {
      const toolTokens = tokenize(buildToolText(tool));
      let score = scoreSimilarity(postTokens, toolTokens) * 3;

      const toolCategoryWords = tool.category.replace("-", " ").toLowerCase();
      if (postTokens.some((t) => toolCategoryWords.includes(t))) {
        score += 1;
      }

      return { tool, score };
    })
    .filter((s) => s.score > 0.1)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((s) => s.tool);
}

export function getRelatedToolsForTool(
  tool: Tool,
  limit = 4,
): Tool[] {
  const sameCategory = tools.filter(
    (t) => t.slug !== tool.slug && t.category === tool.category,
  );

  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }

  const toolTokens = tokenize(buildToolText(tool));
  const otherTools = tools
    .filter((t) => t.slug !== tool.slug && t.category !== tool.category)
    .map((t) => ({
      tool: t,
      score: scoreSimilarity(toolTokens, tokenize(buildToolText(t))),
    }))
    .filter((t) => t.score > 0.05)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit - sameCategory.length)
    .map((s) => s.tool);

  return [...sameCategory, ...otherTools].slice(0, limit);
}

export function getRelatedPostsForTool(
  tool: Tool,
  limit = 4,
): BlogPost[] {
  const toolTokens = tokenize(buildToolText(tool));
  const scored = getSortedPosts()
    .map((post) => {
      const postTokens = tokenize(buildText(post));
      let score = scoreSimilarity(toolTokens, postTokens) * 4;

      const toolCategory = tool.category.replace("-", " ");
      const postText = buildText(post).toLowerCase();
      if (postText.includes(toolCategory)) score += 1;

      return { post, score };
    })
    .filter((s) => s.score > 0.1)
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((s) => s.post);
}
