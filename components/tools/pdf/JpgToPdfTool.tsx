"use client";

import { useState, useCallback } from "react";
import Container from "@/components/common/Container";
import ImageUploader from "@/components/tools/ImageUploader";
import ImagePreview from "@/components/tools/ImagePreview";
import DownloadButton from "@/components/tools/DownloadButton";
import ProcessingLoader from "@/components/tools/ProcessingLoader";
import { formatFileSize } from "@/lib/image/imageUtils";
import { convertJpegToPdf } from "@/lib/pdf/pdfBuilder";
import ErrorAlert from "@/components/tools/ErrorAlert";
import FaqSection from "@/components/tools/FaqSection";
import type { FaqItem } from "@/components/tools/FaqSection";

interface JpgToPdfToolProps {
  title: string;
  description: string;
  faqs: FaqItem[];
}

export default function JpgToPdfTool({ title, description, faqs }: JpgToPdfToolProps) {
  const [files, setFiles] = useState<{ file: File; url: string }[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = useCallback((file: File) => {
    setError(null);
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file.");
      return;
    }
    const url = URL.createObjectURL(file);
    setFiles((prev) => [...prev, { file, url }]);
  }, []);

  const removeFile = useCallback((index: number) => {
    setFiles((prev) => {
      const item = prev[index];
      if (item) URL.revokeObjectURL(item.url);
      return prev.filter((_, i) => i !== index);
    });
  }, []);

  const handleConvert = useCallback(async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    setError(null);
    setResultBlob(null);
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setResultUrl(null);

    try {
      const blob = await convertJpegToPdf(files.map((f) => f.file));
      const url = URL.createObjectURL(blob);
      setResultBlob(blob);
      setResultUrl(url);
    } catch {
      setError("Conversion failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  }, [files, resultUrl]);

  const handleReset = useCallback(() => {
    for (const f of files) URL.revokeObjectURL(f.url);
    setFiles([]);
    setResultBlob(null);
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setResultUrl(null);
    setError(null);
  }, [files, resultUrl]);

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
        {files.length === 0 && !resultBlob ? (
          <ImageUploader onUpload={handleUpload} description="JPEG images" />
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {files.map((f, i) => (
                <div key={i} className="relative">
                  <ImagePreview
                    src={f.url}
                    alt={f.file.name}
                    fileSize={formatFileSize(f.file.size)}
                  />
                  <button
                    onClick={() => removeFile(i)}
                    className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs text-white hover:bg-red-600 transition-colors"
                    aria-label={`Remove ${f.file.name}`}
                  >
                    &times;
                  </button>
                  <p className="mt-1 truncate text-xs text-zinc-500 dark:text-zinc-400">
                    {f.file.name}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <ImageUploader
                onUpload={handleUpload}
                description="Add more JPEG images"
              />
              {!resultBlob && (
                <button
                  onClick={handleConvert}
                  disabled={isProcessing || files.length === 0}
                  className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                >
                  {isProcessing ? "Converting..." : `Convert ${files.length} image${files.length > 1 ? "s" : ""} to PDF`}
                </button>
              )}
              <button
                onClick={handleReset}
                className="rounded-lg border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-600 shadow-sm hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors"
              >
                Start Over
              </button>
            </div>
          </>
        )}
      </div>

      {isProcessing && (
        <div className="mt-6">
          <ProcessingLoader />
        </div>
      )}

      {resultUrl && !isProcessing && (
        <div className="mt-6 space-y-4">
          <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              PDF contains {files.length} page{files.length > 1 ? "s" : ""}
              {resultBlob && <> &middot; {formatFileSize(resultBlob.size)}</>}
            </p>
          </div>
          <DownloadButton blob={resultBlob} filename="converted.pdf" />
          <p className="text-xs text-zinc-400 dark:text-zinc-500">
            Your PDF is ready to download. All processing was done in your browser.
          </p>
        </div>
      )}

      <FaqSection faqs={faqs} />
    </Container>
  );
}
