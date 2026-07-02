"use client";

import { useState, useCallback } from "react";
import Container from "@/components/common/Container";
import ImageUploader from "@/components/tools/ImageUploader";
import DownloadButton from "@/components/tools/DownloadButton";
import ProcessingLoader from "@/components/tools/ProcessingLoader";
import { formatFileSize } from "@/lib/image/imageUtils";
import { splitPdf } from "@/lib/pdf/pdfActions";
import ErrorAlert from "@/components/tools/ErrorAlert";
import FaqSection from "@/components/tools/FaqSection";
import { validatePdfFile } from "@/lib/pdf/pdfValidator";
import type { FaqItem } from "@/components/tools/FaqSection";

interface PdfSplitToolProps {
  title: string;
  description: string;
  faqs: FaqItem[];
}

export default function PdfSplitTool({ title, description, faqs }: PdfSplitToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultBlobs, setResultBlobs] = useState<Blob[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [mode, setMode] = useState<"all" | "range">("all");
  const [rangeInput, setRangeInput] = useState("");
  const [downloadIndex, setDownloadIndex] = useState<number | null>(null);

  const handleUpload = useCallback(async (f: File) => {
    setError(null);
    const validationError = validatePdfFile(f);
    if (validationError) {
      setError(validationError);
      return;
    }
    setFile(f);
    setResultBlobs([]);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const buffer = await f.arrayBuffer();
      const doc = await PDFDocument.load(buffer, { ignoreEncryption: true });
      setPageCount(doc.getPageCount());
    } catch {
      setError("Could not read the PDF file. It may be corrupted.");
    }
  }, []);

  const handleSplit = useCallback(async () => {
    if (!file) return;
    setIsProcessing(true);
    setError(null);
    setResultBlobs([]);

    try {
      if (mode === "all") {
        const blobs = await splitPdf(file);
        setResultBlobs(blobs);
      } else {
        const ranges = rangeInput
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
        const pages: number[] = [];
        for (const r of ranges) {
          const m = r.match(/^(\d+)(?:-(\d+))?$/);
          if (m) {
            const start = parseInt(m[1]);
            const end = m[2] ? parseInt(m[2]) : start;
            for (let i = start; i <= end; i++) pages.push(i);
          }
        }
        if (pages.length === 0) {
          setError("Invalid page range. Use format: 1,3,5-7");
          setIsProcessing(false);
          return;
        }
        const { extractPdfPages } = await import("@/lib/pdf/pdfActions");
        const blob = await extractPdfPages(file, pages.map((p) => p - 1));
        setResultBlobs([blob]);
      }
    } catch {
      setError("Split failed. The file may be corrupted or encrypted.");
    } finally {
      setIsProcessing(false);
    }
  }, [file, mode, rangeInput]);

  const downloadAll = useCallback(() => {
    if (resultBlobs.length === 0) return;
    for (let i = 0; i < resultBlobs.length; i++) {
      const url = URL.createObjectURL(resultBlobs[i]);
      const a = document.createElement("a");
      a.href = url;
      const name = file?.name.replace(/\.pdf$/i, "") || "document";
      a.download = resultBlobs.length > 1 ? `${name}_page_${i + 1}.pdf` : `${name}_extracted.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }, [resultBlobs, file]);

  const handleReset = useCallback(() => {
    setFile(null);
    setResultBlobs([]);
    setError(null);
    setPageCount(0);
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
        {!file ? (
          <ImageUploader onUpload={handleUpload} accept="application/pdf" description="PDF files" />
        ) : (
          <>
            <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate max-w-md">
                    {file.name}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    {formatFileSize(file.size)} &middot; {pageCount} pages
                  </p>
                </div>
                <button
                  onClick={handleReset}
                  className="text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
                >
                  Change file
                </button>
              </div>
            </div>

            {resultBlobs.length === 0 && !isProcessing && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="splitMode"
                      checked={mode === "all"}
                      onChange={() => setMode("all")}
                      className="text-blue-600"
                    />
                    <span className="text-sm text-zinc-700 dark:text-zinc-300">Extract every page</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="splitMode"
                      checked={mode === "range"}
                      onChange={() => setMode("range")}
                      className="text-blue-600"
                    />
                    <span className="text-sm text-zinc-700 dark:text-zinc-300">Custom page range</span>
                  </label>
                </div>

                {mode === "range" && (
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                      Page ranges (e.g., 1-3, 5, 7-9)
                    </label>
                    <input
                      type="text"
                      value={rangeInput}
                      onChange={(e) => setRangeInput(e.target.value)}
                      placeholder="1-3, 5, 7-9"
                      className="w-full max-w-sm rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 transition-colors"
                    />
                  </div>
                )}

                <button
                  onClick={handleSplit}
                  disabled={isProcessing}
                  className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                >
                  {isProcessing ? "Splitting..." : "Split PDF"}
                </button>
              </div>
            )}
          </>
        )}

        {isProcessing && <ProcessingLoader message="Splitting PDF..." />}

        {resultBlobs.length > 0 && !isProcessing && (
          <div className="space-y-4">
            <div className="rounded-xl border border-green-200 bg-green-50 p-6 dark:border-green-800 dark:bg-green-950/30">
              <p className="text-sm font-medium text-green-800 dark:text-green-300">
                Split complete!
              </p>
              <p className="mt-1 text-sm text-green-700 dark:text-green-400">
                {resultBlobs.length} file{resultBlobs.length > 1 ? "s" : ""} created
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {resultBlobs.length === 1 ? (
                <DownloadButton blob={resultBlobs[0]} filename="extracted.pdf" />
              ) : (
                <button
                  onClick={downloadAll}
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
                  Download All ({resultBlobs.length} files)
                </button>
              )}
              {resultBlobs.length > 1 && (
                <div className="max-h-48 overflow-y-auto w-full space-y-2">
                  {resultBlobs.map((blob, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = `page_${i + 1}.pdf`;
                        a.click();
                        URL.revokeObjectURL(url);
                      }}
                      className="text-xs text-blue-600 hover:text-blue-500 dark:text-blue-400 block"
                    >
                      Download page {i + 1} ({formatFileSize(blob.size)})
                    </button>
                  ))}
                </div>
              )}
              <button
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
