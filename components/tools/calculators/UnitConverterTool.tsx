"use client";

import { useState, useCallback } from "react";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import Container from "@/components/common/Container";
import { convertUnit, getUnitCategories, getUnitsForCategory, type UnitCategory } from "@/lib/calculators/calculators";
import ErrorAlert from "@/components/tools/ErrorAlert";
import FaqSection from "@/components/tools/FaqSection";
import type { FaqItem } from "@/components/tools/FaqSection";

export default function UnitConverterTool({ title, description, faqs }: { title: string; description: string; faqs: FaqItem[] }) {
  const [category, setCategory] = useState<UnitCategory>("length");
  const [fromUnit, setFromUnit] = useState("m");
  const [toUnit, setToUnit] = useState("km");
  const [value, setValue] = useState("100");
  const [converted, setConverted] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { copied, copy: handleCopy } = useCopyToClipboard();

  const units = getUnitsForCategory(category);

  const doConvert = useCallback(() => {
    setError(null);
    const v = parseFloat(value);
    if (isNaN(v)) { setError("Please enter a valid number."); return; }
    const r = convertUnit(v, fromUnit, toUnit, category);
    if (r === null) { setError("Conversion not available."); return; }
    setConverted(r);
  }, [value, fromUnit, toUnit, category]);

  const handleReset = () => { setCategory("length"); setFromUnit("m"); setToUnit("km"); setValue("100"); setConverted(null); setError(null); };
  const handleSwap = () => { setFromUnit(toUnit); setToUnit(fromUnit); };

  const handleCategoryChange = (c: UnitCategory) => {
    setCategory(c);
    const newUnits = getUnitsForCategory(c);
    if (newUnits.length >= 2) { setFromUnit(newUnits[0].key); setToUnit(newUnits[1].key); }
    setConverted(null); setError(null);
  };

  return (
    <Container className="py-12">
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">{title}</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">{description}</p>
      </div>
      <ErrorAlert error={error} />
      <div className="mt-8 space-y-4">
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="mb-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Unit Converter</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-zinc-500 mb-2">Category</label>
              <div className="flex flex-wrap gap-2">
                {getUnitCategories().map((c) => (
                  <button key={c} onClick={() => handleCategoryChange(c)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${category === c ? "bg-blue-600 text-white" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"}`}>
                    {c.charAt(0).toUpperCase() + c.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-xs text-zinc-500 mb-1">From</label>
                <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}
                  className="block w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100">
                  {units.map((u) => <option key={u.key} value={u.key}>{u.label} ({u.key})</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-zinc-500 mb-1">To</label>
                <select value={toUnit} onChange={(e) => setToUnit(e.target.value)}
                  className="block w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100">
                  {units.map((u) => <option key={u.key} value={u.key}>{u.label} ({u.key})</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs text-zinc-500 mb-1">Value</label>
              <input type="number" value={value} onChange={(e) => setValue(e.target.value)}
                className="block w-full max-w-xs rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm font-mono dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100" />
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button onClick={doConvert} className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors">Convert</button>
            <button onClick={handleSwap} className="rounded-lg border border-zinc-200 bg-white px-5 py-2 text-sm font-semibold text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors">Swap</button>
            <button onClick={handleReset} className="rounded-lg border border-zinc-200 bg-white px-5 py-2 text-sm font-semibold text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors">Reset</button>
          </div>
        </div>
        {converted !== null && (
          <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Result</h3>
              <button onClick={() => handleCopy(`${value} ${fromUnit} = ${converted} ${toUnit}`)} className="text-xs text-blue-600 hover:text-blue-500 dark:text-blue-400">{copied ? "Copied!" : "Copy"}</button>
            </div>
            <div className="rounded-lg bg-zinc-50 p-4 text-center dark:bg-zinc-950">
              <p className="text-2xl font-mono font-bold text-zinc-900 dark:text-zinc-50">{value} {fromUnit}</p>
              <p className="text-lg text-zinc-500 mt-1">=</p>
              <p className="text-3xl font-mono font-bold text-blue-600 dark:text-blue-400 mt-1">{converted} {toUnit}</p>
            </div>
          </div>
        )}
      </div>
      <FaqSection faqs={faqs} />
    </Container>
  );
}
