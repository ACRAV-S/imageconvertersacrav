"use client";

import { useState, useCallback } from "react";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import Container from "@/components/common/Container";
import { calculateAge } from "@/lib/calculators/calculators";
import ErrorAlert from "@/components/tools/ErrorAlert";
import FaqSection from "@/components/tools/FaqSection";
import type { FaqItem } from "@/components/tools/FaqSection";

export default function AgeCalcTool({ title, description, faqs }: { title: string; description: string; faqs: FaqItem[] }) {
  const [birthDate, setBirthDate] = useState("1990-01-01");
  const [result, setResult] = useState<ReturnType<typeof calculateAge> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { copied, copy: handleCopy } = useCopyToClipboard();

  const calculate = useCallback(() => {
    setError(null);
    const date = new Date(birthDate);
    if (isNaN(date.getTime()) || date > new Date()) {
      setError("Please enter a valid past date."); return;
    }
    setResult(calculateAge(date));
  }, [birthDate]);

  const handleReset = () => { setBirthDate("1990-01-01"); setResult(null); setError(null); };

  return (
    <Container className="py-12">
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">{title}</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">{description}</p>
      </div>
      <ErrorAlert error={error} />
      <div className="mt-8 space-y-4">
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="mb-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Date of Birth</h3>
          <input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)}
            className="block w-full max-w-xs rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100" />
          <div className="mt-4 flex flex-wrap gap-2">
            <button onClick={calculate} className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors">Calculate Age</button>
            <button onClick={handleReset} className="rounded-lg border border-zinc-200 bg-white px-5 py-2 text-sm font-semibold text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors">Reset</button>
          </div>
        </div>
        {result && (
          <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Your Age</h3>
              <button onClick={() => handleCopy(`Age: ${result.years} years, ${result.months} months, ${result.days} days (${result.totalDays} total days)`)} className="text-xs text-blue-600 hover:text-blue-500 dark:text-blue-400">{copied ? "Copied!" : "Copy"}</button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="rounded-lg bg-zinc-50 p-3 text-center dark:bg-zinc-950"><p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{result.years}</p><p className="text-xs text-zinc-500">Years</p></div>
              <div className="rounded-lg bg-zinc-50 p-3 text-center dark:bg-zinc-950"><p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{result.months}</p><p className="text-xs text-zinc-500">Months</p></div>
              <div className="rounded-lg bg-zinc-50 p-3 text-center dark:bg-zinc-950"><p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{result.days}</p><p className="text-xs text-zinc-500">Days</p></div>
              <div className="rounded-lg bg-zinc-50 p-3 text-center dark:bg-zinc-950"><p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{result.totalDays.toLocaleString()}</p><p className="text-xs text-zinc-500">Total Days</p></div>
            </div>
          </div>
        )}
      </div>
      <FaqSection faqs={faqs} />
    </Container>
  );
}
