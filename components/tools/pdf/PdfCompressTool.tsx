"use client";

import { useState, useCallback } from "react";
import Container from "@/components/common/Container";
import ImageUploader from "@/components/tools/ImageUploader";
import DownloadButton from "@/components/tools/DownloadButton";
import ProcessingLoader from "@/components/tools/ProcessingLoader";
import { formatFileSize } from "@/lib/image/imageUtils";
import { compressPdf } from "@/lib/pdf/pdfActions";
import ErrorAlert from "@/components/tools/ErrorAlert";
import FaqSection from "@/components/tools/FaqSection";
import { validatePdfFile } from "@/lib/pdf/pdfValidator";
import type { FaqItem } from "@/components/tools/FaqSection";

interface PdfCompressToolProps {
  title: string;
  description: string;
  faqs: FaqItem[];
}

export default function PdfCompressTool({ title, description, faqs }: PdfCompressToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = useCallback((f: File) => {
    setError(null);
    const validationError = validatePdfFile(f);
    if (validationError) {
      setError(validationError);
      return;
    }
    setFile(f);
    setResultBlob(null);
  }, []);

  const handleCompress = useCallback(async () => {
    if (!file) return;
    setIsProcessing(true);
    setError(null);
    try {
      const blob = await compressPdf(file);
      setResultBlob(blob);
    } catch {
      setError("Compression failed. The file may be encrypted.");
    } finally {
      setIsProcessing(false);
    }
  }, [file]);

  const handleReset = useCallback(() => {
    setFile(null);
    setResultBlob(null);
    setError(null);
  }, []);

  const originalSize = file?.size ?? 0;
  const compressedSize = resultBlob?.size ?? 0;
  const savings = originalSize > 0 ? ((1 - compressedSize / originalSize) * 100).toFixed(1) : "0";

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
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{formatFileSize(file.size)}</p>
                </div>
                <button onClick={handleReset} className="text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors">Change file</button>
              </div>
            </div>

            {resultBlob && !isProcessing && (
              <div className="rounded-xl border border-green-200 bg-green-50 p-6 dark:border-green-800 dark:bg-green-950/30">
                <p className="text-sm font-medium text-green-800 dark:text-green-300">Compressed!</p>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-green-700 dark:text-green-400">Original</span>
                    <span className="text-green-800 dark:text-green-300 font-medium">{formatFileSize(originalSize)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-green-700 dark:text-green-400">Compressed</span>
                    <span className="text-green-800 dark:text-green-300 font-medium">{formatFileSize(compressedSize)}</span>
                  </div>
                  <div className="pt-2 border-t border-green-200 dark:border-green-800">
                    <div className="flex items-center justify-between text-sm font-semibold">
                      <span className="text-green-800 dark:text-green-300">Saved</span>
                      <span className="text-green-800 dark:text-green-300">{savings}% ({formatFileSize(originalSize - compressedSize)})</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              {!resultBlob && !isProcessing && (
                <button
                  onClick={handleCompress}
                  disabled={isProcessing}
                  className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                >
                  {isProcessing ? "Compressing..." : "Compress PDF"}
                </button>
              )}
              {resultBlob && (
                <>
                  <DownloadButton blob={resultBlob} filename="compressed.pdf" />
                  <button onClick={handleReset} className="rounded-lg border border-zinc-200 bg-white px-6 py-2.5 text-sm font-semibold text-zinc-600 shadow-sm hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors">Start Over</button>
                </>
              )}
            </div>
          </>
        )}

        {isProcessing && <ProcessingLoader message="Compressing PDF..." />}
      </div>

      <FaqSection faqs={faqs} />
    </Container>
  );
}
