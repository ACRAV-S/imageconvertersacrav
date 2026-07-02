"use client";

import { useState, useCallback } from "react";
import FaqSection, { FaqItem } from "@/components/tools/FaqSection";
import Container from "@/components/common/Container";
import { generateUuids } from "@/lib/dev/generators";

interface UuidGeneratorToolProps {
  title: string;
  description: string;
  faqs: FaqItem[];
}

export default function UuidGeneratorTool({ title, description, faqs }: UuidGeneratorToolProps) {
  const [count, setCount] = useState(1);
  const [uuids, setUuids] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState(-1);

  const handleGenerate = useCallback(() => {
    setUuids(generateUuids(count));
  }, [count]);

  const handleCopy = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(-1), 2000);
    } catch {}
  };

  const handleCopyAll = async () => {
    try {
      await navigator.clipboard.writeText(uuids.join("\n"));
      setCopiedIndex(-2);
      setTimeout(() => setCopiedIndex(-1), 2000);
    } catch {}
  };

  return (
    <Container className="py-12">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">{title}</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">{description}</p>
      </div>

      <div className="mt-8 space-y-4">
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300" id="count-label">Count:</label>
            <input
              type="number"
              min={1}
              max={100}
              value={count}
              onChange={(e) => setCount(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
              className="w-20 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
              aria-labelledby="count-label"
            />
            <button
              onClick={handleGenerate}
              className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
            >
              Generate
            </button>
            {uuids.length > 0 && (
              <button
                onClick={handleCopyAll}
                className="rounded-lg border border-zinc-200 bg-white px-5 py-2 text-sm font-semibold text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors"
              >
                {copiedIndex === -2 ? "Copied!" : "Copy All"}
              </button>
            )}
          </div>
        </div>

        {uuids.length > 0 && (
          <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="space-y-2">
              {uuids.map((uuid, i) => (
                <div key={uuid} className="flex items-center justify-between rounded-lg bg-zinc-50 px-3 py-2 dark:bg-zinc-950">
                  <code className="text-sm font-mono text-zinc-800 dark:text-zinc-200 select-all">{uuid}</code>
                  <button
                    onClick={() => handleCopy(uuid, i)}
                    className="text-xs text-blue-600 hover:text-blue-500 dark:text-blue-400 shrink-0 ml-2"
                  >
                    {copiedIndex === i ? "Copied!" : "Copy"}
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
