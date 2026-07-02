"use client";

import { useState, useCallback } from "react";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import ErrorAlert from "@/components/tools/ErrorAlert";
import FaqSection, { FaqItem } from "@/components/tools/FaqSection";
import Container from "@/components/common/Container";
import { sha256 } from "@/lib/dev/generators";

interface HashGeneratorToolProps {
  title: string;
  description: string;
  faqs: FaqItem[];
}

export default function HashGeneratorTool({ title, description, faqs }: HashGeneratorToolProps) {
  const [input, setInput] = useState("");
  const [hash, setHash] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { copied, copy: handleCopy } = useCopyToClipboard();

  const handleGenerate = useCallback(async () => {
    if (!input.trim()) { setError("Please enter text to hash."); return; }
    setIsProcessing(true);
    setError(null);
    setHash("");
    try {
      const result = await sha256(input);
      setHash(result);
    } catch {
      setError("Hashing failed.");
    } finally {
      setIsProcessing(false);
    }
  }, [input]);

  const handleClear = () => {
    setInput("");
    setHash("");
    setError(null);
  };

  const handleSample = () => {
    setInput("Hello World");
    setHash("");
    setError(null);
  };

  return (
    <Container className="py-12">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">{title}</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">{description}</p>
      </div>

      <ErrorAlert error={error} />

      <div className="mt-8 space-y-4">
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Input</h3>
            <button onClick={handleSample} className="text-xs text-blue-600 hover:text-blue-500 dark:text-blue-400">Load sample</button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text to hash..."
            rows={4}
            className="block w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm font-mono dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 resize-y"
            spellCheck={false}
          />
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              onClick={handleGenerate}
              disabled={isProcessing}
              className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 disabled:opacity-50 transition-colors"
            >
              {isProcessing ? "Hashing..." : "Generate SHA-256"}
            </button>
            <button onClick={handleClear} className="rounded-lg border border-zinc-200 bg-white px-5 py-2 text-sm font-semibold text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors">
              Clear
            </button>
          </div>
        </div>

        {hash && (
          <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">SHA-256 Hash</h3>
              <button onClick={() => handleCopy(hash)} className="text-xs text-blue-600 hover:text-blue-500 dark:text-blue-400">{copied ? "Copied!" : "Copy"}</button>
            </div>
            <pre className="rounded-lg bg-zinc-50 p-3 text-xs font-mono text-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 break-all select-all">
              {hash}
            </pre>
            <p className="mt-2 text-xs text-zinc-400 dark:text-zinc-500">{hash.length} hex characters</p>
          </div>
        )}
      </div>

      <FaqSection faqs={faqs} />
    </Container>
  );
}
