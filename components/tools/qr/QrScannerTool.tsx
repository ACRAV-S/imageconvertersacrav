"use client";

import { useState, useCallback } from "react";
import ErrorAlert from "@/components/tools/ErrorAlert";
import FaqSection, { FaqItem } from "@/components/tools/FaqSection";
import Container from "@/components/common/Container";
import ImageUploader from "@/components/tools/ImageUploader";
import { scanQrFromFile, isBarcodeDetectorSupported } from "@/lib/qr/qrScanner";

interface QrScannerToolProps {
  title: string;
  description: string;
  faqs: FaqItem[];
}

export default function QrScannerTool({ title, description, faqs }: QrScannerToolProps) {
  const [results, setResults] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(-1);

  const supported = isBarcodeDetectorSupported();

  const handleUpload = useCallback(async (file: File) => {
    if (!supported) {
      setError("Your browser does not support the BarcodeDetector API. Please use a Chromium-based browser (Chrome, Edge, Opera).");
      return;
    }
    setIsProcessing(true);
    setError(null);
    setResults([]);
    try {
      const codes = await scanQrFromFile(file);
      if (codes.length === 0) {
        setError("No QR code detected in the image. Try a clearer image.");
      } else {
        setResults(codes);
      }
    } catch {
      setError("Failed to scan the image. Try a clearer image.");
    } finally {
      setIsProcessing(false);
    }
  }, [supported]);

  const handleCopy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(-1), 2000);
    } catch {
      setError("Failed to copy to clipboard.");
    }
  };

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

      {!supported && (
        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-950/30">
          <p className="text-sm text-amber-700 dark:text-amber-400">
            <strong>Browser API Limitation:</strong> Your browser does not support the BarcodeDetector API.
            This tool requires a Chromium-based browser (Chrome, Edge, or Opera) to scan QR codes.
          </p>
        </div>
      )}

      <ErrorAlert error={error} />

      <div className="mt-8 space-y-6">
        <ImageUploader
          onUpload={handleUpload}
          disabled={!supported}
          description="Screenshot containing QR code"
        />

        {isProcessing && (
          <div className="rounded-xl border border-zinc-200 bg-white p-8 text-center dark:border-zinc-800 dark:bg-zinc-900">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-300 border-t-blue-600 mx-auto dark:border-zinc-600 dark:border-t-blue-500" />
            <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">Scanning for QR codes...</p>
          </div>
        )}

        {results.length > 0 && (
          <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="mb-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              Detected QR Code{results.length > 1 ? "s" : ""}
            </h3>
            <div className="space-y-3">
              {results.map((text, i) => (
                <div key={i} className="rounded-lg border border-zinc-100 bg-zinc-50 p-3 dark:border-zinc-700 dark:bg-zinc-950">
                  <p className="break-all text-xs text-zinc-800 dark:text-zinc-200 font-mono">
                    {text}
                  </p>
                  <button
                    onClick={() => handleCopy(text, i)}
                    className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400"
                  >
                    {copiedIndex === i ? "Copied!" : "Copy text"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <FaqSection faqs={faqs} />
    </Container>
  );
}
