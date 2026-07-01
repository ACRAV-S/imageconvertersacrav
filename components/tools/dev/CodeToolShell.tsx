"use client";

import { useState, useCallback, useMemo } from "react";
import Container from "@/components/common/Container";
import {
  formatJson, validateJson, minifyJson, beautifyJson,
  encodeBase64, decodeBase64, encodeUrl, decodeUrl,
  decodeJwt, formatHtml, formatCss, formatJs,
} from "@/lib/dev/transformers";

interface FaqItem {
  question: string;
  answer: string;
}

type ToolMode =
  | "json-format" | "json-validate" | "json-minify" | "json-beautify"
  | "base64-encode" | "base64-decode"
  | "url-encode" | "url-decode"
  | "jwt-decode"
  | "html-format" | "css-format" | "js-format";

interface CodeToolShellProps {
  title: string;
  description: string;
  faqs: FaqItem[];
  mode: ToolMode;
  sample?: string;
  placeholder?: string;
}

const SAMPLES: Record<string, string> = {
  "json": `{\n  "name": "John",\n  "age": 30,\n  "city": "New York"\n}`,
  "html": `<div class="container">\n  <h1>Hello</h1>\n  <p>World</p>\n</div>`,
  "css": `body { margin: 0; padding: 0; } .container { max-width: 1200px; margin: 0 auto; }`,
  "js": `function hello(name) { const msg = "Hello, " + name; console.log(msg); return msg; }`,
  "jwt": `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c`,
};

function getDefaultSample(mode: ToolMode): string {
  switch (mode) {
    case "json-format": case "json-validate": case "json-beautify":
      return SAMPLES.json;
    case "json-minify":
      return JSON.stringify(JSON.parse(SAMPLES.json));
    case "base64-encode": case "base64-decode":
    case "url-encode": case "url-decode":
      return "Hello World!";
    case "jwt-decode":
      return SAMPLES.jwt;
    case "html-format":
      return SAMPLES.html;
    case "css-format":
      return SAMPLES.css;
    case "js-format":
      return SAMPLES.js;
  }
}

function getPlaceholder(mode: ToolMode): string {
  if (mode === "base64-decode") return "Paste Base64 to decode...";
  if (mode === "url-decode") return "Paste encoded URL...";
  if (mode === "jwt-decode") return "Paste JWT token...";
  return "Paste your input here...";
}

