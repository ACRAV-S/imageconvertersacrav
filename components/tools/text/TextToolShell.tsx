"use client";

import { useState, useCallback } from "react";
import Container from "@/components/common/Container";
import {
  countWords,
  countCharacters,
  countSentences,
  countParagraphs,
  calculateReadingTime,
  convertCase,
  removeDuplicateLines,
  sortLines,
  reverseText,
  removeExtraSpaces,
  generateSlug,
  convertUnicode,
  type CaseType,
} from "@/lib/text/textTools";

interface FaqItem {
  question: string;
  answer: string;
}

export type TextToolMode =
  | "word-count" | "char-count" | "sentence-count" | "paragraph-count" | "reading-time"
  | "case-convert" | "remove-duplicates" | "sort-lines" | "reverse-text" | "remove-spaces" | "slug"
  | "unicode-convert";

interface TextToolShellProps {
  title: string;
  description: string;
  faqs: FaqItem[];
  mode: TextToolMode;
  sample?: string;
  caseType?: CaseType;
  reverseMode?: "chars" | "words" | "lines";
  sortDirection?: "asc" | "desc";
  unicodeDirection?: "encode" | "decode";
}

const SAMPLES: Record<string, string> = {
  text: `The quick brown fox jumps over the lazy dog.
The lazy dog slept in the warm sunshine.
A quick movement of the brown fox startled the dog.
This is a sample text for testing the word counter tool.`,
  slug: "Hello World! This is a Sample Slug Text.",
  unicode: "Hello 世界! Café ñoño 中文 español",
};

function getDefaultSample(mode: TextToolMode): string {
  switch (mode) {
    case "slug": return SAMPLES.slug;
    case "unicode-convert": return SAMPLES.unicode;
    default: return SAMPLES.text;
  }
}

