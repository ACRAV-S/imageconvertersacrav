"use client";

import { useState, useCallback } from "react";
import Container from "@/components/common/Container";
import ImageUploader from "@/components/tools/ImageUploader";
import DownloadButton from "@/components/tools/DownloadButton";
import ProcessingLoader from "@/components/tools/ProcessingLoader";
import PdfPageSelector from "./PdfPageSelector";
import { formatFileSize } from "@/lib/image/imageUtils";
import { deletePdfPages } from "@/lib/pdf/pdfActions";
import ErrorAlert from "@/components/tools/ErrorAlert";
import FaqSection from "@/components/tools/FaqSection";
import { validatePdfFile } from "@/lib/pdf/pdfValidator";
import type { FaqItem } from "@/components/tools/FaqSection";

interface PdfDeletePagesToolProps {
  title: string;
  description: string;
  faqs: FaqItem[];
}

export default function PdfDeletePagesTool({ title, description, faqs }: PdfDeletePagesToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [selectedPages, setSelectedPages] = useState<number[]>([]);
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
      setPageCount(doc.getPageCount());
      setSelectedPages([]);
    } catch {
      setError("Could not read the PDF file.");
    }
  }, []);

  const handleDelete = useCallback(async () => {
    if (!file || selectedPages.length === 0) return;
    setIsProcessing(true);
    setError(null);
    try {
      const blob = await deletePdfPages(file, selectedPages.map((p) => p - 1));
      setResultBlob(blob);
    } catch {
      setError("Delete failed.");
    } finally {
      setIsProcessing(false);
    }
  }, [file, selectedPages]);

  const handleReset = useCallback(() => {
    setFile(null);
    setResultBlob(null);
    setError(null);
    setPageCount(0);
    setSelectedPages([]);
  }, []);

  const pagesAfterDelete = pageCount - selectedPages.length;

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
              <div className="space-y-6">
                {pagesAfterDelete > 0 ? (
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Select pages to delete. <strong>{pagesAfterDelete}</strong> page{pagesAfterDelete !== 1 ? "s" : ""} will remain.
                  </p>
                ) : (
                  <p className="text-sm text-amber-600 dark:text-amber-400">All pages selected. At least one page must remain.</p>
                )}

                <PdfPageSelector
                  file={file}
                  pageCount={pageCount}
                  selectedPages={selectedPages}
                  onSelectionChange={setSelectedPages}
                />

                <button
                  onClick={handleDelete}
                  disabled={selectedPages.length === 0 || pagesAfterDelete === 0 || isProcessing}
                  className="rounded-lg bg-red-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                >
                  {isProcessing ? "Deleting..." : `Delete ${selectedPages.length} page${selectedPages.length > 1 ? "s" : ""}`}
                </button>
              </div>
            )}
          </>
        )}

        {isProcessing && <ProcessingLoader message="Deleting pages..." />}

        {resultBlob && !isProcessing && (
          <div className="space-y-4">
            <div className="rounded-xl border border-green-200 bg-green-50 p-6 dark:border-green-800 dark:bg-green-950/30">
              <p className="text-sm font-medium text-green-800 dark:text-green-300">Pages deleted!</p>
              <p className="mt-1 text-sm text-green-700 dark:text-green-400">{formatFileSize(resultBlob.size)} &middot; {pagesAfterDelete} pages remaining</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <DownloadButton blob={resultBlob} filename="trimmed.pdf" />
              <button onClick={handleReset} className="rounded-lg border border-zinc-200 bg-white px-6 py-2.5 text-sm font-semibold text-zinc-600 shadow-sm hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors">Start Over</button>
            </div>
          </div>
        )}
      </div>

      <FaqSection faqs={faqs} />
    </Container>
  );
}
