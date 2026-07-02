import type { BlogPost } from "@/data/blog/types";
import BlogCard from "./BlogCard";

interface BlogGridProps {
  posts: BlogPost[];
  searchQuery?: string;
}

export default function BlogGrid({ posts, searchQuery }: BlogGridProps) {
  if (posts.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-zinc-200 bg-zinc-50 p-12 text-center dark:border-zinc-800 dark:bg-zinc-900">
        {searchQuery ? (
          <>
            <svg
              className="mx-auto h-10 w-10 text-zinc-300 dark:text-zinc-600 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <p className="text-zinc-500 dark:text-zinc-400 font-medium">
              No results found for &ldquo;{searchQuery}&rdquo;
            </p>
            <p className="mt-1 text-sm text-zinc-400 dark:text-zinc-500">
              Try a different search term or browse categories.
            </p>
          </>
        ) : (
          <>
            <svg
              className="mx-auto h-10 w-10 text-zinc-300 dark:text-zinc-600 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            <p className="text-zinc-500 dark:text-zinc-400 font-medium">
              No articles found.
            </p>
            <p className="mt-1 text-sm text-zinc-400 dark:text-zinc-500">
              Check back soon for new content.
            </p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
