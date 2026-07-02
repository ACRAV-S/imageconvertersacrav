"use client";

import { useState, useCallback } from "react";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import Container from "@/components/common/Container";
import ErrorAlert from "@/components/tools/ErrorAlert";
import FaqSection from "@/components/tools/FaqSection";
import type { FaqItem } from "@/components/tools/FaqSection";

function safeEval(expr: string): number {
  const sanitized = expr.replace(/[^0-9+\-*/.() ]/g, "");
  const tokens = sanitized.match(/\d+\.?\d*|[+\-*/()]/g) || [];
  let pos = 0;

  function parseExpr(): number {
    let result = parseTerm();
    while (pos < tokens.length) {
      const op = tokens[pos];
      if (op !== "+" && op !== "-") break;
      pos++;
      const right = parseTerm();
      result = op === "+" ? result + right : result - right;
    }
    return result;
  }

  function parseTerm(): number {
    let result = parseFactor();
    while (pos < tokens.length) {
      const op = tokens[pos];
      if (op !== "*" && op !== "/") break;
      pos++;
      const right = parseFactor();
      if (op === "/" && right === 0) throw new Error("Division by zero");
      result = op === "*" ? result * right : result / right;
    }
    return result;
  }

  function parseFactor(): number {
    if (pos >= tokens.length) throw new Error("Unexpected end");
    if (tokens[pos] === "(") {
      pos++;
      const result = parseExpr();
      if (pos >= tokens.length || tokens[pos] !== ")") throw new Error("Mismatched parens");
      pos++;
      return result;
    }
    const num = parseFloat(tokens[pos]);
    if (isNaN(num)) throw new Error("Invalid number");
    pos++;
    return num;
  }

  return parseExpr();
}

export default function ScientificCalcTool({ title, description, faqs }: { title: string; description: string; faqs: FaqItem[] }) {
  const [display, setDisplay] = useState("0");
  const [memory, setMemory] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { copied, copy: handleCopy } = useCopyToClipboard();

  const press = useCallback((val: string) => {
    setError(null);
    if (val === "C") { setDisplay("0"); return; }
    if (val === "CE") { setDisplay("0"); return; }
    if (val === "±") { setDisplay((d) => d.startsWith("-") ? d.slice(1) : "-" + d); return; }
    if (val === ".") { setDisplay((d) => d.includes(".") ? d : d + "."); return; }
    if (val === "MC") { setMemory(null); return; }
    if (val === "MR") { if (memory !== null) setDisplay(String(memory)); return; }
    if (val === "M+") { try { setMemory((parseFloat(display) || 0) + (memory || 0)); } catch {} return; }
    if (val === "M-") { try { setMemory((memory || 0) - (parseFloat(display) || 0)); } catch {} return; }
    if (["sin", "cos", "tan"].includes(val)) {
      try {
        const n = parseFloat(display);
        if (isNaN(n)) { setError("Invalid input"); return; }
        const rad = (n * Math.PI) / 180;
        const r = val === "sin" ? Math.sin(rad) : val === "cos" ? Math.cos(rad) : Math.tan(rad);
        setDisplay(String(Math.round(r * 1e10) / 1e10));
      } catch { setError("Error"); }
      return;
    }
    if (val === "√") {
      const n = parseFloat(display);
      if (n < 0) { setError("Cannot sqrt negative"); return; }
      setDisplay(String(Math.sqrt(n))); return;
    }
    if (val === "x²") { setDisplay(String(Math.pow(parseFloat(display) || 0, 2))); return; }
    if (val === "x³") { setDisplay(String(Math.pow(parseFloat(display) || 0, 3))); return; }
    if (val === "1/x") {
      const n = parseFloat(display);
      if (n === 0) { setError("Division by zero"); return; }
      setDisplay(String(1 / n)); return;
    }
    if (val === "π") { setDisplay(String(Math.PI)); return; }
    if (val === "e") { setDisplay(String(Math.E)); return; }
    if (val === "=") {
      try {
        const r = safeEval(display);
        setDisplay(String(Math.round(r * 1e10) / 1e10));
      } catch { setError("Invalid expression"); }
      return;
    }
    setDisplay((d) => (d === "0" && val !== "." ? val : d + val));
  }, [display, memory]);

  const btn = (label: string, action?: string, cls?: string) => (
    <button onClick={() => press(action ?? label)}
      className={`rounded-lg px-3 py-3 text-sm font-semibold transition-colors ${cls || "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"}`}>
      {label}
    </button>
  );

  return (
    <Container className="py-12">
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">{title}</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">{description}</p>
      </div>
      <ErrorAlert error={error} />
      <div className="mt-8">
        <div className="max-w-md rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Calculator</h3>
            <button onClick={() => handleCopy(display)} className="text-xs text-blue-600 hover:text-blue-500 dark:text-blue-400">{copied ? "Copied!" : "Copy"}</button>
          </div>
          <div className="rounded-lg bg-zinc-50 p-4 mb-4 text-right dark:bg-zinc-950">
            <div className="text-3xl font-mono font-bold text-zinc-900 dark:text-zinc-50 overflow-x-auto whitespace-nowrap">{display}</div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {btn("MC", "MC", "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-950 dark:text-red-400")}
            {btn("MR", "MR", "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-950 dark:text-red-400")}
            {btn("M+", "M+", "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-950 dark:text-red-400")}
            {btn("M-", "M-", "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-950 dark:text-red-400")}
            {btn("C", "C", "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-950 dark:text-red-400")}
            {btn("CE", "CE", "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-950 dark:text-red-400")}
            {btn("±", "±")}
            {btn("÷", "/")}
            {btn("7", "7")}
            {btn("8", "8")}
            {btn("9", "9")}
            {btn("×", "*")}
            {btn("4", "4")}
            {btn("5", "5")}
            {btn("6", "6")}
            {btn("-", "-")}
            {btn("1", "1")}
            {btn("2", "2")}
            {btn("3", "3")}
            {btn("+", "+")}
            {btn("0", "0")}
            {btn(".", ".")}
            {btn("√", "√")}
            {btn("=", "=", "bg-blue-600 text-white hover:bg-blue-500 row-span-1")}
            {btn("x²", "x²")}
            {btn("x³", "x³")}
            {btn("1/x", "1/x")}
            {btn("π", "π")}
            {btn("sin", "sin")}
            {btn("cos", "cos")}
            {btn("tan", "tan")}
            {btn("e", "e")}
          </div>
        </div>
      </div>
      <FaqSection faqs={faqs} />
    </Container>
  );
}
