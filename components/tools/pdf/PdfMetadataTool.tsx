"use client";

import { useState, useCallback } from "react";
import Container from "@/components/common/Container";
import ImageUploader from "@/components/tools/ImageUploader";
import ProcessingLoader from "@/components/tools/ProcessingLoader";
import { formatFileSize } from "@/lib/image/imageUtils";
import { extractPdfMetadata, formatDateString, type PdfMetadata } from "@/lib/pdf/pdfMetadata";
import ErrorAlert from "@/components/tools/ErrorAlert";
import FaqSection from "@/components/tools/FaqSection";
import { validatePdfFile } from "@/lib/pdf/pdfValidator";
import type { FaqItem } from "@/components/tools/FaqSection";

interface PdfMetadataToolProps {
  title: string;
  description: string;
  faqs: FaqItem[];
}

export default function PdfMetadataTool({ title, description, faqs }: PdfMetadataToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState<PdfMetadata | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = useCallback((f: File) => {
    setError(null);
    setMetadata(null);
    const validationError = validatePdfFile(f);
    if (validationError) {
      setError(validationError);
      return;
    }
    setFile(f);
  }, []);

  const handleExtract = useCallback(async () => {
    if (!file) return;
    setIsProcessing(true);
    setError(null);
    setMetadata(null);

    try {
      const result = await extractPdfMetadata(file);
      setMetadata(result);
    } catch {
      setError("Failed to extract metadata. The file may be corrupted or encrypted.");
    } finally {
      setIsProcessing(false);
    }
  }, [file]);

  const handleReset = useCallback(() => {
    setFile(null);
    setMetadata(null);
    setError(null);
  }, []);

  return (
    <Container className="py-12">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          {title}
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          {description}
        </p>
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
                    {formatFileSize(file.size)}
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

            {!metadata && (
              <button
                onClick={handleExtract}
                disabled={isProcessing}
                className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
              >
                {isProcessing ? "Extracting..." : "Extract Metadata"}
              </button>
            )}
          </>
        )}
      </div>

      {isProcessing && (
        <div className="mt-6">
          <ProcessingLoader />
        </div>
      )}

      {metadata && !isProcessing && (
        <div className="mt-6 rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="mb-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            PDF Metadata
          </h3>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2 text-xs">
              <span className="font-medium text-zinc-500 dark:text-zinc-400">File Size</span>
              <span className="col-span-2 text-zinc-900 dark:text-zinc-100">{formatFileSize(metadata.fileSize)}</span>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <span className="font-medium text-zinc-500 dark:text-zinc-400">Pages</span>
              <span className="col-span-2 text-zinc-900 dark:text-zinc-100">{metadata.pageCount ?? "Unknown"}</span>
            </div>
            {[
              { label: "Title", value: metadata.title },
              { label: "Author", value: metadata.author },
              { label: "Subject", value: metadata.subject },
              { label: "Keywords", value: metadata.keywords },
              { label: "Creator", value: metadata.creator },
              { label: "Producer", value: metadata.producer },
              { label: "Created", value: formatDateString(metadata.creationDate) },
              { label: "Modified", value: formatDateString(metadata.modDate) },
            ].map(({ label, value }) => (
              <div key={label} className="grid grid-cols-3 gap-2 text-xs">
                <span className="font-medium text-zinc-500 dark:text-zinc-400">{label}</span>
                <span className="col-span-2 text-zinc-900 dark:text-zinc-100 break-words">
                  {value ?? <span className="italic text-zinc-400">Not available</span>}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <FaqSection faqs={faqs} />
    </Container>
  );
}
