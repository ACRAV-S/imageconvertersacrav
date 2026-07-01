"use client";

import { useState, useCallback } from "react";
import Container from "@/components/common/Container";
import { generateBoxShadowCss, generateBorderRadiusCss, generateGlassmorphismCss, generateNeumorphismCss } from "@/lib/color/colorUtils";

interface FaqItem { question: string; answer: string; }

type CssGenMode = "box-shadow" | "border-radius" | "glassmorphism" | "neumorphism";

interface CssGeneratorShellProps {
  title: string;
  description: string;
  faqs: FaqItem[];
  mode: CssGenMode;
}

export default function CssGeneratorShell({ title, description, faqs, mode }: CssGeneratorShellProps) {
  const [copied, setCopied] = useState(false);

  const boxShadowState = useState({ inset: false, offsetX: 4, offsetY: 4, blur: 10, spread: 0, color: "#00000040" });
  const [bs, setBs] = boxShadowState;

  const radiusState = useState({ topLeft: 10, topRight: 10, bottomRight: 10, bottomLeft: 10, unit: "px" as "px" | "%" });
  const [br, setBr] = radiusState;

  const glassState = useState({ backgroundOpacity: 0.15, blur: 10, saturation: 180, borderOpacity: 0.3, borderRadius: 12, shadowBlur: 30 });
  const [gl, setGl] = glassState;

  const neumorphState = useState({ baseColor: "#e0e0e0", borderRadius: 12, shadowBlur: 20, distance: 5, intensity: 0.8, inset: false });
  const [nm, setNm] = neumorphState;

  const setBsField = (field: string, value: unknown) => setBs((p) => ({ ...p, [field]: value }));
  const setBrField = (field: string, value: unknown) => setBr((p) => ({ ...p, [field]: value }));
  const setGlField = (field: string, value: unknown) => setGl((p) => ({ ...p, [field]: value }));
  const setNmField = (field: string, value: unknown) => setNm((p) => ({ ...p, [field]: value }));

  const getCss = useCallback(() => {
    switch (mode) {
      case "box-shadow": return generateBoxShadowCss(bs);
      case "border-radius": return generateBorderRadiusCss(br);
      case "glassmorphism": return generateGlassmorphismCss(gl);
      case "neumorphism": return generateNeumorphismCss(nm);
    }
  }, [mode, bs, br, gl, nm]);

  const previewStyle: Record<string, string> = {};
  if (mode === "box-shadow") { previewStyle.boxShadow = generateBoxShadowCss(bs); previewStyle.borderRadius = "12px"; previewStyle.width = "150px"; previewStyle.height = "150px"; previewStyle.background = "white"; }
  if (mode === "border-radius") { previewStyle.borderRadius = generateBorderRadiusCss(br); previewStyle.width = "150px"; previewStyle.height = "150px"; previewStyle.background = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"; }
  if (mode === "glassmorphism") {
    previewStyle.background = `rgba(255, 255, 255, ${gl.backgroundOpacity})`;
    previewStyle.backdropFilter = `blur(${gl.blur}px) saturate(${gl.saturation}%)`;
    previewStyle.WebkitBackdropFilter = `blur(${gl.blur}px) saturate(${gl.saturation}%)`;
    previewStyle.borderRadius = `${gl.borderRadius}px`;
    previewStyle.border = `1px solid rgba(255, 255, 255, ${gl.borderOpacity})`;
    previewStyle.boxShadow = `0 ${Math.max(4, gl.shadowBlur / 2)}px ${gl.shadowBlur}px rgba(0,0,0,0.1)`;
    previewStyle.width = "200px"; previewStyle.height = "150px";
  }
  if (mode === "neumorphism") {
    const nmCss = generateNeumorphismCss(nm);
    previewStyle.borderRadius = `${nm.borderRadius}px`;
    const d = nm.distance, b = nm.shadowBlur;
    const rgba = nm.baseColor.match(/\d+/g)?.map(Number) || [200, 200, 200];
    const dark = `rgba(${Math.max(0, rgba[0] - 100)}, ${Math.max(0, rgba[1] - 100)}, ${Math.max(0, rgba[2] - 100)}, ${nm.intensity})`;
    const light = `rgba(255, 255, 255, ${nm.intensity})`;
    previewStyle.boxShadow = nm.inset
      ? `inset ${d}px ${d}px ${b}px ${dark}, inset ${-d}px ${-d}px ${b}px ${light}`
      : `${d}px ${d}px ${b}px ${dark}, ${-d}px ${-d}px ${b}px ${light}`;
    previewStyle.background = nm.baseColor;
    previewStyle.width = "150px"; previewStyle.height = "150px";
  }

  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(getCss()); setCopied(true); setTimeout(() => setCopied(false), 2000); }
    catch {}
  };

  const handleReset = () => {
    setBs({ inset: false, offsetX: 4, offsetY: 4, blur: 10, spread: 0, color: "#00000040" });
    setBr({ topLeft: 10, topRight: 10, bottomRight: 10, bottomLeft: 10, unit: "px" });
    setGl({ backgroundOpacity: 0.15, blur: 10, saturation: 180, borderOpacity: 0.3, borderRadius: 12, shadowBlur: 30 });
    setNm({ baseColor: "#e0e0e0", borderRadius: 12, shadowBlur: 20, distance: 5, intensity: 0.8, inset: false });
  };

  const Slider = ({ label, value, min, max, step, onChange }: { label: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void }) => (
    <div>
      <label className="flex justify-between text-xs text-zinc-500 dark:text-zinc-400 mb-1">
        <span>{label}</span><span className="font-mono">{value}</span>
      </label>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full" />
    </div>
  );

  return (
    <Container className="py-12">
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">{title}</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">{description}</p>
      </div>

      <div className="mt-8 space-y-4">
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-center mb-6 bg-zinc-50 dark:bg-zinc-950 rounded-lg p-6 min-h-[180px]" style={mode === "glassmorphism" ? { backgroundImage: "linear-gradient(45deg, #667eea 0%, #764ba2 100%)" } : {}}>
            <div style={previewStyle} className="flex items-center justify-center text-xs text-zinc-500">
              {mode === "glassmorphism" && <span className="text-white/80 font-medium">Glassmorphism</span>}
            </div>
          </div>

          <div className="space-y-4">
            {mode === "box-shadow" && (
              <>
                <div className="flex items-center gap-2 mb-2">
                  <input type="checkbox" id="inset" checked={bs.inset} onChange={(e) => setBsField("inset", e.target.checked)} className="rounded" />
                  <label htmlFor="inset" className="text-sm text-zinc-600 dark:text-zinc-400">Inset</label>
                </div>
                <Slider label="Offset X" value={bs.offsetX} min={-50} max={50} step={1} onChange={(v) => setBsField("offsetX", v)} />
                <Slider label="Offset Y" value={bs.offsetY} min={-50} max={50} step={1} onChange={(v) => setBsField("offsetY", v)} />
                <Slider label="Blur" value={bs.blur} min={0} max={100} step={1} onChange={(v) => setBsField("blur", v)} />
                <Slider label="Spread" value={bs.spread} min={-50} max={50} step={1} onChange={(v) => setBsField("spread", v)} />
                <div>
                  <label className="block text-xs text-zinc-500 mb-1">Color</label>
                  <input type="color" value={bs.color} onChange={(e) => setBsField("color", e.target.value)} className="h-8 w-full rounded cursor-pointer" />
                </div>
              </>
            )}

            {mode === "border-radius" && (
              <>
                <Slider label="Top Left" value={br.topLeft} min={0} max={100} step={1} onChange={(v) => setBrField("topLeft", v)} />
                <Slider label="Top Right" value={br.topRight} min={0} max={100} step={1} onChange={(v) => setBrField("topRight", v)} />
                <Slider label="Bottom Right" value={br.bottomRight} min={0} max={100} step={1} onChange={(v) => setBrField("bottomRight", v)} />
                <Slider label="Bottom Left" value={br.bottomLeft} min={0} max={100} step={1} onChange={(v) => setBrField("bottomLeft", v)} />
                <div className="flex gap-2">
                  {(["px", "%"] as const).map((u) => (
                    <button key={u} onClick={() => setBrField("unit", u)}
                      className={`rounded-lg px-4 py-2 text-xs font-medium transition-colors ${br.unit === u ? "bg-blue-600 text-white" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"}`}>
                      {u}
                    </button>
                  ))}
                </div>
              </>
            )}

            {mode === "glassmorphism" && (
              <>
                <Slider label="Background Opacity" value={Math.round(gl.backgroundOpacity * 100)} min={0} max={100} step={1} onChange={(v) => setGlField("backgroundOpacity", v / 100)} />
                <Slider label="Blur" value={gl.blur} min={0} max={50} step={1} onChange={(v) => setGlField("blur", v)} />
                <Slider label="Saturation" value={gl.saturation} min={0} max={300} step={10} onChange={(v) => setGlField("saturation", v)} />
                <Slider label="Border Opacity" value={Math.round(gl.borderOpacity * 100)} min={0} max={100} step={1} onChange={(v) => setGlField("borderOpacity", v / 100)} />
                <Slider label="Border Radius" value={gl.borderRadius} min={0} max={50} step={1} onChange={(v) => setGlField("borderRadius", v)} />
                <Slider label="Shadow Blur" value={gl.shadowBlur} min={0} max={100} step={1} onChange={(v) => setGlField("shadowBlur", v)} />
              </>
            )}

            {mode === "neumorphism" && (
              <>
                <div>
                  <label className="block text-xs text-zinc-500 mb-1">Base Color</label>
                  <input type="color" value={nm.baseColor} onChange={(e) => setNmField("baseColor", e.target.value)} className="h-8 w-full rounded cursor-pointer" />
                </div>
                <Slider label="Border Radius" value={nm.borderRadius} min={0} max={50} step={1} onChange={(v) => setNmField("borderRadius", v)} />
                <Slider label="Shadow Blur" value={nm.shadowBlur} min={0} max={50} step={1} onChange={(v) => setNmField("shadowBlur", v)} />
                <Slider label="Distance" value={nm.distance} min={1} max={20} step={1} onChange={(v) => setNmField("distance", v)} />
                <Slider label="Intensity" value={Math.round(nm.intensity * 100)} min={0} max={100} step={1} onChange={(v) => setNmField("intensity", v / 100)} />
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="inset" checked={nm.inset} onChange={(e) => setNmField("inset", e.target.checked)} className="rounded" />
                  <label htmlFor="inset" className="text-sm text-zinc-600 dark:text-zinc-400">Inset</label>
                </div>
              </>
            )}

            <button onClick={handleReset} className="rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors">Reset</button>
          </div>
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">CSS Code</h3>
            <button onClick={handleCopy} className="text-xs text-blue-600 hover:text-blue-500 dark:text-blue-400">{copied ? "Copied!" : "Copy CSS"}</button>
          </div>
          <pre className="rounded-lg bg-zinc-50 p-3 text-xs font-mono text-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 overflow-x-auto whitespace-pre-wrap">{getCss()}</pre>
        </div>
      </div>

      <section className="mt-16 border-t border-zinc-100 pt-12 dark:border-zinc-800">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Frequently Asked Questions</h2>
        <div className="mt-8 space-y-6">{faqs.map((faq, i) => (
          <div key={i}><h3 className="font-semibold text-zinc-900 dark:text-zinc-50">{faq.question}</h3><p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{faq.answer}</p></div>
        ))}</div>
      </section>
    </Container>
  );
}
