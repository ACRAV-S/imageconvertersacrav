"use client";

import { useState, useCallback, useRef } from "react";
import Container from "@/components/common/Container";
import {
  generateCode128Barcode,
  drawBarcodeToCanvas,
  barcodeToPngBlob,
} from "@/lib/qr/barcodeGenerator";

interface FaqItem {
  question: string;
  answer: string;
}

interface BarcodeGeneratorToolProps {
  title: string;
  description: string;
  faqs: FaqItem[];
}

export default function BarcodeGeneratorTool({ title, description, faqs }: BarcodeGeneratorToolProps) {
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [blob, setBlob] = useState<Blob | null>(null);
  const [copied, setCopied] = useState(false);
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
      barcodeToPngBlob(bars, 800, 360).then(setBlob).catch(() => {});
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

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(barcodeText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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

      {error && (
        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/50 dark:text-red-400">
          {error}
        </div>
      )}

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
                  onClick={handleCopy}
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

      <section className="mt-16 border-t border-zinc-100 pt-12 dark:border-zinc-800">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Frequently Asked Questions
        </h2>
        <div className="mt-8 space-y-6">
          {faqs.map((faq, i) => (
            <div key={i}>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">{faq.question}</h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
