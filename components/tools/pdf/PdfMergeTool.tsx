"use client";

import { useState, useCallback } from "react";
import Container from "@/components/common/Container";
import ImageUploader from "@/components/tools/ImageUploader";
import DownloadButton from "@/components/tools/DownloadButton";
import ProcessingLoader from "@/components/tools/ProcessingLoader";
import { formatFileSize } from "@/lib/image/imageUtils";
import { mergePdfs } from "@/lib/pdf/pdfActions";
import ErrorAlert from "@/components/tools/ErrorAlert";
import FaqSection from "@/components/tools/FaqSection";
import type { FaqItem } from "@/components/tools/FaqSection";

interface PdfMergeToolProps {
  title: string;
  description: string;
  faqs: FaqItem[];
}

export default function PdfMergeTool({ title, description, faqs }: PdfMergeToolProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = useCallback((file: File) => {
    setError(null);
    if (file.type !== "application/pdf") {
      setError("Please upload a PDF file.");
      return;
    }
    setFiles((prev) => [...prev, file]);
  }, []);

  const removeFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const moveFile = useCallback((index: number, direction: -1 | 1) => {
    setFiles((prev) => {
      const next = [...prev];
      const target = index + direction;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }, []);

  const handleMerge = useCallback(async () => {
    if (files.length < 2) return;
    setIsProcessing(true);
    setError(null);
    setResultBlob(null);
    try {
      const blob = await mergePdfs(files);
      setResultBlob(blob);
    } catch {
      setError("Merge failed. The files may be corrupted or encrypted.");
    } finally {
      setIsProcessing(false);
    }
  }, [files]);

  const handleReset = useCallback(() => {
    setFiles([]);
    setResultBlob(null);
    setError(null);
  }, []);

  return (
    <Container className="py-12">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          {title}
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">{description}</p>
      </div>

      <ErrorAlert error={error} />

      <div className="mt-8 space-y-6">
        {!resultBlob && (
          <ImageUploader
            onUpload={handleUpload}
            accept="application/pdf"
            description="PDF files (upload multiple)"
          />
        )}

        {files.length > 0 && !resultBlob && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              Files ({files.length})
            </h3>
            {files.map((f, i) => (
              <div
                key={`${f.name}-${i}`}
                className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
                    {i + 1}. {f.name}
                  </p>
                  <p className="text-xs text-zinc-500">{formatFileSize(f.size)}</p>
                </div>
                <div className="flex items-center gap-1 ml-4">
                  <button
                    type="button"
                    onClick={() => moveFile(i, -1)}
                    disabled={i === 0}
                    className="p-1 text-zinc-400 hover:text-zinc-600 disabled:opacity-30 transition-colors"
                    aria-label="Move up"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" /></svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => moveFile(i, 1)}
                    disabled={i === files.length - 1}
                    className="p-1 text-zinc-400 hover:text-zinc-600 disabled:opacity-30 transition-colors"
                    aria-label="Move down"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => removeFile(i)}
                    className="p-1 text-red-400 hover:text-red-600 transition-colors"
                    aria-label={`Remove ${f.name}`}
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              </div>
            ))}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="button"
                onClick={handleMerge}
                disabled={files.length < 2 || isProcessing}
                className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
              >
                {isProcessing ? "Merging..." : `Merge ${files.length} PDFs`}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="rounded-lg border border-zinc-200 bg-white px-6 py-2.5 text-sm font-semibold text-zinc-600 shadow-sm hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors"
              >
                Start Over
              </button>
            </div>
          </div>
        )}

        {isProcessing && <ProcessingLoader message="Merging PDFs..." />}

        {resultBlob && !isProcessing && (
          <div className="space-y-4">
            <div className="rounded-xl border border-green-200 bg-green-50 p-6 dark:border-green-800 dark:bg-green-950/30">
              <p className="text-sm font-medium text-green-800 dark:text-green-300">
                PDFs merged successfully!
              </p>
              <p className="mt-1 text-sm text-green-700 dark:text-green-400">
                {files.length} files combined &middot; {formatFileSize(resultBlob.size)}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <DownloadButton blob={resultBlob} filename="merged.pdf" />
              <button
                type="button"
                onClick={handleReset}
                className="rounded-lg border border-zinc-200 bg-white px-6 py-2.5 text-sm font-semibold text-zinc-600 shadow-sm hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors"
              >
                Start Over
              </button>
            </div>
          </div>
        )}
      </div>

      <FaqSection faqs={faqs} />
    </Container>
  );
}
