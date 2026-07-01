"use client";

import { useState, useCallback } from "react";
import Container from "@/components/common/Container";
import { generatePalette, isValidHex } from "@/lib/color/colorUtils";

interface FaqItem { question: string; answer: string; }

export default function ColorPaletteTool({ title, description, faqs }: { title: string; description: string; faqs: FaqItem[] }) {
  const [seedColor, setSeedColor] = useState("#3498db");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const schemes = generatePalette(isValidHex(seedColor) ? seedColor : "#3498db");

  const handleReset = () => setSeedColor("#3498db");

  const copyColor = async (hex: string, i: number) => {
    try { await navigator.clipboard.writeText(hex); setCopiedIndex(i); setTimeout(() => setCopiedIndex(null), 2000); }
    catch {}
  };

  return (
    <Container className="py-12">
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">{title}</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">{description}</p>
      </div>

      <div className="mt-8 space-y-4">
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="mb-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Seed Color</h3>
          <div className="flex items-center gap-4">
            <input type="color" value={isValidHex(seedColor) ? seedColor : "#3498db"} onChange={(e) => setSeedColor(e.target.value)}
              className="h-12 w-16 cursor-pointer rounded-lg border border-zinc-200 dark:border-zinc-700" />
            <input value={seedColor} onChange={(e) => setSeedColor(e.target.value)}
              className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm font-mono dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 w-28" />
          </div>
          <button onClick={handleReset} className="mt-3 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors">Reset</button>
        </div>

        {schemes.map((scheme) => (
          <div key={scheme.name} className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="mb-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300">{scheme.name}</h3>
            <div className="flex flex-wrap gap-3">
              {scheme.colors.map((hex, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div className="h-16 w-16 rounded-lg border border-zinc-200 dark:border-zinc-700" style={{ backgroundColor: hex }} />
                  <span className="text-xs font-mono text-zinc-600 dark:text-zinc-400">{hex}</span>
                  <button onClick={() => copyColor(hex, i)} className="text-xs text-blue-600 hover:text-blue-500 dark:text-blue-400">
                    {copiedIndex === i ? "Copied!" : "Copy"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
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
