"use client";

import { useState, useCallback } from "react";
import Container from "@/components/common/Container";
import { hexToRgb, rgbToHex, hexToHsl, rgbToHsl, hslToRgb, isValidHex, isValidRgb } from "@/lib/color/colorUtils";

interface FaqItem { question: string; answer: string; }

type ConverterMode = "hex-to-rgb" | "rgb-to-hex" | "hex-to-hsl" | "rgb-to-hsl";

interface ColorToolShellProps {
  title: string;
  description: string;
  faqs: FaqItem[];
  mode: ConverterMode;
}

export default function ColorToolShell({ title, description, faqs, mode }: ColorToolShellProps) {
  const [hexInput, setHexInput] = useState("#3498db");
  const [rInput, setRInput] = useState("52");
  const [gInput, setGInput] = useState("152");
  const [bInput, setBInput] = useState("219");
  const [output, setOutput] = useState("");
  const [previewColor, setPreviewColor] = useState("#3498db");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [copiedCss, setCopiedCss] = useState(false);

  const needsHex = mode === "hex-to-rgb" || mode === "hex-to-hsl";
  const needsRgb = mode === "rgb-to-hex" || mode === "rgb-to-hsl";

  const convert = useCallback(() => {
    setError(null);
    setOutput("");

    try {
      if (needsHex) {
        const clean = hexInput.replace(/^#/, "").trim();
        if (!isValidHex(hexInput)) { setError("Invalid hex color. Use format #RGB or #RRGGBB."); return; }
        const hex = `#${clean.length === 3 ? clean.replace(/./g, "$&$&") : clean}`;
        setPreviewColor(hex);

        if (mode === "hex-to-rgb") {
          const rgb = hexToRgb(hex)!;
          const str = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
          setOutput(str);
        } else {
          const hsl = hexToHsl(hex)!;
          const str = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
          setOutput(str);
        }
      }

      if (needsRgb) {
        const r = parseInt(rInput, 10);
        const g = parseInt(gInput, 10);
        const b = parseInt(bInput, 10);
        if (isNaN(r) || isNaN(g) || isNaN(b) || !isValidRgb(r, g, b)) {
          setError("Invalid RGB values. Each channel must be 0-255."); return;
        }
        const hex = rgbToHex(r, g, b);
        setPreviewColor(hex);

        if (mode === "rgb-to-hex") {
          setOutput(hex);
        } else {
          const hsl = rgbToHsl(r, g, b);
          const str = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
          setOutput(str);
        }
      }
    } catch (e) {
      setError((e as Error).message);
    }
  }, [mode, hexInput, rInput, gInput, bInput, needsHex, needsRgb]);

  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); }
    catch { setError("Failed to copy."); }
  };

  const handleCopyCss = async () => {
    let css = "";
    if (mode === "hex-to-rgb") css = `color: ${output};`;
    else if (mode === "rgb-to-hex") css = `color: ${output};`;
    else if (mode === "hex-to-hsl") css = `color: ${output};`;
    else css = `color: ${rgbToHex(parseInt(rInput), parseInt(gInput), parseInt(bInput))};`;
    try { await navigator.clipboard.writeText(css); setCopiedCss(true); setTimeout(() => setCopiedCss(false), 2000); }
    catch { setError("Failed to copy CSS."); }
  };

  const handleReset = () => {
    setHexInput("#3498db");
    setRInput("52"); setGInput("152"); setBInput("219");
    setOutput(""); setError(null); setPreviewColor("#3498db");
  };

  return (
    <Container className="py-12">
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">{title}</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">{description}</p>
      </div>

      {error && (
        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/50 dark:text-red-400">{error}</div>
      )}

      <div className="mt-8 space-y-4">
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="mb-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            {needsHex ? "Enter HEX Color" : "Enter RGB Values"}
          </h3>

          {needsHex && (
            <div className="mb-4">
              <input
                value={hexInput}
                onChange={(e) => setHexInput(e.target.value)}
                placeholder="#3498db"
                className="block w-full max-w-xs rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm font-mono dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
              />
            </div>
          )}

          {needsRgb && (
            <div className="flex flex-wrap gap-3 mb-4">
              <div>
                <label className="block text-xs text-zinc-500 mb-1">R</label>
                <input type="number" min={0} max={255} value={rInput} onChange={(e) => setRInput(e.target.value)}
                  className="w-20 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm font-mono dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100" />
              </div>
              <div>
                <label className="block text-xs text-zinc-500 mb-1">G</label>
                <input type="number" min={0} max={255} value={gInput} onChange={(e) => setGInput(e.target.value)}
                  className="w-20 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm font-mono dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100" />
              </div>
              <div>
                <label className="block text-xs text-zinc-500 mb-1">B</label>
                <input type="number" min={0} max={255} value={bInput} onChange={(e) => setBInput(e.target.value)}
                  className="w-20 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm font-mono dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100" />
              </div>
            </div>
          )}

          <div className="flex items-center gap-4 mb-4">
            <div className="h-10 w-20 rounded-lg border border-zinc-200 dark:border-zinc-700" style={{ backgroundColor: previewColor }} />
            <span className="text-xs text-zinc-400 dark:text-zinc-500">{previewColor}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            <button onClick={convert} className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors">Convert</button>
            <button onClick={handleReset} className="rounded-lg border border-zinc-200 bg-white px-5 py-2 text-sm font-semibold text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors">Reset</button>
          </div>
        </div>

        {output && (
          <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Result</h3>
              <div className="flex gap-2">
                <button onClick={handleCopy} className="text-xs text-blue-600 hover:text-blue-500 dark:text-blue-400">{copied ? "Copied!" : "Copy"}</button>
                <button onClick={handleCopyCss} className="text-xs text-blue-600 hover:text-blue-500 dark:text-blue-400">{copiedCss ? "Copied!" : "Copy CSS"}</button>
              </div>
            </div>
            <div className="rounded-lg bg-zinc-50 p-4 font-mono text-sm dark:bg-zinc-950 dark:text-zinc-200">{output}</div>
          </div>
        )}
      </div>

      <RelatedTools current={mode.replace(/-/g, "-")} />

      <section className="mt-16 border-t border-zinc-100 pt-12 dark:border-zinc-800">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Frequently Asked Questions</h2>
        <div className="mt-8 space-y-6">{faqs.map((faq, i) => (
          <div key={i}><h3 className="font-semibold text-zinc-900 dark:text-zinc-50">{faq.question}</h3><p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{faq.answer}</p></div>
        ))}</div>
      </section>
    </Container>
  );
}

function RelatedTools({ current }: { current: string }) {
  const links = [
    { slug: "hex-to-rgb", label: "HEX to RGB" },
    { slug: "rgb-to-hex", label: "RGB to HEX" },
    { slug: "hex-to-hsl", label: "HEX to HSL" },
    { slug: "rgb-to-hsl", label: "RGB to HSL" },
  ].filter((l) => l.slug !== current);

  return (
    <div className="mt-6 flex flex-wrap gap-2">
      <span className="text-xs text-zinc-400 dark:text-zinc-500 self-center">Related:</span>
      {links.map((l) => (
        <a key={l.slug} href={`/tools/${l.slug}`} className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700 transition-colors">{l.label}</a>
      ))}
    </div>
  );
}
