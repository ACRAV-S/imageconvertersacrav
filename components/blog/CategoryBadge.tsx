import Link from "next/link";

interface CategoryBadgeProps {
  name: string;
  size?: "sm" | "md";
}

export default function CategoryBadge({ name, size = "sm" }: CategoryBadgeProps) {
  return (
    <Link
      href={`/blog/category/${name.toLowerCase().replace(/\s+/g, "-")}`}
      className={`font-semibold text-blue-600 bg-blue-50 rounded-full hover:bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 transition-colors ${
        size === "sm"
          ? "text-xs px-3 py-1"
          : "text-sm px-4 py-1.5"
      }`}
    >
      {name}
    </Link>
  );
}
