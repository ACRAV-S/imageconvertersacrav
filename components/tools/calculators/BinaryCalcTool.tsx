"use client";

import { useState, useCallback } from "react";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import Container from "@/components/common/Container";
import {
  binaryAdd, binarySubtract, binaryMultiply, binaryDivide,
  binaryAnd, binaryOr, binaryXor, isValidBinary,
} from "@/lib/calculators/calculators";
import ErrorAlert from "@/components/tools/ErrorAlert";
import FaqSection from "@/components/tools/FaqSection";
import type { FaqItem } from "@/components/tools/FaqSection";

export default function BinaryCalcTool({ title, description, faqs }: { title: string; description: string; faqs: FaqItem[] }) {
  const [binaryA, setBinaryA] = useState("1010");
  const [binaryB, setBinaryB] = useState("0011");
  const [operation, setOperation] = useState("add");
  const [result, setResult] = useState<string | null>(null);
  const [decA, setDecA] = useState<number | null>(null);
  const [decB, setDecB] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { copied, copy: handleCopy } = useCopyToClipboard();

  const calculate = useCallback(() => {
    setError(null); setResult(null);
    const a = binaryA.trim(); const b = binaryB.trim();
    if (!isValidBinary(a) || !isValidBinary(b)) { setError("Please enter valid binary numbers (0s and 1s only)."); return; }

    setDecA(parseInt(a, 2)); setDecB(parseInt(b, 2));

    try {
      switch (operation) {
        case "add": setResult(binaryAdd(a, b)); break;
        case "subtract": setResult(binarySubtract(a, b)); break;
        case "multiply": setResult(binaryMultiply(a, b)); break;
        case "divide": { const r = binaryDivide(a, b); if (!r) { setError("Division by zero."); return; } setResult(`${r.quotient} (R: ${r.remainder})`); break; }
        case "and": setResult(binaryAnd(a, b)); break;
        case "or": setResult(binaryOr(a, b)); break;
        case "xor": setResult(binaryXor(a, b)); break;
      }
    } catch (e) { setError((e as Error).message); }
  }, [binaryA, binaryB, operation]);

  const handleReset = () => { setBinaryA("1010"); setBinaryB("0011"); setOperation("add"); setResult(null); setDecA(null); setDecB(null); setError(null); };

  const ops = [
    { key: "add", label: "A + B" }, { key: "subtract", label: "A - B" },
    { key: "multiply", label: "A × B" }, { key: "divide", label: "A ÷ B" },
    { key: "and", label: "A AND B" }, { key: "or", label: "A OR B" },
    { key: "xor", label: "A XOR B" },
  ];

  return (
    <Container className="py-12">
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">{title}</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">{description}</p>
      </div>
      <ErrorAlert error={error} />
      <div className="mt-8 space-y-4">
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="mb-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Binary Calculator</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-zinc-500 mb-1">Binary A</label>
              <input type="text" value={binaryA} onChange={(e) => setBinaryA(e.target.value)}
                className="block w-full max-w-xs rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm font-mono dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100" />
              {decA !== null && <p className="text-xs text-zinc-400 mt-1">Decimal: {decA}</p>}
            </div>
            <div>
              <label className="block text-xs text-zinc-500 mb-1">Binary B</label>
              <input type="text" value={binaryB} onChange={(e) => setBinaryB(e.target.value)}
                className="block w-full max-w-xs rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm font-mono dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100" />
              {decB !== null && <p className="text-xs text-zinc-400 mt-1">Decimal: {decB}</p>}
            </div>
            <div>
              <label className="block text-xs text-zinc-500 mb-2">Operation</label>
              <div className="flex flex-wrap gap-2">
                {ops.map((op) => (
                  <button key={op.key} onClick={() => setOperation(op.key)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${operation === op.key ? "bg-blue-600 text-white" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"}`}>
                    {op.label}
                  </button>
                ))}
              </div>
            </div>
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
              <button onClick={() => handleCopy(`${binaryA} (${decA}) ${operation} ${binaryB} (${decB}) = ${result}${operation !== "divide" ? ` (${parseInt(result, 2)})` : ""}`)} className="text-xs text-blue-600 hover:text-blue-500 dark:text-blue-400">{copied ? "Copied!" : "Copy"}</button>
            </div>
            <div className="rounded-lg bg-zinc-50 p-4 dark:bg-zinc-950">
              <p className="text-xs text-zinc-500 mb-1">Binary Result</p>
              <p className="text-lg font-mono font-bold text-zinc-900 dark:text-zinc-50 break-all">{result}</p>
              {operation !== "divide" && (
                <><p className="text-xs text-zinc-500 mt-2 mb-1">Decimal</p><p className="text-lg font-mono font-bold text-blue-600 dark:text-blue-400">{parseInt(result, 2).toLocaleString()}</p></>
              )}
            </div>
          </div>
        )}
      </div>
      <FaqSection faqs={faqs} />
    </Container>
  );
}
