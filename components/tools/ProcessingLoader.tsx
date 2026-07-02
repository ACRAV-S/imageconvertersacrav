"use client";

interface ProcessingLoaderProps {
  message?: string;
}

export default function ProcessingLoader({ message = "Processing..." }: ProcessingLoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-zinc-200 bg-white p-12 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-300 border-t-blue-600 dark:border-zinc-600 dark:border-t-blue-500" />
      <p className="text-sm text-zinc-500 dark:text-zinc-400">{message}</p>
    </div>
  );
}
