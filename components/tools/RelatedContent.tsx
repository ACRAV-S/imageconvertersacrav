"use client";

import Link from "next/link";
import {
  getRelatedToolsForTool,
  getRelatedPostsForTool,
} from "@/lib/internal-linking";
import type { Tool } from "@/types/tool";

interface RelatedContentProps {
  tool: Tool;
}

export default function RelatedContent({ tool }: RelatedContentProps) {
  const relatedTools = getRelatedToolsForTool(tool, 4);
  const relatedPosts = getRelatedPostsForTool(tool, 4);

  if (relatedTools.length === 0 && relatedPosts.length === 0) {
    return null;
  }

  return (
    <>
      {relatedTools.length > 0 && (
        <section className="mt-12 border-t border-zinc-200 pt-12 dark:border-zinc-800">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6">
            Related Tools
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {relatedTools.map((rt) => (
              <Link
                key={rt.slug}
                href={`/tools/${rt.slug}`}
                className="group flex items-center gap-3 rounded-xl border border-zinc-200 bg-white p-4 hover:border-blue-200 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-blue-800 transition-all"
              >
                <span className="text-2xl" aria-hidden="true">{rt.icon}</span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-zinc-900 group-hover:text-blue-600 dark:text-zinc-50 dark:group-hover:text-blue-400 transition-colors truncate">
                    {rt.title}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1">
                    {rt.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {relatedPosts.length > 0 && (
        <section className="mt-12 border-t border-zinc-200 pt-12 dark:border-zinc-800">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6">
            Related Articles
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {relatedPosts.map((rp) => (
              <Link
                key={rp.slug}
                href={`/blog/${rp.slug}`}
                className="group rounded-xl border border-zinc-200 bg-white p-5 hover:border-blue-200 hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-blue-800 transition-all"
              >
                <p className="text-sm font-semibold text-zinc-900 group-hover:text-blue-600 dark:text-zinc-50 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                  {rp.title}
                </p>
                <p className="mt-1.5 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
                  {rp.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
