import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  searchParams: Record<string, string>;
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
  searchParams,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const buildHref = (page: number) => {
    const params = new URLSearchParams(searchParams);
    if (page > 1) {
      params.set("page", String(page));
    } else {
      params.delete("page");
    }
    const qs = params.toString();
    return qs ? `${basePath}?${qs}` : basePath;
  };

  const pages: (number | "...")[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 1) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-1.5 mt-12">
      {currentPage > 1 ? (
        <Link
          href={buildHref(currentPage - 1)}
          className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/></svg>
          Prev
        </Link>
      ) : (
        <span className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-zinc-300 dark:text-zinc-600 cursor-not-allowed">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/></svg>
          Prev
        </span>
      )}

      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`ellipsis-${i}`} className="px-2 py-2 text-sm text-zinc-400 dark:text-zinc-600">
            ...
          </span>
        ) : (
          <Link
            key={p}
            href={buildHref(p)}
            className={`rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
              p === currentPage
                ? "bg-blue-600 text-white shadow-sm"
                : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
            }`}
          >
            {p}
          </Link>
        )
      )}

      {currentPage < totalPages ? (
        <Link
          href={buildHref(currentPage + 1)}
          className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors"
        >
          Next
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg>
        </Link>
      ) : (
        <span className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-zinc-300 dark:text-zinc-600 cursor-not-allowed">
          Next
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/></svg>
        </span>
      )}
    </nav>
  );
}
