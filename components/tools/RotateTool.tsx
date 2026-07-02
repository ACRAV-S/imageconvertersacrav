"use client";

import { useState, useCallback } from "react";
import Container from "@/components/common/Container";
import ImageUploader from "@/components/tools/ImageUploader";
import ImagePreview from "@/components/tools/ImagePreview";
import DownloadButton from "@/components/tools/DownloadButton";
import ProcessingLoader from "@/components/tools/ProcessingLoader";
import { formatFileSize } from "@/lib/image/imageUtils";
import { rotateImage } from "@/lib/image/imageTransform";
import { useImageTool } from "@/hooks/useImageTool";
import ErrorAlert from "@/components/tools/ErrorAlert";
import FaqSection from "@/components/tools/FaqSection";
import type { FaqItem } from "@/components/tools/FaqSection";

interface RotateToolProps {
  title: string;
  description: string;
  faqs: FaqItem[];
}

const ANGLES = [90, 180, 270] as const;

export default function RotateTool({ title, description, faqs }: RotateToolProps) {
  const {
    sourceDataUrl, sourceFile, sourceImage,
    isProcessing, resultBlob, resultUrl, error,
    setIsProcessing, setResultBlob, setResultUrl, setError,
    handleUpload: baseUpload, handleReset,
  } = useImageTool();

  const [angle, setAngle] = useState(90);
  const [customAngle, setCustomAngle] = useState("");

  const handleUpload = useCallback(async (file: File) => {
    await baseUpload(file);
  }, [baseUpload]);

  const handleRotate = useCallback(async () => {
    if (!sourceImage) return;
    const finalAngle = customAngle ? parseFloat(customAngle) : angle;
    if (isNaN(finalAngle)) {
      setError("Please enter a valid angle.");
      return;
    }
    setIsProcessing(true);
    setError(null);
    setResultBlob(null);
    setResultUrl(null);

    try {
      const blob = await rotateImage(sourceImage, finalAngle);
      if (resultUrl) URL.revokeObjectURL(resultUrl);
      const url = URL.createObjectURL(blob);
      setResultBlob(blob);
      setResultUrl(url);
    } catch {
      setError("Rotation failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  }, [sourceImage, angle, customAngle, resultUrl, setIsProcessing, setError, setResultBlob, setResultUrl]);

  const getFilename = () => {
    const base = sourceFile ? sourceFile.name.replace(/\.[^.]+$/, "") : "image";
    return `${base}-rotated.png`;
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
                Rotate Settings
              </h3>

              <p className="mb-3 text-xs font-medium text-zinc-600 dark:text-zinc-400" id="rotate-angle-label">
                Preset Angles
              </p>
              <div className="flex gap-2" role="radiogroup" aria-labelledby="rotate-angle-label">
                {ANGLES.map((a) => (
                  <button
                    key={a}
                    onClick={() => { setAngle(a); setCustomAngle(""); }}
                    role="radio"
                    aria-checked={angle === a && !customAngle}
                    tabIndex={angle === a && !customAngle ? 0 : -1}
                    onKeyDown={(e) => {
                      const values = [...ANGLES];
                      const idx = values.findIndex((v) => v === angle);
                      let nextIdx: number | null = null;
                      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                        nextIdx = (idx + 1) % values.length;
                      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                        nextIdx = (idx - 1 + values.length) % values.length;
                      } else if (e.key === "Home") {
                        nextIdx = 0;
                      } else if (e.key === "End") {
                        nextIdx = values.length - 1;
                      }
                      if (nextIdx !== null) {
                        e.preventDefault();
                        setAngle(values[nextIdx]);
                        setCustomAngle("");
                      }
                    }}
                    className={`flex-1 rounded-lg border px-3 py-2 text-center text-sm font-medium transition-colors ${
                      angle === a && !customAngle
                        ? "border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-950/40 dark:text-blue-400"
                        : "border-zinc-200 text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
                    }`}
                  >
                    {a}&deg;
                  </button>
                ))}
              </div>

              <div className="mt-4">
                <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400" id="custom-angle-label">
                  Custom Angle (degrees)
                </label>
                <input
                  type="number"
                  value={customAngle}
                  onChange={(e) => { setCustomAngle(e.target.value); }}
                  placeholder="e.g. 45"
                  className="mt-1 block w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                  aria-labelledby="custom-angle-label"
                />
              </div>

              <button
                onClick={handleRotate}
                disabled={isProcessing}
                className="mt-6 w-full rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
              >
                {isProcessing ? "Rotating..." : "Rotate Image"}
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
            label="Rotated"
            alt="Rotated image"
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
