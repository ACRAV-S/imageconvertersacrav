"use client";

import { useState, useCallback, useRef } from "react";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import ErrorAlert from "@/components/tools/ErrorAlert";
import FaqSection, { FaqItem } from "@/components/tools/FaqSection";
import Container from "@/components/common/Container";
import {
  generateCode128Barcode,
  drawBarcodeToCanvas,
  barcodeToPngBlob,
} from "@/lib/qr/barcodeGenerator";

interface BarcodeGeneratorToolProps {
  title: string;
  description: string;
  faqs: FaqItem[];
}

export default function BarcodeGeneratorTool({ title, description, faqs }: BarcodeGeneratorToolProps) {
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [blob, setBlob] = useState<Blob | null>(null);
  const { copied, copy: handleCopy } = useCopyToClipboard();
  const [barcodeText, setBarcodeText] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generate = useCallback(() => {
    if (!text.trim()) {
      setError("Please enter text to encode.");
      return;
    }
    setError(null);
    try {
      const { bars, text: encoded } = generateCode128Barcode(text.trim());
      setBarcodeText(encoded);
      const canvas = canvasRef.current;
      if (canvas) drawBarcodeToCanvas(canvas, bars, canvas.offsetWidth || 400, 180);
      barcodeToPngBlob(bars, 800, 360).then(setBlob).catch(() => setError("Failed to generate barcode image."));
    } catch {
      setError("Failed to generate barcode.");
    }
  }, [text]);

  const handleDownload = () => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "barcode.png";
    a.click();
    URL.revokeObjectURL(url);
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

      <ErrorAlert error={error} />

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="mb-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              Input
            </h3>
            <div className="mb-3">
              <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400" id="barcode-text-label">
                Text to Encode
              </label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text or numbers..."
                className="mt-1 block w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                aria-labelledby="barcode-text-label"
                onKeyDown={(e) => e.key === "Enter" && generate()}
              />
            </div>
            <button
              onClick={generate}
              className="w-full rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
            >
              Generate Barcode
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {barcodeText && (
            <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="mb-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                Barcode Preview
              </h3>
              <div className="flex items-center justify-center bg-white rounded-lg overflow-hidden">
                <canvas
                  ref={canvasRef}
                  className="w-full"
                  style={{ maxWidth: "400px", height: "180px" }}
                />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={handleDownload}
                  disabled={!blob}
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                >
                  Download PNG
                </button>
                <button
                  onClick={() => handleCopy(barcodeText)}
                  className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-600 shadow-sm hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors"
                >
                  {copied ? "Copied!" : "Copy Text"}
                </button>
              </div>
              <div className="mt-3 rounded-lg bg-zinc-50 p-3 dark:bg-zinc-950">
                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Encoded text:</p>
                <p className="mt-1 break-all text-xs text-zinc-700 dark:text-zinc-300 font-mono">
                  {barcodeText}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <FaqSection faqs={faqs} />
    </Container>
  );
}
