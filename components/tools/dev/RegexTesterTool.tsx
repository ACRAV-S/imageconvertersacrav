"use client";

import { useState, useCallback, useMemo } from "react";
import Container from "@/components/common/Container";

interface FaqItem {
  question: string;
  answer: string;
}

interface RegexTesterToolProps {
  title: string;
  description: string;
  faqs: FaqItem[];
}

interface Match {
  index: number;
  text: string;
  groups: string[];
}

export default function RegexTesterTool({ title, description, faqs }: RegexTesterToolProps) {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("gm");
  const [testText, setTestText] = useState("");
  const [matches, setMatches] = useState<Match[]>([]);
  const [matchCount, setMatchCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleTest = useCallback(() => {
    if (!pattern.trim()) { setError("Please enter a regex pattern."); return; }
    if (!testText) { setError("Please enter test text."); return; }
    setError(null);

    try {
      const regex = new RegExp(pattern, flags);
      const allMatches: Match[] = [];
      let count = 0;
      let m: RegExpExecArray | null;
      while ((m = regex.exec(testText)) !== null) {
        count++;
        allMatches.push({
          index: m.index,
          text: m[0],
          groups: m.slice(1),
        });
        if (m.index === regex.lastIndex) regex.lastIndex++;
      }
      setMatches(allMatches);
      setMatchCount(count);
    } catch (e) {
      setError((e as Error).message);
      setMatches([]);
      setMatchCount(0);
    }
  }, [pattern, flags, testText]);

  const handleCopy = async () => {
    const text = matches.map((m, i) =>
      `Match ${i + 1} at index ${m.index}: "${m.text}"${m.groups.length ? ` groups: [${m.groups.join(", ")}]` : ""}`
    ).join("\n");
    try {
      await navigator.clipboard.writeText(text || "No matches");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const handleClear = () => {
    setPattern("");
    setFlags("gm");
    setTestText("");
    setMatches([]);
    setMatchCount(0);
    setError(null);
  };

  const handleSample = () => {
    setPattern("https?://[\\w.-]+(?:\\.\\w{2,})(?:/[\\w./-]*)?");
    setFlags("gm");
    setTestText("Visit https://example.com for more info.\nCheck out https://github.com/opencode for the tool.\nOur docs are at https://docs.example.com/docs/v2/api");
    setMatches([]);
    setMatchCount(0);
    setError(null);
  };

  return (
    <Container className="py-12">
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">{title}</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">{description}</p>
      </div>

      {error && (
        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/50 dark:text-red-400">{error}</div>
      )}

      <div className="mt-8 space-y-4">
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Regex Pattern</h3>
            <button onClick={handleSample} className="text-xs text-blue-600 hover:text-blue-500 dark:text-blue-400">Load sample</button>
          </div>
          <div className="flex gap-3">
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="Enter regex pattern..."
              className="flex-1 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm font-mono dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
              spellCheck={false}
            />
            <input
              type="text"
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
              placeholder="flags"
              className="w-20 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm font-mono text-center dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
              spellCheck={false}
            />
          </div>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="mb-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Test Text</h3>
          <textarea
            value={testText}
            onChange={(e) => setTestText(e.target.value)}
            placeholder="Enter text to test against..."
            rows={6}
            className="block w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm font-mono dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 resize-y"
            spellCheck={false}
          />
          <div className="mt-3 flex flex-wrap gap-2">
            <button onClick={handleTest} className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors">
              Test
            </button>
            <button onClick={handleClear} className="rounded-lg border border-zinc-200 bg-white px-5 py-2 text-sm font-semibold text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors">
              Clear
            </button>
          </div>
        </div>

        {matches.length > 0 && (
          <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                Matches ({matchCount})
              </h3>
              <button onClick={handleCopy} className="text-xs text-blue-600 hover:text-blue-500 dark:text-blue-400">{copied ? "Copied!" : "Copy"}</button>
            </div>
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {matches.map((m, i) => (
                <div key={i} className="rounded-lg border border-zinc-100 bg-zinc-50 p-3 dark:border-zinc-700 dark:bg-zinc-950">
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">Match {i + 1} at index {m.index}</p>
                  <code className="text-sm font-mono text-zinc-800 dark:text-zinc-200 break-all">{m.text}</code>
                  {m.groups.length > 0 && m.groups.some(g => g !== undefined) && (
                    <div className="mt-1 flex flex-wrap gap-1">
                      {m.groups.map((g, gi) => g !== undefined && (
                        <span key={gi} className="rounded bg-blue-100 px-1.5 py-0.5 text-xs font-mono text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                          ${gi + 1}: {g}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {matches.length === 0 && testText && pattern && !error && (
          <div className="rounded-xl border border-zinc-200 bg-white p-4 text-center dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">No matches found</p>
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
