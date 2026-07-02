"use client";

import { useState, useCallback } from "react";
import Container from "@/components/common/Container";
import ImageUploader from "@/components/tools/ImageUploader";
import ImagePreview from "@/components/tools/ImagePreview";
import DownloadButton from "@/components/tools/DownloadButton";
import ProcessingLoader from "@/components/tools/ProcessingLoader";
import { formatFileSize } from "@/lib/image/imageUtils";
import { addWatermark, type WatermarkOptions } from "@/lib/image/imageWatermark";
import { useImageTool } from "@/hooks/useImageTool";
import ErrorAlert from "@/components/tools/ErrorAlert";
import FaqSection from "@/components/tools/FaqSection";
import type { FaqItem } from "@/components/tools/FaqSection";

interface WatermarkToolProps {
  title: string;
  description: string;
  faqs: FaqItem[];
}

const PRESET_COLORS = ["#ffffff", "#000000", "#ff0000", "#00ff00", "#0000ff", "#ffff00"];

const POSITIONS: { label: string; value: WatermarkOptions["position"] }[] = [
  { label: "Top Left", value: "top-left" },
  { label: "Top Right", value: "top-right" },
  { label: "Bottom Left", value: "bottom-left" },
  { label: "Bottom Right", value: "bottom-right" },
  { label: "Center", value: "center" },
];

export default function WatermarkTool({ title, description, faqs }: WatermarkToolProps) {
  const {
    sourceDataUrl, sourceFile, sourceImage,
    isProcessing, resultBlob, resultUrl, error,
    setIsProcessing, setResultBlob, setResultUrl, setError,
    handleUpload: baseUpload, handleReset,
  } = useImageTool();

  const [text, setText] = useState("");
  const [position, setPosition] = useState<WatermarkOptions["position"]>("bottom-right");
  const [fontSize, setFontSize] = useState(48);
  const [opacity, setOpacity] = useState(0.5);
  const [color, setColor] = useState("#ffffff");

  const handleUpload = useCallback(async (file: File) => {
    await baseUpload(file);
  }, [baseUpload]);

  const handleApply = useCallback(async () => {
    if (!sourceImage) return;
    if (!text.trim()) {
      setError("Please enter watermark text.");
      return;
    }
    setIsProcessing(true);
    setError(null);
    setResultBlob(null);
    setResultUrl(null);

    try {
      const blob = await addWatermark(sourceImage, {
        text: text.trim(),
        position,
        fontSize,
        opacity,
        color,
      });
      if (resultUrl) URL.revokeObjectURL(resultUrl);
      const url = URL.createObjectURL(blob);
      setResultBlob(blob);
      setResultUrl(url);
    } catch {
      setError("Watermarking failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  }, [sourceImage, text, position, fontSize, opacity, color, resultUrl, setIsProcessing, setError, setResultBlob, setResultUrl]);

  const getFilename = () => {
    const base = sourceFile ? sourceFile.name.replace(/\.[^.]+$/, "") : "image";
    return `${base}-watermarked.png`;
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

      <ErrorAlert error={error} />

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
                Watermark Settings
              </h3>

              <div className="mb-4">
                <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400" id="watermark-text-label">
                  Watermark Text
                </label>
                <input
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter watermark text..."
                  className="mt-1 block w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                  aria-labelledby="watermark-text-label"
                />
              </div>

              <div className="mb-4">
                <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400" id="watermark-position-label">
                  Position
                </label>
                <div className="mt-1.5 grid grid-cols-3 gap-2" role="radiogroup" aria-labelledby="watermark-position-label">
                  {POSITIONS.map((p) => (
                    <button
                      key={p.value}
                      onClick={() => setPosition(p.value)}
                      role="radio"
                      aria-checked={position === p.value}
                      tabIndex={position === p.value ? 0 : -1}
                      onKeyDown={(e) => {
                        const idx = POSITIONS.findIndex((pos) => pos.value === position);
                        let nextIdx: number | null = null;
                        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                          nextIdx = (idx + 1) % POSITIONS.length;
                        } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                          nextIdx = (idx - 1 + POSITIONS.length) % POSITIONS.length;
                        } else if (e.key === "Home") {
                          nextIdx = 0;
                        } else if (e.key === "End") {
                          nextIdx = POSITIONS.length - 1;
                        }
                        if (nextIdx !== null) {
                          e.preventDefault();
                          setPosition(POSITIONS[nextIdx].value);
                        }
                      }}
                      className={`rounded-lg border px-2 py-1.5 text-center text-xs font-medium transition-colors ${
                        position === p.value
                          ? "border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-950/40 dark:text-blue-400"
                          : "border-zinc-200 text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400" id="font-size-label">
                  Font Size: {fontSize}px
                </label>
                <input
                  type="range"
                  min={12}
                  max={200}
                  step={1}
                  value={fontSize}
                  onChange={(e) => setFontSize(parseInt(e.target.value))}
                  className="mt-1.5 block w-full accent-blue-600"
                  aria-labelledby="font-size-label"
                />
              </div>

              <div className="mb-4">
                <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400" id="opacity-label">
                  Opacity: {Math.round(opacity * 100)}%
                </label>
                <input
                  type="range"
                  min={0.05}
                  max={1}
                  step={0.05}
                  value={opacity}
                  onChange={(e) => setOpacity(parseFloat(e.target.value))}
                  className="mt-1.5 block w-full accent-blue-600"
                  aria-labelledby="opacity-label"
                />
              </div>

              <div className="mb-4">
                <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400" id="color-label">
                  Color
                </label>
                <div className="mt-1 flex gap-2" role="radiogroup" aria-labelledby="color-label">
                  {PRESET_COLORS.map((c) => (
                    <button
                      key={c}
                      onClick={() => setColor(c)}
                      role="radio"
                      aria-checked={color === c}
                      aria-label={`Color ${c}`}
                      tabIndex={color === c ? 0 : -1}
                      onKeyDown={(e) => {
                        const idx = PRESET_COLORS.indexOf(color);
                        let nextIdx: number | null = null;
                        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                          nextIdx = (idx + 1) % PRESET_COLORS.length;
                        } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                          nextIdx = (idx - 1 + PRESET_COLORS.length) % PRESET_COLORS.length;
                        } else if (e.key === "Home") {
                          nextIdx = 0;
                        } else if (e.key === "End") {
                          nextIdx = PRESET_COLORS.length - 1;
                        }
                        if (nextIdx !== null) {
                          e.preventDefault();
                          setColor(PRESET_COLORS[nextIdx]);
                        }
                      }}
                      className={`h-8 w-8 rounded-full border-2 ${
                        color === c ? "border-blue-500 ring-2 ring-blue-300" : "border-zinc-300 dark:border-zinc-600"
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="h-8 w-8 cursor-pointer rounded border-0 p-0"
                    aria-label="Custom color"
                  />
                </div>
              </div>

              <button
                onClick={handleApply}
                disabled={isProcessing || !text.trim()}
                className="w-full rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
              >
                {isProcessing ? "Applying Watermark..." : "Apply Watermark"}
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
            label="Watermarked"
            alt="Watermarked image"
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

      <FaqSection faqs={faqs} />
    </Container>
  );
}
