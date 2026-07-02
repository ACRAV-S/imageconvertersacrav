import type { BlogPost } from "@/data/blog/types";
import BlogCard from "./BlogCard";

interface RelatedArticlesProps {
  posts: BlogPost[];
}

export default function RelatedArticles({ posts }: RelatedArticlesProps) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-6">
        Related Articles
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
