import Link from "next/link";

interface Crumb {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: Crumb[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && (
              <span aria-hidden="true" className="text-zinc-300 dark:text-zinc-600">
                /
              </span>
            )}
            {item.href ? (
              <Link
                href={item.href}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-zinc-800 dark:text-zinc-200 font-medium truncate max-w-[200px]">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
