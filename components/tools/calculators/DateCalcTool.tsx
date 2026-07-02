"use client";

import { useState, useCallback } from "react";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import Container from "@/components/common/Container";
import { calculateDateDiff, calculateTimeDuration } from "@/lib/calculators/calculators";
import ErrorAlert from "@/components/tools/ErrorAlert";
import FaqSection from "@/components/tools/FaqSection";
import type { FaqItem } from "@/components/tools/FaqSection";

type DateMode = "date-diff" | "time-duration";

export default function DateCalcTool({ title, description, faqs, mode }: { title: string; description: string; faqs: FaqItem[]; mode: DateMode }) {
  const [date1, setDate1] = useState("2024-01-01");
  const [date2, setDate2] = useState("2024-12-31");
  const [time1, setTime1] = useState("09:00");
  const [time2, setTime2] = useState("17:00");
  const [result, setResult] = useState<Record<string, string> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { copied, copy: handleCopy } = useCopyToClipboard();

  const calculate = useCallback(() => {
    setError(null); setResult(null);
    try {
      if (mode === "date-diff") {
        const d1 = new Date(date1); const d2 = new Date(date2);
        if (isNaN(d1.getTime()) || isNaN(d2.getTime())) { setError("Please enter valid dates."); return; }
        const r = calculateDateDiff(d1, d2);
        setResult({ "Years": String(r.years), "Months": String(r.months), "Days": String(r.days), "Total Days": String(r.totalDays), "Weeks": String(r.weeks), "Hours": String(r.hours) });
      } else {
        const r = calculateTimeDuration(time1, time2);
        if (!r) { setError("Please enter valid times (HH:MM)."); return; }
        setResult({ "Hours": String(r.hours), "Minutes": String(r.minutes), "Total Minutes": String(r.totalMinutes) });
      }
    } catch (e) { setError((e as Error).message); }
  }, [mode, date1, date2, time1, time2]);

  const handleReset = () => { setDate1("2024-01-01"); setDate2("2024-12-31"); setTime1("09:00"); setTime2("17:00"); setResult(null); setError(null); };

  return (
    <Container className="py-12">
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">{title}</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">{description}</p>
      </div>
      <ErrorAlert error={error} />
      <div className="mt-8 space-y-4">
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="mb-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Input</h3>
          <div className="space-y-3">
            {mode === "date-diff" ? (
              <>
                <div><label className="block text-xs text-zinc-500 mb-1">Start Date</label><input type="date" value={date1} onChange={(e) => setDate1(e.target.value)} className="block w-full max-w-xs rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100" /></div>
                <div><label className="block text-xs text-zinc-500 mb-1">End Date</label><input type="date" value={date2} onChange={(e) => setDate2(e.target.value)} className="block w-full max-w-xs rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100" /></div>
              </>
            ) : (
              <>
                <div><label className="block text-xs text-zinc-500 mb-1">Start Time</label><input type="time" value={time1} onChange={(e) => setTime1(e.target.value)} className="block w-full max-w-xs rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100" /></div>
                <div><label className="block text-xs text-zinc-500 mb-1">End Time</label><input type="time" value={time2} onChange={(e) => setTime2(e.target.value)} className="block w-full max-w-xs rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100" /></div>
              </>
            )}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button onClick={calculate} className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors">Calculate</button>
            <button onClick={handleReset} className="rounded-lg border border-zinc-200 bg-white px-5 py-2 text-sm font-semibold text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors">Reset</button>
          </div>
        </div>
        {result && (
          <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Result</h3>
              <button onClick={() => handleCopy(Object.entries(result).map(([k, v]) => `${k}: ${v}`).join("\n"))} className="text-xs text-blue-600 hover:text-blue-500 dark:text-blue-400">{copied ? "Copied!" : "Copy"}</button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Object.entries(result).map(([key, value]) => (
                <div key={key} className="rounded-lg bg-zinc-50 p-3 text-center dark:bg-zinc-950">
                  <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{value}</p>
                  <p className="text-xs text-zinc-500">{key}</p>
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
