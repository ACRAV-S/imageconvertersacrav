"use client";

import { useState } from "react";
import Container from "@/components/common/Container";
import { hexToRgb, rgbToHsl, isValidHex } from "@/lib/color/colorUtils";
import ErrorAlert from "@/components/tools/ErrorAlert";
import FaqSection, { FaqItem } from "@/components/tools/FaqSection";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

interface ColorPickerToolProps {
  title: string;
  description: string;
  faqs: FaqItem[];
}

export default function ColorPickerTool({ title, description, faqs }: ColorPickerToolProps) {
  const [color, setColor] = useState("#3498db");
  const { copied: copiedHex, copy: copyHex } = useCopyToClipboard();
  const { copied: copiedRgb, copy: copyRgb } = useCopyToClipboard();
  const { copied: copiedHsl, copy: copyHsl } = useCopyToClipboard();

  const rgb = hexToRgb(color);
  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null;

  const handleReset = () => setColor("#3498db");

  return (
    <Container className="py-12">
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">{title}</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">{description}</p>
      </div>

      <div className="mt-8 space-y-4">
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="mb-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Pick a Color</h3>
          <input
            type="color"
            value={isValidHex(color) ? color : "#000000"}
            onChange={(e) => setColor(e.target.value)}
            className="h-20 w-full cursor-pointer rounded-lg border border-zinc-200 dark:border-zinc-700"
          />
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg bg-zinc-50 p-3 dark:bg-zinc-950">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">HEX</p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-sm font-mono text-zinc-900 dark:text-zinc-50">{color}</span>
                <button onClick={() => copyHex(color)} className="text-xs text-blue-600 hover:text-blue-500 dark:text-blue-400">{copiedHex ? "Copied!" : "Copy"}</button>
              </div>
            </div>
            <div className="rounded-lg bg-zinc-50 p-3 dark:bg-zinc-950">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">RGB</p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-sm font-mono text-zinc-900 dark:text-zinc-50">{rgb ? `${rgb.r}, ${rgb.g}, ${rgb.b}` : "-"}</span>
                <button onClick={() => rgb && copyRgb(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)} className="text-xs text-blue-600 hover:text-blue-500 dark:text-blue-400">{copiedRgb ? "Copied!" : "Copy"}</button>
              </div>
            </div>
            <div className="rounded-lg bg-zinc-50 p-3 dark:bg-zinc-950">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">HSL</p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-sm font-mono text-zinc-900 dark:text-zinc-50">{hsl ? `${hsl.h}°, ${hsl.s}%, ${hsl.l}%` : "-"}</span>
                <button onClick={() => hsl && copyHsl(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`)} className="text-xs text-blue-600 hover:text-blue-500 dark:text-blue-400">{copiedHsl ? "Copied!" : "Copy"}</button>
              </div>
            </div>
          </div>
          <button onClick={handleReset} className="mt-4 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors">Reset</button>
        </div>
      </div>

      <FaqSection faqs={faqs} />
    </Container>
  );
}
