"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { searchTools } from "@/data/tools";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ReturnType<typeof searchTools>>([]);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim()) {
      setResults(searchTools(value));
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  };

  return (
    <div ref={ref} className="relative w-full">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <svg className="h-4 w-4 text-zinc-400 dark:text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="text"
        placeholder="Search tools..."
        value={query}
        onChange={handleChange}
        onFocus={() => { if (results.length > 0) setIsOpen(true); }}
        className="block w-full rounded-lg border border-zinc-200 bg-zinc-50 py-1.5 pl-9 pr-4 text-sm text-zinc-900 placeholder-zinc-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-blue-500 dark:focus:bg-zinc-950 transition-all"
      />

      {isOpen && results.length > 0 && (
        <div className="absolute top-full mt-1 w-full rounded-lg border border-zinc-200 bg-white py-2 shadow-lg dark:border-zinc-800 dark:bg-zinc-900 z-50">
          {results.map((tool) => (
            <Link
              key={tool.id}
              href={`/tools/${tool.slug}`}
              onClick={() => { setIsOpen(false); setQuery(""); }}
              className="flex items-center gap-3 px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors"
            >
              <span className="text-base">{tool.icon}</span>
              <div>
                <span className="font-medium">{tool.title}</span>
                <span className="ml-2 text-xs text-zinc-400 capitalize">
                  {tool.category.replace("-", " & ")}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {isOpen && query.trim() && results.length === 0 && (
        <div className="absolute top-full mt-1 w-full rounded-lg border border-zinc-200 bg-white py-3 text-center text-sm text-zinc-500 shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 z-50">
          No tools found
        </div>
      )}
    </div>
  );
}
