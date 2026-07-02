"use client";

import { useState } from "react";
import Container from "@/components/common/Container";
import { getWcagResult, isValidHex } from "@/lib/color/colorUtils";
import ErrorAlert from "@/components/tools/ErrorAlert";
import FaqSection, { FaqItem } from "@/components/tools/FaqSection";

export default function ColorContrastTool({ title, description, faqs }: { title: string; description: string; faqs: FaqItem[] }) {
  const [fgColor, setFgColor] = useState("#333333");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [result, setResult] = useState(getWcagResult(fgColor, bgColor));

  const updateFg = (v: string) => { setFgColor(v); setResult(getWcagResult(v, bgColor)); };
  const updateBg = (v: string) => { setBgColor(v); setResult(getWcagResult(fgColor, v)); };
  const swap = () => { setFgColor(bgColor); setBgColor(fgColor); setResult(getWcagResult(bgColor, fgColor)); };
  const handleReset = () => { setFgColor("#333333"); setBgColor("#ffffff"); setResult(getWcagResult("#333333", "#ffffff")); };

  const size = 120;

  return (
    <Container className="py-12">
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">{title}</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">{description}</p>
      </div>

      <div className="mt-8 space-y-4">
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs text-zinc-500 mb-2">Foreground Color</label>
              <input type="color" value={isValidHex(fgColor) ? fgColor : "#000000"} onChange={(e) => updateFg(e.target.value)}
                className="h-10 w-full cursor-pointer rounded-lg border border-zinc-200 dark:border-zinc-700" />
              <input value={fgColor} onChange={(e) => updateFg(e.target.value)}
                className="mt-2 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm font-mono dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100" />
            </div>
            <div>
              <label className="block text-xs text-zinc-500 mb-2">Background Color</label>
              <input type="color" value={isValidHex(bgColor) ? bgColor : "#ffffff"} onChange={(e) => updateBg(e.target.value)}
                className="h-10 w-full cursor-pointer rounded-lg border border-zinc-200 dark:border-zinc-700" />
              <input value={bgColor} onChange={(e) => updateBg(e.target.value)}
                className="mt-2 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm font-mono dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100" />
            </div>
          </div>
          <button onClick={swap} className="mt-3 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors">Swap Colors</button>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="mb-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Preview</h3>
          <div className="rounded-lg border border-zinc-200 dark:border-zinc-700 p-6" style={{ backgroundColor: bgColor }}>
            <p className="text-lg font-bold" style={{ color: fgColor }}>The quick brown fox</p>
            <p className="text-sm mt-2" style={{ color: fgColor }}>This shows how text appears on this background.</p>
            <div className="mt-3 flex gap-3">
              <span className="text-xs px-2 py-1 rounded" style={{ backgroundColor: bgColor, color: fgColor, border: `1px solid ${fgColor}` }}>Small text</span>
              <span className="text-xl font-bold px-2 py-1 rounded" style={{ backgroundColor: bgColor, color: fgColor }}>Large Text</span>
            </div>
          </div>
        </div>

        {result && (
          <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="mb-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">WCAG Results</h3>
            <div className="mb-4 text-center">
              <span className="text-4xl font-bold" style={{ color: result.rating === "AAA" ? "#22c55e" : result.rating === "AA" ? "#22c55e" : result.rating === "AA Large" ? "#eab308" : "#ef4444" }}>
                {result.rating}
              </span>
              <p className="text-2xl font-mono text-zinc-700 dark:text-zinc-300 mt-1">{result.ratio}:1</p>
              <p className="text-xs text-zinc-400 mt-1">Contrast Ratio</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "AA Normal Text", pass: result.aaNormal, min: 4.5 },
                { label: "AA Large Text", pass: result.aaLarge, min: 3 },
                { label: "AAA Normal Text", pass: result.aaaNormal, min: 7 },
                { label: "AAA Large Text", pass: result.aaaLarge, min: 4.5 },
              ].map((item) => (
                <div key={item.label} className={`rounded-lg p-3 text-center ${item.pass ? "bg-green-50 dark:bg-green-950/50" : "bg-red-50 dark:bg-red-950/50"}`}>
                  <p className={`text-lg font-bold ${item.pass ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                    {item.pass ? "PASS" : "FAIL"}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">{item.label}</p>
                  <p className="text-xs text-zinc-400">min {item.min}:1</p>
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
