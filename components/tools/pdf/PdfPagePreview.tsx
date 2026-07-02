"use client";

import { useEffect, useRef, useState } from "react";

interface PdfPagePreviewProps {
  file: File;
  pageNumber: number;
  selected?: boolean;
  onSelect?: (pageNumber: number) => void;
}

export default function PdfPagePreview({ file, pageNumber, selected, onSelect }: PdfPagePreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function render() {
      try {
        const { renderPdfToImages } = await import("@/lib/pdf/pdfRender");
        const pages = await renderPdfToImages(file, 0.4);
        if (cancelled) return;
        const page = pages[pageNumber - 1];
        if (!page || !canvasRef.current) {
          setError(true);
          return;
        }
        const bitmap = await createImageBitmap(page.blob);
        const ctx = canvasRef.current.getContext("2d")!;
        canvasRef.current.width = page.width;
        canvasRef.current.height = page.height;
        ctx.drawImage(bitmap, 0, 0);
        bitmap.close();
        setLoading(false);
      } catch {
        if (!cancelled) setError(true);
      }
    }
    render();
    return () => { cancelled = true; };
  }, [file, pageNumber]);

  return (
    <button
      type="button"
      onClick={() => onSelect?.(pageNumber)}
      className={`relative flex flex-col items-center gap-1 rounded-lg border-2 p-2 transition-all ${
        selected
          ? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-950/30"
          : "border-zinc-200 hover:border-zinc-300 dark:border-zinc-700 dark:hover:border-zinc-600"
      }`}
      aria-label={`Page ${pageNumber}${selected ? " (selected)" : ""}`}
      aria-pressed={selected}
    >
      <canvas ref={canvasRef} className="w-full h-auto rounded" />
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-50 dark:bg-zinc-900 rounded">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-300 border-t-blue-600" />
        </div>
      )}
      {error && (
        <div className="flex items-center justify-center h-24 text-xs text-zinc-400">
          Preview unavailable
        </div>
      )}
      <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
        {pageNumber}
      </span>
      {selected && (
        <span className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] text-white">
          ✓
        </span>
      )}
    </button>
  );
}
