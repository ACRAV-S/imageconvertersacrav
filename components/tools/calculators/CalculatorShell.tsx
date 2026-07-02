"use client";

import { useState, useCallback } from "react";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import Container from "@/components/common/Container";
import {
  calculatePercentage, calculatePercentageChange, calculateGst,
  calculateDiscount, calculateTip, calculateBMI, calculateFuelCost,
  calculateEmi, calculateLoan,
} from "@/lib/calculators/calculators";
import ErrorAlert from "@/components/tools/ErrorAlert";
import FaqSection from "@/components/tools/FaqSection";
import type { FaqItem } from "@/components/tools/FaqSection";

type CalcMode = "percentage" | "percentage-change" | "gst" | "discount" | "tip" | "bmi" | "fuel-cost" | "emi" | "loan";

interface CalculatorShellProps {
  title: string;
  description: string;
  faqs: FaqItem[];
  mode: CalcMode;
}

export default function CalculatorShell({ title, description, faqs, mode }: CalculatorShellProps) {
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [result, setResult] = useState<Record<string, string> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { copied, copy: handleCopy } = useCopyToClipboard();

  const set = (key: string, v: string) => setInputs((p) => ({ ...p, [key]: v }));

  const defaults: Record<string, string> = {
    value: "200", percent: "15", oldValue: "100", newValue: "150",
    amount: "1000", rate: "18", price: "500", discount: "20",
    bill: "100", tipPercent: "15", split: "2",
    weight: "70", height: "175", bmiUnit: "metric",
    distance: "100", mileage: "15", fuelPrice: "1.50",
    principal: "100000", annualRate: "8.5", months: "60", years: "5",
  };

  const calculate = useCallback(() => {
    setError(null);
    setResult(null);
    try {
      let res: Record<string, string> = {};
      switch (mode) {
        case "percentage": {
          const v = parseFloat(inputs.value || "0");
          const p = parseFloat(inputs.percent || "0");
          if (isNaN(v) || isNaN(p)) { setError("Please enter valid numbers."); return; }
          const r = calculatePercentage(v, p);
          res = { [`${p}% of ${v}`]: String(r.result), "Value": String(r.percentOf) };
          break;
        }
        case "percentage-change": {
          const o = parseFloat(inputs.oldValue || "0");
          const n = parseFloat(inputs.newValue || "0");
          if (isNaN(o) || isNaN(n)) { setError("Please enter valid numbers."); return; }
          const r = calculatePercentageChange(o, n);
          res = { "Change": String(r.change), "Percentage Change": `${r.percentChange}%` };
          break;
        }
        case "gst": {
          const a = parseFloat(inputs.amount || "0");
          const r = parseFloat(inputs.rate || "0");
          if (isNaN(a) || isNaN(r)) { setError("Please enter valid numbers."); return; }
          const g = calculateGst(a, r);
          res = { "Base Amount": String(g.baseAmount), "GST Amount": String(g.gst), "Total": String(g.total) };
          break;
        }
        case "discount": {
          const p = parseFloat(inputs.price || "0");
          const d = parseFloat(inputs.discount || "0");
          if (isNaN(p) || isNaN(d)) { setError("Please enter valid numbers."); return; }
          const r = calculateDiscount(p, d);
          res = { "You Save": `$${r.savings}`, "Final Price": `$${r.finalPrice}`, "Discount": `${r.discountPercent}%` };
          break;
        }
        case "tip": {
          const b = parseFloat(inputs.bill || "0");
          const t = parseFloat(inputs.tipPercent || "0");
          const s = parseFloat(inputs.split || "1");
          if (isNaN(b) || isNaN(t) || isNaN(s) || s < 1) { setError("Please enter valid values."); return; }
          const r = calculateTip(b, t, s);
          res = { "Tip Amount": `$${r.tip}`, "Total": `$${r.total}`, "Per Person": `$${r.perPerson}` };
          break;
        }
        case "bmi": {
          const w = parseFloat(inputs.weight || "0");
          const h = parseFloat(inputs.height || "0");
          const u = inputs.bmiUnit || "metric";
          if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) { setError("Please enter valid values."); return; }
          const r = calculateBMI(w, h, u as "metric" | "imperial");
          res = { "BMI": String(r.bmi), "Category": r.category };
          break;
        }
        case "fuel-cost": {
          const d = parseFloat(inputs.distance || "0");
          const m = parseFloat(inputs.mileage || "0");
          const p = parseFloat(inputs.fuelPrice || "0");
          if (isNaN(d) || isNaN(m) || isNaN(p) || d <= 0 || m <= 0) { setError("Please enter valid values."); return; }
          const r = calculateFuelCost(d, m, p);
          res = { "Fuel Needed": `${r.fuelNeeded} L`, "Total Cost": `$${r.cost}` };
          break;
        }
        case "emi": {
          const p = parseFloat(inputs.principal || "0");
          const r = parseFloat(inputs.annualRate || "0");
          const m = parseFloat(inputs.months || "0");
          if (isNaN(p) || isNaN(r) || isNaN(m) || p <= 0 || m <= 0) { setError("Please enter valid values."); return; }
          const e = calculateEmi(p, r, m);
          res = { "Monthly EMI": `$${e.emi}`, "Total Interest": `$${e.totalInterest}`, "Total Payment": `$${e.totalPayment}` };
          break;
        }
        case "loan": {
          const p = parseFloat(inputs.principal || "0");
          const r = parseFloat(inputs.annualRate || "0");
          const y = parseFloat(inputs.years || "0");
          if (isNaN(p) || isNaN(r) || isNaN(y) || p <= 0 || y <= 0) { setError("Please enter valid values."); return; }
          const l = calculateLoan(p, r, y);
          res = { "Monthly Payment": `$${l.monthlyPayment}`, "Total Interest": `$${l.totalInterest}`, "Total Payment": `$${l.totalPayment}` };
          break;
        }
      }
      setResult(res);
    } catch (e) { setError((e as Error).message); }
  }, [mode, inputs]);

  const handleReset = () => {
    setInputs({}); setResult(null); setError(null);
  };

  const handleSample = () => {
    setInputs({ ...defaults }); setResult(null); setError(null);
  };

  const fields: { key: string; label: string; type?: string; options?: { value: string; label: string }[] }[] = [];
  switch (mode) {
    case "percentage": fields.push({ key: "value", label: "Value" }, { key: "percent", label: "Percentage (%)" }); break;
    case "percentage-change": fields.push({ key: "oldValue", label: "Old Value" }, { key: "newValue", label: "New Value" }); break;
    case "gst": fields.push({ key: "amount", label: "Total Amount (incl. GST)" }, { key: "rate", label: "GST Rate (%)" }); break;
    case "discount": fields.push({ key: "price", label: "Original Price ($)" }, { key: "discount", label: "Discount (%)" }); break;
    case "tip": fields.push({ key: "bill", label: "Bill Amount ($)" }, { key: "tipPercent", label: "Tip (%)" }, { key: "split", label: "Split Between" }); break;
    case "bmi": fields.push(
      { key: "weight", label: "Weight" },
      { key: "height", label: "Height" },
      { key: "bmiUnit", label: "Unit", type: "select", options: [{ value: "metric", label: "Metric (kg/cm)" }, { value: "imperial", label: "Imperial (lb/in)" }] },
    ); break;
    case "fuel-cost": fields.push({ key: "distance", label: "Distance (km)" }, { key: "mileage", label: "Mileage (km/L)" }, { key: "fuelPrice", label: "Fuel Price ($/L)" }); break;
    case "emi": fields.push({ key: "principal", label: "Loan Amount ($)" }, { key: "annualRate", label: "Annual Interest Rate (%)" }, { key: "months", label: "Tenure (Months)" }); break;
    case "loan": fields.push({ key: "principal", label: "Loan Amount ($)" }, { key: "annualRate", label: "Annual Interest Rate (%)" }, { key: "years", label: "Tenure (Years)" }); break;
  }

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
            {fields.map((f) => (
              <div key={f.key}>
                <label className="block text-xs text-zinc-500 mb-1">{f.label}</label>
                {f.type === "select" ? (
                  <select value={inputs[f.key] || defaults[f.key] || ""} onChange={(e) => set(f.key, e.target.value)}
                    className="block w-full max-w-xs rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100">
                    {(f.options || []).map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                ) : (
                  <input type="number" value={inputs[f.key] ?? ""} onChange={(e) => set(f.key, e.target.value)}
                    placeholder={defaults[f.key] || "0"}
                    className="block w-full max-w-xs rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm font-mono dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100" />
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button onClick={calculate} className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors">Calculate</button>
            <button onClick={handleReset} className="rounded-lg border border-zinc-200 bg-white px-5 py-2 text-sm font-semibold text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors">Reset</button>
            <button onClick={handleSample} className="rounded-lg border border-zinc-200 bg-white px-5 py-2 text-sm font-semibold text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors">Load sample</button>
          </div>
        </div>

        {result && (
          <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Result</h3>
              <button onClick={() => handleCopy(Object.entries(result).map(([k, v]) => `${k}: ${v}`).join("\n"))} className="text-xs text-blue-600 hover:text-blue-500 dark:text-blue-400">{copied ? "Copied!" : "Copy"}</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {Object.entries(result).map(([key, value]) => (
                <div key={key} className="rounded-lg bg-zinc-50 p-3 dark:bg-zinc-950">
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{key}</p>
                  <p className="mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-50 break-all">{value}</p>
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
