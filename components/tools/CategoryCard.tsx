import Link from "next/link";
import type { ToolCategoryMeta, Tool } from "@/types/tool";
import { getToolsByCategory } from "@/data";

interface CategoryCardProps {
  category: ToolCategoryMeta;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const tools = getToolsByCategory(category.id);

  return (
    <Link
      href={`/tools?category=${category.id}`}
      className="group relative rounded-xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
    >
      <div className={`h-1.5 w-12 rounded-full bg-gradient-to-r ${category.gradient}`} aria-hidden="true" />
      <h3 className="mt-4 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
        {category.title}
      </h3>
      <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
        {category.description}
      </p>
      {tools.length > 0 && (
        <ul className="mt-4 space-y-1.5">
          {tools.map((tool: Tool) => (
            <li key={tool.id} className="text-sm text-zinc-400 dark:text-zinc-500 flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-600" />
              {tool.title}
            </li>
          ))}
        </ul>
      )}
    </Link>
  );
}
