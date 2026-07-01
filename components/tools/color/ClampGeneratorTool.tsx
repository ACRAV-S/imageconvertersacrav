"use client";

import { useState, useCallback } from "react";
import Container from "@/components/common/Container";
import { generateClamp } from "@/lib/color/colorUtils";

interface FaqItem { question: string; answer: string; }

export default function ClampGeneratorTool({ title, description, faqs }: { title: string; description: string; faqs: FaqItem[] }) {
  const [minSize, setMinSize] = useState(16);
  const [maxSize, setMaxSize] = useState(32);
  const [minViewport, setMinViewport] = useState(375);
  const [maxViewport, setMaxViewport] = useState(1200);
  const [unit, setUnit] = useState<"px" | "rem">("px");
  const [copied, setCopied] = useState(false);

  const clampValue = generateClamp(minSize, maxSize, minViewport, maxViewport, unit);

  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(`font-size: ${clampValue};`); setCopied(true); setTimeout(() => setCopied(false), 2000); }
    catch {}
  };

  const handleReset = () => {
    setMinSize(16); setMaxSize(32); setMinViewport(375); setMaxViewport(1200); setUnit("px");
  };

  const previewSize = Math.min(
    maxSize,
    Math.max(minSize, minSize + ((maxSize - minSize) * (600 - minViewport)) / (maxViewport - minViewport))
  );

  return (
    <Container className="py-12">
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">{title}</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">{description}</p>
      </div>

      <div className="mt-8 space-y-4">
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="mb-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Parameters</h3>
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs text-zinc-500 mb-1">Min Font Size: {minSize}{unit}</label>
                <input type="range" min={8} max={100} value={minSize} onChange={(e) => setMinSize(Number(e.target.value))} className="w-full" />
              </div>
              <div>
                <label className="block text-xs text-zinc-500 mb-1">Max Font Size: {maxSize}{unit}</label>
                <input type="range" min={8} max={200} value={maxSize} onChange={(e) => setMaxSize(Number(e.target.value))} className="w-full" />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs text-zinc-500 mb-1">Min Viewport: {minViewport}px</label>
                <input type="range" min={320} max={768} value={minViewport} onChange={(e) => setMinViewport(Number(e.target.value))} className="w-full" />
              </div>
              <div>
                <label className="block text-xs text-zinc-500 mb-1">Max Viewport: {maxViewport}px</label>
                <input type="range" min={769} max={2560} value={maxViewport} onChange={(e) => setMaxViewport(Number(e.target.value))} className="w-full" />
              </div>
            </div>
            <div className="flex gap-2">
              {(["px", "rem"] as const).map((u) => (
                <button key={u} onClick={() => setUnit(u)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${unit === u ? "bg-blue-600 text-white" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"}`}>
                  {u}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="mb-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Live Preview</h3>
          <div className="rounded-lg bg-zinc-50 p-6 dark:bg-zinc-950">
            <p style={{ fontSize: `${previewSize}px` }} className="font-bold text-zinc-800 dark:text-zinc-200 transition-all">
              This text scales fluidly
            </p>
            <p className="text-xs text-zinc-400 mt-2">Preview at ~600px viewport: {previewSize.toFixed(1)}{unit}</p>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">CSS Code</h3>
            <button onClick={handleCopy} className="text-xs text-blue-600 hover:text-blue-500 dark:text-blue-400">{copied ? "Copied!" : "Copy CSS"}</button>
          </div>
          <pre className="rounded-lg bg-zinc-50 p-3 text-xs font-mono text-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 overflow-x-auto whitespace-pre-wrap">font-size: {clampValue};</pre>
        </div>
      </div>

      <section className="mt-16 border-t border-zinc-100 pt-12 dark:border-zinc-800">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Frequently Asked Questions</h2>
        <div className="mt-8 space-y-6">{faqs.map((faq, i) => (
          <div key={i}><h3 className="font-semibold text-zinc-900 dark:text-zinc-50">{faq.question}</h3><p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{faq.answer}</p></div>
        ))}</div>
      </section>
    </Container>
  );
}
