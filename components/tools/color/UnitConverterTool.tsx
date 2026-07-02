"use client";

import { useState, useCallback } from "react";
import Container from "@/components/common/Container";
import { convertPxToRem, convertRemToPx, convertPxToEm, convertEmToPx } from "@/lib/color/colorUtils";
import ErrorAlert from "@/components/tools/ErrorAlert";
import FaqSection, { FaqItem } from "@/components/tools/FaqSection";

export default function UnitConverterTool({ title, description, faqs }: { title: string; description: string; faqs: FaqItem[] }) {
  const [pxValue, setPxValue] = useState("16");
  const [remValue, setRemValue] = useState("1");
  const [emValue, setEmValue] = useState("1");
  const [baseSize, setBaseSize] = useState(16);
  const [copied, setCopied] = useState(false);

  const px = parseFloat(pxValue) || 0;
  const rem = parseFloat(remValue) || 0;
  const em = parseFloat(emValue) || 0;

  const updateFromPx = useCallback((v: string) => {
    setPxValue(v);
    const n = parseFloat(v) || 0;
    setRemValue(convertPxToRem(n, baseSize).toFixed(4));
    setEmValue(convertPxToEm(n, baseSize).toFixed(4));
  }, [baseSize]);

  const updateFromRem = useCallback((v: string) => {
    setRemValue(v);
    const n = parseFloat(v) || 0;
    setPxValue(convertRemToPx(n, baseSize).toFixed(2));
    setEmValue(convertPxToEm(convertRemToPx(n, baseSize), baseSize).toFixed(4));
  }, [baseSize]);

  const updateFromEm = useCallback((v: string) => {
    setEmValue(v);
    const n = parseFloat(v) || 0;
    setPxValue(convertEmToPx(n, baseSize).toFixed(2));
    setRemValue(convertPxToRem(convertEmToPx(n, baseSize), baseSize).toFixed(4));
  }, [baseSize]);

  const updateBase = useCallback((v: number) => {
    setBaseSize(v);
    const p = parseFloat(pxValue) || 0;
    setRemValue(convertPxToRem(p, v).toFixed(4));
    setEmValue(convertPxToEm(p, v).toFixed(4));
  }, [pxValue]);

  const handleCopy = async () => {
    const text = `${px}px = ${rem}rem = ${em}em (base: ${baseSize}px)`;
    try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }
    catch {}
  };

  const handleReset = () => {
    setPxValue("16"); setRemValue("1"); setEmValue("1"); setBaseSize(16);
  };

  return (
    <Container className="py-12">
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">{title}</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">{description}</p>
      </div>

      <div className="mt-8 space-y-4">
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="mb-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Enter a Value</h3>

          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="block text-xs text-zinc-500 mb-1">Pixels (px)</label>
                <input type="number" value={pxValue} onChange={(e) => updateFromPx(e.target.value)}
                  className="block w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm font-mono dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100" />
              </div>
              <div>
                <label className="block text-xs text-zinc-500 mb-1">REM</label>
                <input type="number" value={remValue} onChange={(e) => updateFromRem(e.target.value)}
                  className="block w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm font-mono dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100" />
              </div>
              <div>
                <label className="block text-xs text-zinc-500 mb-1">EM</label>
                <input type="number" value={emValue} onChange={(e) => updateFromEm(e.target.value)}
                  className="block w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm font-mono dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100" />
              </div>
            </div>

            <div>
              <label className="block text-xs text-zinc-500 mb-1">Base Font Size: {baseSize}px</label>
              <input type="range" min={10} max={24} value={baseSize} onChange={(e) => updateBase(Number(e.target.value))} className="w-full max-w-xs" />
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button onClick={handleCopy} className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors">{copied ? "Copied!" : "Copy All"}</button>
            <button onClick={handleReset} className="rounded-lg border border-zinc-200 bg-white px-5 py-2 text-sm font-semibold text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors">Reset</button>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="mb-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Reference Table</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-700">
                  <th className="text-left py-2 text-xs text-zinc-500 font-medium">px</th>
                  <th className="text-left py-2 text-xs text-zinc-500 font-medium">rem</th>
                  <th className="text-left py-2 text-xs text-zinc-500 font-medium">em</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 4, 8, 10, 12, 14, 16, 18, 20, 24, 32, 40, 48, 64, 96].map((p) => (
                  <tr key={p} className="border-b border-zinc-100 dark:border-zinc-800">
                    <td className="py-1.5 font-mono text-zinc-700 dark:text-zinc-300">{p}px</td>
                    <td className="py-1.5 font-mono text-zinc-600 dark:text-zinc-400">{convertPxToRem(p, baseSize).toFixed(4)}rem</td>
                    <td className="py-1.5 font-mono text-zinc-600 dark:text-zinc-400">{convertPxToEm(p, baseSize).toFixed(4)}em</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <FaqSection faqs={faqs} />
    </Container>
  );
}
