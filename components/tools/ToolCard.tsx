import Link from "next/link";
import type { Tool } from "@/types/tool";

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group flex flex-col items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-5 text-center shadow-sm transition-all hover:shadow-md hover:border-blue-200 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-blue-800"
    >
      <span className="text-2xl">{tool.icon}</span>
      <span className="text-sm font-semibold text-zinc-900 dark:text-zinc-50 group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors">
        {tool.title}
      </span>
      <span className="text-xs capitalize text-zinc-400 dark:text-zinc-500">
        {tool.category.replace("-", " & ")}
      </span>
    </Link>
  );
}
