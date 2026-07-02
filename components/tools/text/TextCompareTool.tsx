"use client";

import { useState, useCallback } from "react";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import ErrorAlert from "@/components/tools/ErrorAlert";
import FaqSection, { FaqItem } from "@/components/tools/FaqSection";
import Container from "@/components/common/Container";
import { computeDiff, type DiffLine } from "@/lib/text/textTools";

interface TextCompareToolProps {
  title: string;
  description: string;
  faqs: FaqItem[];
}

export default function TextCompareTool({ title, description, faqs }: TextCompareToolProps) {
  const [oldText, setOldText] = useState("");
  const [newText, setNewText] = useState("");
  const [diff, setDiff] = useState<DiffLine[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { copied, copy: handleCopy } = useCopyToClipboard();

  const handleCompare = useCallback(() => {
    if (!oldText.trim() && !newText.trim()) {
      setError("Please enter text in at least one field.");
      return;
    }
    setError(null);
    try {
      const result = computeDiff(oldText, newText);
      setDiff(result);
    } catch (e) {
      setError((e as Error).message);
    }
  }, [oldText, newText]);

  const handleDownload = useCallback(() => {
    if (!diff) return;
    const text = diff
      .map((l) => `${l.type === "added" ? "+ " : l.type === "removed" ? "- " : "  "}${l.text}`)
      .join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "text-diff.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [diff]);

  const handleClear = () => {
    setOldText("");
    setNewText("");
    setDiff(null);
    setError(null);
  };

  const handleSample = () => {
    setOldText("Hello World\nThis is line two\nThis is line three");
    setNewText("Hello World\nThis is modified line two\nThis is line three\nThis is line four");
    setDiff(null);
    setError(null);
  };

  const added = diff?.filter((l) => l.type === "added").length ?? 0;
  const removed = diff?.filter((l) => l.type === "removed").length ?? 0;

  return (
    <Container className="py-12">
      <div className="max-w-5xl">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          {title}
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">{description}</p>
      </div>

      <ErrorAlert error={error} />

      <div className="mt-8 space-y-4">
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Original Text</h3>
              </div>
              <textarea
                value={oldText}
                onChange={(e) => setOldText(e.target.value)}
                placeholder="Paste original text..."
                rows={10}
                className="block w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm font-mono dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 resize-y"
                spellCheck={false}
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Modified Text</h3>
              </div>
              <textarea
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
                placeholder="Paste modified text..."
                rows={10}
                className="block w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm font-mono dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 resize-y"
                spellCheck={false}
              />
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              onClick={handleCompare}
              className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
            >
              Compare
            </button>
            <button
              onClick={handleClear}
              className="rounded-lg border border-zinc-200 bg-white px-5 py-2 text-sm font-semibold text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors"
            >
              Clear
            </button>
            <button
              onClick={handleSample}
              className="rounded-lg border border-zinc-200 bg-white px-5 py-2 text-sm font-semibold text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors"
            >
              Load sample
            </button>
          </div>
        </div>

        {diff && (
          <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                Differences
                <span className="ml-2 text-xs font-normal text-zinc-400">
                  (+{added} / -{removed})
                </span>
              </h3>
              <div className="flex gap-2">
                <button onClick={() => handleCopy(diff.map((l) => `${l.type === "added" ? "+ " : l.type === "removed" ? "- " : "  "}${l.text}`).join("\n"))} className="text-xs text-blue-600 hover:text-blue-500 dark:text-blue-400">
                  {copied ? "Copied!" : "Copy"}
                </button>
                <button onClick={handleDownload} className="text-xs text-blue-600 hover:text-blue-500 dark:text-blue-400">
                  Download TXT
                </button>
              </div>
            </div>
            <div className="rounded-lg bg-zinc-50 p-3 font-mono text-xs leading-relaxed dark:bg-zinc-950 overflow-x-auto whitespace-pre-wrap">
              {diff.map((line, i) => (
                <div
                  key={i}
                  className={`${
                    line.type === "added"
                      ? "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300"
                      : line.type === "removed"
                      ? "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300"
                      : "text-zinc-700 dark:text-zinc-300"
                  } px-2 py-0.5`}
                >
                  {line.type === "added" ? "+ " : line.type === "removed" ? "- " : "  "}
                  {line.text || " "}
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
