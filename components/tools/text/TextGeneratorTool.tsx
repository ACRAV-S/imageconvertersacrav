"use client";

import { useState, useCallback } from "react";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import ErrorAlert from "@/components/tools/ErrorAlert";
import FaqSection, { FaqItem } from "@/components/tools/FaqSection";
import Container from "@/components/common/Container";
import { generateLoremIpsum, generateRandomString } from "@/lib/text/textTools";

type GeneratorMode = "lorem-ipsum" | "random-string";

interface TextGeneratorToolProps {
  title: string;
  description: string;
  faqs: FaqItem[];
  mode: GeneratorMode;
}

export default function TextGeneratorTool({ title, description, faqs, mode }: TextGeneratorToolProps) {
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { copied, copy: handleCopy } = useCopyToClipboard();

  // Lorem ipsum state
  const [loremType, setLoremType] = useState<"words" | "sentences" | "paragraphs">("paragraphs");
  const [loremCount, setLoremCount] = useState(3);

  // Random string state
  const [stringLength, setStringLength] = useState(16);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useDigits, setUseDigits] = useState(true);
  const [useSymbols, setUseSymbols] = useState(false);

  const generate = useCallback(() => {
    setError(null);
    try {
      if (mode === "lorem-ipsum") {
        if (loremCount < 1) { setError("Count must be at least 1."); return; }
        if (loremCount > 100) { setError("Maximum count is 100."); return; }
        setOutput(generateLoremIpsum(loremType, loremCount));
      } else {
        if (stringLength < 1) { setError("Length must be at least 1."); return; }
        if (stringLength > 1000) { setError("Maximum length is 1000."); return; }
        setOutput(generateRandomString(stringLength, {
          uppercase: useUppercase,
          lowercase: useLowercase,
          digits: useDigits,
          symbols: useSymbols,
        }));
      }
    } catch (e) {
      setError((e as Error).message);
    }
  }, [mode, loremType, loremCount, stringLength, useUppercase, useLowercase, useDigits, useSymbols]);

  const handleDownload = useCallback(() => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, "-")}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [output, title]);

  const handleClear = () => {
    setOutput("");
    setError(null);
  };

  return (
    <Container className="py-12">
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          {title}
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">{description}</p>
      </div>

      <ErrorAlert error={error} />

      <div className="mt-8 space-y-4">
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="mb-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Options</h3>

          {mode === "lorem-ipsum" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-zinc-600 dark:text-zinc-400 mb-2">Type</label>
                <div className="flex flex-wrap gap-2">
                  {(["words", "sentences", "paragraphs"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setLoremType(t)}
                      className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                        loremType === t
                          ? "bg-blue-600 text-white"
                          : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
                      }`}
                    >
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm text-zinc-600 dark:text-zinc-400 mb-1">
                  Count: {loremCount}
                </label>
                <input
                  type="range"
                  min={1}
                  max={50}
                  value={loremCount}
                  onChange={(e) => setLoremCount(Number(e.target.value))}
                  className="w-full max-w-xs"
                />
              </div>
            </div>
          )}

          {mode === "random-string" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-zinc-600 dark:text-zinc-400 mb-1">
                  Length: {stringLength}
                </label>
                <input
                  type="range"
                  min={1}
                  max={256}
                  value={stringLength}
                  onChange={(e) => setStringLength(Number(e.target.value))}
                  className="w-full max-w-xs"
                />
              </div>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                  <input type="checkbox" checked={useUppercase} onChange={(e) => setUseUppercase(e.target.checked)} className="rounded" />
                  A-Z
                </label>
                <label className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                  <input type="checkbox" checked={useLowercase} onChange={(e) => setUseLowercase(e.target.checked)} className="rounded" />
                  a-z
                </label>
                <label className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                  <input type="checkbox" checked={useDigits} onChange={(e) => setUseDigits(e.target.checked)} className="rounded" />
                  0-9
                </label>
                <label className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                  <input type="checkbox" checked={useSymbols} onChange={(e) => setUseSymbols(e.target.checked)} className="rounded" />
                  !@#$%
                </label>
              </div>
            </div>
          )}

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              onClick={generate}
              className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
            >
              Generate
            </button>
            <button
              onClick={handleClear}
              className="rounded-lg border border-zinc-200 bg-white px-5 py-2 text-sm font-semibold text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>

        {output && (
          <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Output</h3>
              <div className="flex gap-2">
                <button onClick={() => handleCopy(output)} className="text-xs text-blue-600 hover:text-blue-500 dark:text-blue-400">
                  {copied ? "Copied!" : "Copy"}
                </button>
                <button onClick={handleDownload} className="text-xs text-blue-600 hover:text-blue-500 dark:text-blue-400">
                  Download TXT
                </button>
              </div>
            </div>
            <textarea
              value={output}
              readOnly
              rows={10}
              className="block w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm font-mono dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 resize-y"
              spellCheck={false}
            />
            <p className="mt-2 text-xs text-zinc-400 dark:text-zinc-500">
              {output.length} chars, {output.split("\n").length} lines
            </p>
          </div>
        )}
      </div>

      <FaqSection faqs={faqs} />
    </Container>
  );
}