export default function TextToolShell({
  title,
  description,
  faqs,
  mode,
  sample: pageSample,
  caseType = "lower",
  reverseMode = "chars",
  sortDirection = "asc",
  unicodeDirection = "encode",
}: TextToolShellProps) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<Record<string, string | number> | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeCase, setActiveCase] = useState<CaseType>(caseType);
  const [activeReverse, setActiveReverse] = useState<"chars" | "words" | "lines">(reverseMode);
  const [activeSort, setActiveSort] = useState<"asc" | "desc">(sortDirection);
  const [activeUnicode, setActiveUnicode] = useState<"encode" | "decode">(unicodeDirection);

  const sample = pageSample || getDefaultSample(mode);

  const isCounter = ["word-count", "char-count", "sentence-count", "paragraph-count", "reading-time"].includes(mode);
  const isTransformer = !isCounter;

  const hasTransformButton = isTransformer || mode === "reading-time";

  const transform = useCallback(() => {
    if (!input.trim()) { setError("Please enter text."); return; }
    setError(null);
    setStats(null);
    setOutput("");

    try {
      switch (mode) {
        case "word-count": {
          const r = countWords(input);
          setStats({
            "Words": r.words,
            "Unique Words": r.uniqueWords,
            "Characters": r.characters,
            "Characters (no spaces)": r.charactersNoSpaces,
            "Sentences": r.sentences,
            "Paragraphs": r.paragraphs,
            "Lines": r.lines,
            "Reading Time": `${r.readingTime} min`,
            "Speaking Time": `${r.speakingTime} min`,
            "Longest Word": r.longestWord,
            "Shortest Word": r.shortestWord,
            "Avg Word Length": `${r.averageWordLength} chars`,
          });
          break;
        }
        case "char-count": {
          const r = countCharacters(input);
          setStats({
            "Total Characters": r.withSpaces,
            "Characters (no spaces)": r.withoutSpaces,
            "Letters": r.letters,
            "Digits": r.digits,
            "Spaces": r.spaces,
            "Special Characters": r.specialChars,
          });
          break;
        }
        case "sentence-count": {
          const r = countSentences(input);
          setStats({
            "Total Sentences": r.total,
            "Shortest Sentence": r.shortest,
            "Longest Sentence": r.longest,
            "Average Length": `${r.average} words`,
          });
          break;
        }
        case "paragraph-count": {
          const r = countParagraphs(input);
          setStats({
            "Total Paragraphs": r.total,
            "Empty Lines": r.emptyLines,
            "Avg Paragraph Length": `${r.avgLength} chars`,
          });
          break;
        }
        case "reading-time": {
          const r = calculateReadingTime(input);
          setStats({
            "Word Count": r.wordCount,
            "Reading Time": `${r.readingTime} min${r.readingTime !== 1 ? "s" : ""}`,
            "Speaking Time": `${r.speakingTime} min${r.speakingTime !== 1 ? "s" : ""}`,
          });
          break;
        }
        case "case-convert":
          setOutput(convertCase(input, activeCase));
          break;
        case "remove-duplicates":
          setOutput(removeDuplicateLines(input));
          break;
        case "sort-lines":
          setOutput(sortLines(input, activeSort));
          break;
        case "reverse-text":
          setOutput(reverseText(input, activeReverse));
          break;
        case "remove-spaces":
          setOutput(removeExtraSpaces(input));
          break;
        case "slug":
          setOutput(generateSlug(input));
          break;
        case "unicode-convert":
          setOutput(convertUnicode(input, activeUnicode));
          break;
      }
    } catch (e) {
      setError((e as Error).message);
    }
  }, [input, mode, activeCase, activeReverse, activeSort, activeUnicode]);

  const handleCopy = useCallback(async () => {
    const text = output || (stats ? Object.entries(stats).map(([k, v]) => `${k}: ${v}`).join("\n") : "");
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Failed to copy.");
    }
  }, [output, stats]);

  const handleDownload = useCallback(() => {
    const text = output || (stats ? Object.entries(stats).map(([k, v]) => `${k}: ${v}`).join("\n") : "");
    if (!text) return;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, "-")}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [output, stats, title]);

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError(null);
    setStats(null);
    setActiveCase(caseType);
    setActiveReverse(reverseMode);
    setActiveSort(sortDirection);
    setActiveUnicode(unicodeDirection);
  };

  const handleSample = () => {
    setInput(sample);
    setOutput("");
    setError(null);
    setStats(null);
    setActiveCase(caseType);
    setActiveReverse(reverseMode);
    setActiveSort(sortDirection);
    setActiveUnicode(unicodeDirection);
  };

  const renderCaseOptions = () => (
    <div className="flex flex-wrap gap-2 mt-3">
      {(["lower", "upper", "title", "sentence", "camel", "pascal", "snake", "kebab"] as CaseType[]).map((c) => (
        <button
          key={c}
          onClick={() => setActiveCase(c)}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
            activeCase === c
              ? "bg-blue-600 text-white"
              : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
          }`}
        >
          {c.charAt(0).toUpperCase() + c.slice(1)}
        </button>
      ))}
    </div>
  );

  const renderReverseOptions = () => (
    <div className="flex flex-wrap gap-2 mt-3">
      {(["chars", "words", "lines"] as const).map((r) => (
        <button
          key={r}
          onClick={() => setActiveReverse(r)}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
            activeReverse === r
              ? "bg-blue-600 text-white"
              : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
          }`}
        >
          {r.charAt(0).toUpperCase() + r.slice(1)}
        </button>
      ))}
    </div>
  );

  const renderSortOptions = () => (
    <div className="flex flex-wrap gap-2 mt-3">
      {(["asc", "desc"] as const).map((d) => (
        <button
          key={d}
          onClick={() => setActiveSort(d)}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
            activeSort === d
              ? "bg-blue-600 text-white"
              : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
          }`}
        >
          {d === "asc" ? "A → Z" : "Z → A"}
        </button>
      ))}
    </div>
  );

  const renderUnicodeOptions = () => (
    <div className="flex flex-wrap gap-2 mt-3">
      {(["encode", "decode"] as const).map((d) => (
        <button
          key={d}
          onClick={() => setActiveUnicode(d)}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
            activeUnicode === d
              ? "bg-blue-600 text-white"
              : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
          }`}
        >
          {d.charAt(0).toUpperCase() + d.slice(1)}
        </button>
      ))}
    </div>
  );

  return (
    <Container className="py-12">
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          {title}
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">{description}</p>
      </div>

      {error && (
        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/50 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="mt-8 space-y-4">
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Input</h3>
            <button onClick={handleSample} className="text-xs text-blue-600 hover:text-blue-500 dark:text-blue-400">
              Load sample
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your text here..."
            rows={8}
            className="block w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm font-mono dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 resize-y"
            spellCheck={false}
          />
          {mode === "case-convert" && renderCaseOptions()}
          {mode === "reverse-text" && renderReverseOptions()}
          {mode === "sort-lines" && renderSortOptions()}
          {mode === "unicode-convert" && renderUnicodeOptions()}
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              onClick={transform}
              className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
            >
              {isCounter ? "Analyze" : mode === "reading-time" ? "Calculate" : "Transform"}
            </button>
            <button
              onClick={handleClear}
              className="rounded-lg border border-zinc-200 bg-white px-5 py-2 text-sm font-semibold text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>

        {stats && (
          <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Results</h3>
              <div className="flex gap-2">
                <button onClick={handleCopy} className="text-xs text-blue-600 hover:text-blue-500 dark:text-blue-400">
                  {copied ? "Copied!" : "Copy"}
                </button>
                <button onClick={handleDownload} className="text-xs text-blue-600 hover:text-blue-500 dark:text-blue-400">
                  Download TXT
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Object.entries(stats).map(([key, value]) => (
                <div key={key} className="rounded-lg bg-zinc-50 p-3 dark:bg-zinc-950">
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{key}</p>
                  <p className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-50 break-all">{String(value)}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {output && (
          <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Output</h3>
              <div className="flex gap-2">
                <button onClick={handleCopy} className="text-xs text-blue-600 hover:text-blue-500 dark:text-blue-400">
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
              rows={8}
              className="block w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm font-mono dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 resize-y"
              spellCheck={false}
            />
            <p className="mt-2 text-xs text-zinc-400 dark:text-zinc-500">
              {output.length} chars, {output.split("\n").length} lines
            </p>
          </div>
        )}
      </div>

      <section className="mt-16 border-t border-zinc-100 pt-12 dark:border-zinc-800">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Frequently Asked Questions</h2>
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
