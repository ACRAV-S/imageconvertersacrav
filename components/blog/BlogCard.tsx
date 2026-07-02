import Link from "next/link";
import type { BlogPost } from "@/data/blog/types";

interface BlogCardProps {
  post: BlogPost;
}

const categoryGradients: Record<string, string> = {
  "Image Formats": "from-blue-500 to-cyan-500",
  "Web Development": "from-purple-500 to-pink-500",
  "PDF Tools": "from-red-500 to-orange-500",
  "Developer Tools": "from-emerald-500 to-teal-500",
  "SEO": "from-amber-500 to-yellow-500",
};

function getCategoryGradient(categories: string[]): string {
  for (const cat of categories) {
    if (categoryGradients[cat]) return categoryGradients[cat];
  }
  return "from-zinc-400 to-zinc-500";
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col rounded-xl border border-zinc-200 bg-white shadow-sm transition-all hover:shadow-lg hover:-translate-y-0.5 hover:border-blue-200 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-blue-800 duration-200"
    >
      <div className={`h-36 bg-gradient-to-br rounded-t-xl ${getCategoryGradient(post.categories)} flex items-center justify-center`}>
        <span className="text-white/90 text-4xl font-bold tracking-tight select-none">
          {post.title.charAt(0)}
        </span>
      </div>
      <div className="flex-1 p-5">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {post.categories.map((cat) => (
            <span
              key={cat}
              className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full dark:text-blue-400 dark:bg-blue-900/30"
            >
              {cat}
            </span>
          ))}
        </div>
        <h3 className="text-base font-semibold text-zinc-900 group-hover:text-blue-600 dark:text-zinc-50 dark:group-hover:text-blue-400 transition-colors leading-snug">
          {post.title}
        </h3>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
          {post.description}
        </p>
      </div>
      <div className="flex items-center justify-between border-t border-zinc-100 px-5 py-3 dark:border-zinc-800">
        <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-500">
          <span>{new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}</span>
          <span aria-hidden="true">&middot;</span>
          <span>{post.readingTime} min read</span>
        </div>
        <span className="text-xs font-medium text-blue-600 group-hover:text-blue-500 dark:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
          Read &rarr;
        </span>
      </div>
    </Link>
  );
}
