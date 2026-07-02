"use client";

import { useState, useCallback } from "react";
import Container from "@/components/common/Container";
import ImageUploader from "@/components/tools/ImageUploader";
import ProcessingLoader from "@/components/tools/ProcessingLoader";
import { formatFileSize } from "@/lib/image/imageUtils";
import ErrorAlert from "@/components/tools/ErrorAlert";
import FaqSection from "@/components/tools/FaqSection";
import { validatePdfFile } from "@/lib/pdf/pdfValidator";
import type { FaqItem } from "@/components/tools/FaqSection";

interface PdfToJpgToolProps {
  title: string;
  description: string;
  faqs: FaqItem[];
}

export default function PdfToJpgTool({ title, description, faqs }: PdfToJpgToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultBlobs, setResultBlobs] = useState<Blob[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

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
      setError("Could not read the PDF file.");
    }
  }, []);

  const handleConvert = useCallback(async () => {
    if (!file) return;
    setIsProcessing(true);
    setError(null);
    setResultBlobs([]);
    setProgress(0);

    try {
      const { convertPdfToJpg } = await import("@/lib/pdf/pdfRender");
      const blobs = await convertPdfToJpg(file, { scale: 2, format: "jpeg", quality: 0.92 });
      setResultBlobs(blobs);
      setProgress(100);
    } catch {
      setError("Conversion failed. The file may be encrypted or contain unsupported content.");
    } finally {
      setIsProcessing(false);
    }
  }, [file]);

  const downloadAll = useCallback(() => {
    for (let i = 0; i < resultBlobs.length; i++) {
      const url = URL.createObjectURL(resultBlobs[i]);
      const a = document.createElement("a");
      a.href = url;
      const name = file?.name.replace(/\.pdf$/i, "") || "document";
      a.download = `${name}_page_${i + 1}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }, [resultBlobs, file]);

  const downloadSingle = useCallback((blob: Blob, index: number) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const name = file?.name.replace(/\.pdf$/i, "") || "document";
    a.download = `${name}_page_${index + 1}.jpg`;
    a.click();
    URL.revokeObjectURL(url);
  }, [file]);

  const handleReset = useCallback(() => {
    setFile(null);
    setResultBlobs([]);
    setError(null);
    setPageCount(0);
    setProgress(0);
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
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{formatFileSize(file.size)} &middot; {pageCount} page{pageCount > 1 ? "s" : ""}</p>
                </div>
                <button onClick={handleReset} className="text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors">Change file</button>
              </div>
            </div>

            {resultBlobs.length === 0 && !isProcessing && (
              <button
                onClick={handleConvert}
                className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
              >
                Convert to JPG
              </button>
            )}

            {isProcessing && (
              <ProcessingLoader message={`Converting page ${Math.min(progress || 1, pageCount)} of ${pageCount}...`} />
            )}

            {resultBlobs.length > 0 && !isProcessing && (
              <div className="space-y-4">
                <div className="rounded-xl border border-green-200 bg-green-50 p-6 dark:border-green-800 dark:bg-green-950/30">
                  <p className="text-sm font-medium text-green-800 dark:text-green-300">Conversion complete!</p>
                  <p className="mt-1 text-sm text-green-700 dark:text-green-400">{resultBlobs.length} image{resultBlobs.length > 1 ? "s" : ""} created</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={downloadAll}
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>
                    Download All ({resultBlobs.length} images)
                  </button>
                  <button onClick={handleReset} className="rounded-lg border border-zinc-200 bg-white px-6 py-2.5 text-sm font-semibold text-zinc-600 shadow-sm hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors">Start Over</button>
                </div>
                <div className="max-h-64 overflow-y-auto space-y-2">
                  {resultBlobs.map((blob, i) => (
                    <div key={i} className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white px-4 py-2 dark:border-zinc-800 dark:bg-zinc-900">
                      <span className="text-sm text-zinc-600 dark:text-zinc-400">Page {i + 1}</span>
                      <button
                        onClick={() => downloadSingle(blob, i)}
                        className="text-xs font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
                      >
                        Download ({formatFileSize(blob.size)})
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <FaqSection faqs={faqs} />
    </Container>
  );
}
