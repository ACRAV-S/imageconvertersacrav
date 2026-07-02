"use client";

import { useState, useCallback } from "react";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import Container from "@/components/common/Container";
import { generateGradientCss } from "@/lib/color/colorUtils";
import ErrorAlert from "@/components/tools/ErrorAlert";
import FaqSection, { FaqItem } from "@/components/tools/FaqSection";

interface GradientStop { id: string; color: string; position: number; }

interface GradientToolProps {
  title: string;
  description: string;
  faqs: FaqItem[];
  emphasizeCss?: boolean;
}

export default function GradientTool({ title, description, faqs, emphasizeCss }: GradientToolProps) {
  const [gradientType, setGradientType] = useState<"linear" | "radial" | "conic">("linear");
  const [angle, setAngle] = useState("90deg");
  const [stops, setStops] = useState<GradientStop[]>([
    { id: crypto.randomUUID(), color: "#ff6b6b", position: 0 },
    { id: crypto.randomUUID(), color: "#4ecdc4", position: 50 },
    { id: crypto.randomUUID(), color: "#45b7d1", position: 100 },
  ]);
  const { copied, copy: handleCopy } = useCopyToClipboard();
  const [error, setError] = useState<string | null>(null);

  const gradientCss = generateGradientCss(gradientType, stops, angle);

  const handleReset = () => {
    setGradientType("linear");
    setAngle("90deg");
    setStops([
      { id: crypto.randomUUID(), color: "#ff6b6b", position: 0 },
      { id: crypto.randomUUID(), color: "#4ecdc4", position: 50 },
      { id: crypto.randomUUID(), color: "#45b7d1", position: 100 },
    ]);
    setError(null);
  };

  const addStop = () => {
    if (stops.length >= 10) return;
    const pos = Math.min(100, (stops[stops.length - 1]?.position ?? 0) + 10);
    setStops([...stops, { id: crypto.randomUUID(), color: "#cccccc", position: pos }]);
  };

  const removeStop = (index: number) => {
    if (stops.length <= 2) return;
    setStops(stops.filter((_, i) => i !== index));
  };

  const updateStop = (index: number, updates: Partial<GradientStop>) => {
    setStops(stops.map((s, i) => (i === index ? { ...s, ...updates } : s)));
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
          {emphasizeCss && (
            <p className="mb-4 text-xs text-amber-600 dark:text-amber-400">
              This generator creates CSS gradient code. Adjust the stops and type below to generate your gradient.
            </p>
          )}

          <div className="mb-4 space-y-4">
            <div>
              <label className="block text-xs text-zinc-500 dark:text-zinc-400 mb-2">Gradient Type</label>
              <div className="flex flex-wrap gap-2">
                {(["linear", "radial", "conic"] as const).map((t) => (
                  <button key={t} onClick={() => setGradientType(t)}
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${gradientType === t ? "bg-blue-600 text-white" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"}`}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs text-zinc-500 dark:text-zinc-400 mb-1">
                {gradientType === "linear" ? "Angle" : gradientType === "radial" ? "Shape" : "From"}:
                <span className="ml-1 font-mono">{angle}</span>
              </label>
              <input
                type="text"
                value={angle}
                onChange={(e) => setAngle(e.target.value)}
                placeholder={gradientType === "linear" ? "90deg" : gradientType === "radial" ? "circle" : "0deg"}
                className="block w-full max-w-xs rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm font-mono dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
              />
            </div>
          </div>

          <div className="h-32 rounded-lg border border-zinc-200 dark:border-zinc-700" style={{ background: gradientCss }} />

          <div className="mt-4 space-y-3">
            {stops.map((stop, i) => (
              <div key={stop.id} className="flex flex-wrap items-center gap-2">
                <input type="color" value={stop.color} onChange={(e) => updateStop(i, { color: e.target.value })}
                  className="h-8 w-12 rounded border border-zinc-200 dark:border-zinc-700 cursor-pointer" />
                <input type="number" min={0} max={100} value={stop.position} onChange={(e) => updateStop(i, { position: Math.max(0, Math.min(100, Number(e.target.value))) })}
                  className="w-16 rounded-lg border border-zinc-200 bg-zinc-50 px-2 py-1 text-sm font-mono dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100" />
                <span className="text-xs text-zinc-400">%</span>
                {stops.length > 2 && (
                  <button onClick={() => removeStop(i)} className="text-xs text-red-500 hover:text-red-400">Remove</button>
                )}
              </div>
            ))}
            {stops.length < 10 && (
              <button onClick={addStop} className="text-xs text-blue-600 hover:text-blue-500 dark:text-blue-400">+ Add stop</button>
            )}
          </div>
          <button onClick={handleReset} className="mt-3 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors">Reset</button>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">CSS Code</h3>
            <button onClick={() => handleCopy(gradientCss)} className="text-xs text-blue-600 hover:text-blue-500 dark:text-blue-400">{copied ? "Copied!" : "Copy CSS"}</button>
          </div>
          <pre className="rounded-lg bg-zinc-50 p-3 text-xs font-mono text-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 overflow-x-auto whitespace-pre-wrap">{gradientCss};</pre>
        </div>
      </div>

      <FaqSection faqs={faqs} />
    </Container>
  );
}
