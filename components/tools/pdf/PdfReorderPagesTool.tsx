"use client";

import { useState, useCallback } from "react";
import Container from "@/components/common/Container";
import ImageUploader from "@/components/tools/ImageUploader";
import DownloadButton from "@/components/tools/DownloadButton";
import ProcessingLoader from "@/components/tools/ProcessingLoader";
import { formatFileSize } from "@/lib/image/imageUtils";
import { reorderPdfPages } from "@/lib/pdf/pdfActions";
import ErrorAlert from "@/components/tools/ErrorAlert";
import FaqSection from "@/components/tools/FaqSection";
import { validatePdfFile } from "@/lib/pdf/pdfValidator";
import type { FaqItem } from "@/components/tools/FaqSection";

interface PdfReorderPagesToolProps {
  title: string;
  description: string;
  faqs: FaqItem[];
}

export default function PdfReorderPagesTool({ title, description, faqs }: PdfReorderPagesToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [order, setOrder] = useState<number[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = useCallback(async (f: File) => {
    setError(null);
    const validationError = validatePdfFile(f);
    if (validationError) {
      setError(validationError);
      return;
    }
    setFile(f);
    setResultBlob(null);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const buffer = await f.arrayBuffer();
      const doc = await PDFDocument.load(buffer, { ignoreEncryption: true });
      const count = doc.getPageCount();
      setPageCount(count);
      setOrder(Array.from({ length: count }, (_, i) => i + 1));
    } catch {
      setError("Could not read the PDF file.");
    }
  }, []);

  const movePage = useCallback((index: number, direction: -1 | 1) => {
    setOrder((prev) => {
      const next = [...prev];
      const target = index + direction;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }, []);

  const handleReorder = useCallback(async () => {
    if (!file) return;
    const isSame = order.every((p, i) => p === i + 1);
    if (isSame) {
      setError("The page order is unchanged. Drag items to reorder.");
      return;
    }
    setIsProcessing(true);
    setError(null);
    try {
      const blob = await reorderPdfPages(file, order.map((p) => p - 1));
      setResultBlob(blob);
    } catch {
      setError("Reorder failed.");
    } finally {
      setIsProcessing(false);
    }
  }, [file, order]);

  const handleReset = useCallback(() => {
    setFile(null);
    setResultBlob(null);
    setError(null);
    setPageCount(0);
    setOrder([]);
  }, []);

  return (
    <Container className="py-12">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">{title}</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">{description}</p>
      </div>

      <ErrorAlert error={error} />

      <div className="mt-8 space-y-6">
        {!file ? (
          <ImageUploader onUpload={handleUpload} accept="application/pdf" description="PDF files" />
        ) : (
          <>
            <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate max-w-md">{file.name}</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{formatFileSize(file.size)} &middot; {pageCount} pages</p>
                </div>
                <button onClick={handleReset} className="text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors">Change file</button>
              </div>
            </div>

            {!resultBlob && !isProcessing && (
              <div className="space-y-4">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  Rearrange pages using the up/down buttons. Current order:
                </p>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {order.map((pageNum, i) => (
                    <div
                      key={pageNum}
                      className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-7 w-7 items-center justify-center rounded bg-zinc-100 text-xs font-semibold text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                          {i + 1}
                        </span>
                        <span className="text-sm text-zinc-900 dark:text-zinc-100">Page {pageNum}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => movePage(i, -1)}
                          disabled={i === 0}
                          className="p-1 text-zinc-400 hover:text-zinc-600 disabled:opacity-30 transition-colors"
                          aria-label="Move up"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" /></svg>
                        </button>
                        <button
                          type="button"
                          onClick={() => movePage(i, 1)}
                          disabled={i === order.length - 1}
                          className="p-1 text-zinc-400 hover:text-zinc-600 disabled:opacity-30 transition-colors"
                          aria-label="Move down"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleReorder}
                  disabled={isProcessing}
                  className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                >
                  {isProcessing ? "Reordering..." : "Apply New Order"}
                </button>
              </div>
            )}
          </>
        )}

        {isProcessing && <ProcessingLoader message="Reordering pages..." />}

        {resultBlob && !isProcessing && (
          <div className="space-y-4">
            <div className="rounded-xl border border-green-200 bg-green-50 p-6 dark:border-green-800 dark:bg-green-950/30">
              <p className="text-sm font-medium text-green-800 dark:text-green-300">Reordered!</p>
              <p className="mt-1 text-sm text-green-700 dark:text-green-400">{formatFileSize(resultBlob.size)}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <DownloadButton blob={resultBlob} filename="reordered.pdf" />
              <button onClick={handleReset} className="rounded-lg border border-zinc-200 bg-white px-6 py-2.5 text-sm font-semibold text-zinc-600 shadow-sm hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors">Start Over</button>
            </div>
          </div>
        )}
      </div>

      <FaqSection faqs={faqs} />
    </Container>
  );
}
