"use client";

import { useState, useCallback, useRef, useMemo } from "react";
import Container from "@/components/common/Container";
import { generateQrMatrix, drawQrToCanvas, qrToPngBlob } from "@/lib/qr/qrGenerator";
import {
  formatWifiQr,
  formatEmailQr,
  formatSmsQr,
  formatWhatsAppQr,
  formatVCardQr,
  formatLocationQr,
  formatEventQr,
} from "@/lib/qr/qrFormats";

interface FaqItem {
  question: string;
  answer: string;
}

interface FieldDef {
  key: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

type FormatType = "text" | "wifi" | "email" | "sms" | "whatsapp" | "vcard" | "location" | "event";

interface QrGeneratorShellProps {
  title: string;
  description: string;
  faqs: FaqItem[];
  fields: FieldDef[];
  formatType: FormatType;
}

function formatContent(type: FormatType, values: Record<string, string>): string {
  switch (type) {
    case "text": return values.content ?? "";
    case "wifi": return formatWifiQr(values.ssid, values.password, (values.encryption as "WPA" | "WEP" | "None") || "WPA");
    case "email": return formatEmailQr(values.email, values.subject, values.body);
    case "sms": return formatSmsQr(values.number, values.message);
    case "whatsapp": return formatWhatsAppQr(values.phone, values.message);
    case "vcard": return formatVCardQr(values as Parameters<typeof formatVCardQr>[0]);
    case "location": return formatLocationQr(values.lat, values.lon);
    case "event": return formatEventQr(values as Parameters<typeof formatEventQr>[0]);
  }
}

export default function QrGeneratorShell({
  title,
  description,
  faqs,
  fields,
  formatType,
}: QrGeneratorShellProps) {
  const [values, setValues] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    for (const f of fields) init[f.key] = "";
    return init;
  });
  const [qrContent, setQrContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [blob, setBlob] = useState<Blob | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [copied, setCopied] = useState(false);

  const formatFn = useMemo(() => (v: Record<string, string>) => formatContent(formatType, v), [formatType]);

  const updateField = (key: string, val: string) => {
    setValues((prev) => ({ ...prev, [key]: val }));
  };

  const generate = useCallback(() => {
    const required = fields.filter((f) => f.required);
    const missing = required.filter((f) => !values[f.key]?.trim());
    if (missing.length) {
      setError(`Please fill in: ${missing.map((f) => f.label).join(", ")}`);
      return;
    }
    setError(null);
    try {
      const content = formatFn(values);
      setQrContent(content);
      const { matrix } = generateQrMatrix(content);
      const canvas = canvasRef.current;
      if (canvas) drawQrToCanvas(canvas, matrix, canvas.offsetWidth || 280);
      qrToPngBlob(matrix, 512).then(setBlob).catch(() => {});
    } catch {
      setError("Failed to generate QR code. The content may be too long.");
    }
  }, [values, formatFn, fields]);

  const handleDownload = () => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, "-")}.png`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(qrContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Failed to copy to clipboard.");
    }
  };

  return (
    <Container className="py-12">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          {title}
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          {description}
        </p>
      </div>

      {error && (
        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/50 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="mb-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              Input
            </h3>
            {fields.map((f) => (
              <div key={f.key} className="mb-3">
                <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400" id={`${f.key}-label`}>
                  {f.label}{f.required ? " *" : ""}
                </label>
                <input
                  type={f.type ?? "text"}
                  value={values[f.key]}
                  onChange={(e) => updateField(f.key, e.target.value)}
                  placeholder={f.placeholder ?? ""}
                  className="mt-1 block w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                  aria-labelledby={`${f.key}-label`}
                />
              </div>
            ))}
            <button
              onClick={generate}
              className="mt-2 w-full rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
            >
              Generate QR Code
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {qrContent && (
            <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="mb-3 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                QR Code Preview
              </h3>
              <div className="flex items-center justify-center bg-white p-4 rounded-lg">
                <canvas
                  ref={canvasRef}
                  className="max-w-full"
                  style={{ width: "280px", height: "280px" }}
                />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={handleDownload}
                  disabled={!blob}
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                >
                  Download PNG
                </button>
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-600 shadow-sm hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors"
                >
                  {copied ? "Copied!" : "Copy Text"}
                </button>
              </div>
              <div className="mt-3 rounded-lg bg-zinc-50 p-3 dark:bg-zinc-950">
                <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Content:</p>
                <p className="mt-1 break-all text-xs text-zinc-700 dark:text-zinc-300 font-mono">
                  {qrContent}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <section className="mt-16 border-t border-zinc-100 pt-12 dark:border-zinc-800">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Frequently Asked Questions
        </h2>
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