export default function CodeToolShell({
  title,
  description,
  faqs,
  mode,
  sample: pageSample,
  placeholder: pagePlaceholder,
}: CodeToolShellProps) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [validation, setValidation] = useState<{ ok: boolean; msg: string } | null>(null);
  const [jwtResult, setJwtResult] = useState<{ headerParsed: string; payloadParsed: string; signature: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const sample = pageSample || getDefaultSample(mode);
  const placeholder = pagePlaceholder || getPlaceholder(mode);

  const transform = useCallback(() => {
    if (!input.trim()) { setError("Please enter input."); return; }
    setError(null);
    setValidation(null);
    setJwtResult(null);
    setOutput("");

    try {
      switch (mode) {
        case "json-format": {
          const r = formatJson(input);
          setOutput(r);
          break;
        }
        case "json-validate": {
          const r = validateJson(input);
          if (r.ok) setValidation({ ok: true, msg: "Valid JSON" });
          else setValidation({ ok: false, msg: r.error! });
          break;
        }
        case "json-minify": {
          const r = minifyJson(input);
          setOutput(r);
          break;
        }
        case "json-beautify": {
          const r = beautifyJson(input);
          setOutput(r);
          break;
        }
        case "base64-encode": {
          setOutput(encodeBase64(input));
          break;
        }
        case "base64-decode": {
          setOutput(decodeBase64(input));
          break;
        }
        case "url-encode": {
          setOutput(encodeUrl(input));
          break;
        }
        case "url-decode": {
          setOutput(decodeUrl(input));
          break;
        }
        case "jwt-decode": {
          const r = decodeJwt(input);
          setJwtResult({ headerParsed: r.headerParsed, payloadParsed: r.payloadParsed, signature: r.signature });
          break;
        }
        case "html-format": {
          setOutput(formatHtml(input));
          break;
        }
        case "css-format": {
          setOutput(formatCss(input));
          break;
        }
        case "js-format": {
          setOutput(formatJs(input));
          break;
        }
      }
    } catch (e) {
      setError((e as Error).message);
    }
  }, [input, mode]);

  const handleCopy = async () => {
    const text = jwtResult
      ? `Header:\n${jwtResult.headerParsed}\n\nPayload:\n${jwtResult.payloadParsed}\n\nSignature:\n${jwtResult.signature}`
      : output;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Failed to copy.");
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError(null);
    setValidation(null);
    setJwtResult(null);
  };

  const handleSample = () => {
    setInput(sample);
    setOutput("");
    setError(null);
    setValidation(null);
    setJwtResult(null);
  };

  const charCount = useMemo(() => {
    if (mode === "jwt-decode" && jwtResult) {
      return `Header: ${jwtResult.headerParsed.length}B | Payload: ${jwtResult.payloadParsed.length}B`;
    }
    if (output) return `${output.length} chars, ${output.split("\n").length} lines`;
    return "";
  }, [output, jwtResult, mode]);

  return (
    <Container className="py-12">
      <div className="max-w-4xl">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          {title}
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">{description}</p>
      </div>

      {error && (
        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/50 dark:text-red-400">
          {error}
        </div>
      )}

      {validation && (
        <div className={`mt-6 rounded-lg border px-4 py-3 text-sm ${
          validation.ok
            ? "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950/50 dark:text-green-400"
            : "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950/50 dark:text-red-400"
        }`}>
          {validation.msg}
        </div>
      )}

      <div className="mt-8 space-y-4">
        <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Input</h3>
            <button onClick={handleSample} className="text-xs text-blue-600 hover:text-blue-500 dark:text-blue-400">
              Load sample
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            rows={8}
            className="block w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm font-mono dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 resize-y"
            spellCheck={false}
          />
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              onClick={transform}
              className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
            >
              {mode === "json-validate" ? "Validate" : "Transform"}
            </button>
            <button
              onClick={handleClear}
              className="rounded-lg border border-zinc-200 bg-white px-5 py-2 text-sm font-semibold text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors"
            >
              Clear
            </button>
          </div>
        </div>

        {output && (
          <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Output</h3>
              <button onClick={handleCopy} className="text-xs text-blue-600 hover:text-blue-500 dark:text-blue-400">
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <textarea
              value={output}
              readOnly
              rows={8}
              className="block w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm font-mono dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 resize-y"
              spellCheck={false}
            />
            {charCount && (
              <p className="mt-2 text-xs text-zinc-400 dark:text-zinc-500">{charCount}</p>
            )}
          </div>
        )}

        {jwtResult && (
          <>
            <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Header</h3>
                <button onClick={handleCopy} className="text-xs text-blue-600 hover:text-blue-500 dark:text-blue-400">
                  {copied ? "Copied!" : "Copy all"}
                </button>
              </div>
              <pre className="rounded-lg bg-zinc-50 p-3 text-xs font-mono text-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 overflow-x-auto whitespace-pre-wrap">
                {jwtResult.headerParsed}
              </pre>
              <p className="mt-2 text-xs text-zinc-400 dark:text-zinc-500">{jwtResult.headerParsed.length} chars</p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="mb-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Payload</h3>
              <pre className="rounded-lg bg-zinc-50 p-3 text-xs font-mono text-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 overflow-x-auto whitespace-pre-wrap">
                {jwtResult.payloadParsed}
              </pre>
              <p className="mt-2 text-xs text-zinc-400 dark:text-zinc-500">{jwtResult.payloadParsed.length} chars</p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="mb-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Signature</h3>
              <pre className="rounded-lg bg-zinc-50 p-3 text-xs font-mono text-zinc-800 dark:bg-zinc-950 dark:text-zinc-200 overflow-x-auto break-all">
                {jwtResult.signature}
              </pre>
            </div>
          </>
        )}
      </div>

      <section className="mt-16 border-t border-zinc-100 pt-12 dark:border-zinc-800">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Frequently Asked Questions</h2>
        <div className="mt-8 space-y-6">
          {faqs.map((faq, i) => (
            <div key={i}>
              <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">{faq.question}</h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
