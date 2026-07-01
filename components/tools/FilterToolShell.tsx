"use client";

import { useState, useCallback, useMemo } from "react";
import Container from "@/components/common/Container";
import ImageUploader from "@/components/tools/ImageUploader";
import ImagePreview from "@/components/tools/ImagePreview";
import DownloadButton from "@/components/tools/DownloadButton";
import ProcessingLoader from "@/components/tools/ProcessingLoader";
import { formatFileSize } from "@/lib/image/imageUtils";
import { useImageTool } from "@/hooks/useImageTool";
import {
  adjustBrightness,
  adjustContrast,
  adjustSaturation,
  convertToGrayscale,
  applyBlur,
  applySharpen,
} from "@/lib/image/imageFilters";

interface FaqItem {
  question: string;
  answer: string;
}

interface FilterParam {
  key: string;
  label: string;
  min: number;
  max: number;
  step: number;
  default: number;
}

type FilterType = "brightness" | "contrast" | "saturation" | "grayscale" | "blur" | "sharpen";

interface FilterToolShellProps {
  title: string;
  description: string;
  faqs: FaqItem[];
  filterType: FilterType;
  params: FilterParam[];
  extraControls?: React.ReactNode;
}

const FILTER_FN: Record<FilterType, (img: HTMLImageElement, params: Record<string, number>) => Promise<Blob>> = {
  brightness: (img, p) => adjustBrightness(img, p.value),
  contrast: (img, p) => adjustContrast(img, p.value),
  saturation: (img, p) => adjustSaturation(img, p.value),
  grayscale: (img, _p) => convertToGrayscale(img),
  blur: (img, p) => applyBlur(img, p.radius),
  sharpen: (img, p) => applySharpen(img, p.intensity),
};

export default function FilterToolShell({
  title,
  description,
  faqs,
  filterType,
  params: paramDefs,
  extraControls,
}: FilterToolShellProps) {
  const [paramValues, setParamValues] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    for (const p of paramDefs) initial[p.key] = p.default;
    return initial;
  });

  const processFn = useMemo(() => FILTER_FN[filterType], [filterType]);

  const {
    sourceDataUrl, sourceFile, sourceImage,
    isProcessing, resultBlob, resultUrl, error,
    setIsProcessing, setResultBlob, setResultUrl, setError,
    handleUpload, handleReset,
  } = useImageTool();

  const handleProcess = useCallback(async () => {
    if (!sourceImage) return;
    setIsProcessing(true);
    setError(null);
    setResultBlob(null);
    setResultUrl(null);

    try {
      const blob = await processFn(sourceImage, paramValues);
      const url = URL.createObjectURL(blob);
      setResultBlob(blob);
      setResultUrl(url);
    } catch {
      setError("Processing failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  }, [sourceImage, paramValues, processFn, setIsProcessing, setError, setResultBlob, setResultUrl]);

  const getFilename = () => {
    const base = sourceFile ? sourceFile.name.replace(/\.[^.]+$/, "") : "image";
    return `${base}-${title.toLowerCase().replace(/\s+/g, "-")}.png`;
  };

  const updateParam = (key: string, value: number) => {
    setParamValues((prev) => ({ ...prev, [key]: value }));
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

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          {!sourceDataUrl ? (
            <ImageUploader onUpload={handleUpload} />
          ) : (
            <>
              <ImagePreview
                src={sourceDataUrl}
                label="Original"
                alt="Original image"
                fileSize={sourceFile ? formatFileSize(sourceFile.size) : undefined}
              />
              <button
                onClick={handleReset}
                className="text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
              >
                &larr; Choose a different image
              </button>
            </>
          )}
        </div>

        <div className="space-y-6">
          {sourceImage && (
            <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="mb-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                {title} Settings
              </h3>

              {paramDefs.map((p) => (
                <div key={p.key} className="mb-4">
                  <label
                    className="text-xs font-medium text-zinc-600 dark:text-zinc-400"
                    id={`${p.key}-label`}
                  >
                    {p.label}: {paramValues[p.key]}
                  </label>
                  <input
                    type="range"
                    min={p.min}
                    max={p.max}
                    step={p.step}
                    value={paramValues[p.key]}
                    onChange={(e) => updateParam(p.key, parseFloat(e.target.value))}
                    className="mt-1.5 block w-full accent-blue-600"
                    aria-labelledby={`${p.key}-label`}
                  />
                </div>
              ))}

              {extraControls}

              <button
                onClick={handleProcess}
                disabled={isProcessing}
                className="w-full rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
              >
                {isProcessing ? "Processing..." : `Apply ${title}`}
              </button>
            </div>
          )}
        </div>
      </div>

      {isProcessing && (
        <div className="mt-6">
          <ProcessingLoader />
        </div>
      )}

      {resultUrl && !isProcessing && (
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <ImagePreview
            src={resultUrl}
            label="Result"
            alt="Processed image"
            fileSize={resultBlob ? formatFileSize(resultBlob.size) : undefined}
          />
          <div className="flex flex-col items-start justify-end gap-4">
            <DownloadButton blob={resultBlob} filename={getFilename()} />
            <p className="text-xs text-zinc-400 dark:text-zinc-500">
              Your file is processed and ready to download. No data was uploaded to any server.
            </p>
          </div>
        </div>
      )}

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
