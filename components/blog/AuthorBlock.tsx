import type { BlogAuthor } from "@/data/blog/types";

interface AuthorBlockProps {
  author: BlogAuthor;
  inline?: boolean;
}

export default function AuthorBlock({ author, inline }: AuthorBlockProps) {
  return (
    <div className={`flex items-center gap-3 ${inline ? "" : "rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"}`}>
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 text-sm font-semibold text-white shadow-sm">
        {author.name.charAt(0).toUpperCase()}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 truncate">
          {author.name}
        </p>
        {author.bio && (
          <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1">
            {author.bio}
          </p>
        )}
      </div>
    </div>
  );
}
