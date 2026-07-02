"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Container from "@/components/common/Container";
import ImageUploader from "@/components/tools/ImageUploader";
import ImagePreview from "@/components/tools/ImagePreview";
import ImageInfoOverlay from "@/components/tools/ImageInfoOverlay";
import DownloadButton from "@/components/tools/DownloadButton";
import ProcessingLoader from "@/components/tools/ProcessingLoader";
import { formatFileSize, getFormatConfig, FORMATS } from "@/lib/image/imageUtils";
import { resizeImage } from "@/lib/image/imageResizer";
import { useImageTool } from "@/hooks/useImageTool";
import { useImageInfo } from "@/hooks/useImageInfo";
import ErrorAlert from "@/components/tools/ErrorAlert";
import FaqSection from "@/components/tools/FaqSection";
import type { FaqItem } from "@/components/tools/FaqSection";

interface ImageResizerToolProps {
  faqs: FaqItem[];
}

export default function ImageResizerTool({ faqs }: ImageResizerToolProps) {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [lockAspect, setLockAspect] = useState(true);
  const [targetFormat, setTargetFormat] = useState("png");
  const [quality, setQuality] = useState(0.92);
  const aspectRatio = useRef(1);

  const {
    sourceDataUrl, sourceFile, sourceImage,
    isProcessing, resultBlob, resultUrl, error,
    setIsProcessing, setResultBlob, setResultUrl, setError,
    handleUpload: baseUpload, handleReset,
  } = useImageTool();
  const { info: sourceInfo, refresh: refreshSourceInfo } = useImageInfo();

  useEffect(() => {
    if (sourceImage) {
      const { width, height } = sourceImage;
      aspectRatio.current = width / height;
    }
  }, [sourceImage]);

  const handleUpload = useCallback(async (file: File) => {
    await baseUpload(file);
    refreshSourceInfo(file);
  }, [baseUpload, refreshSourceInfo]);

  const handleWidthChange = (val: number) => {
    setWidth(val);
    if (lockAspect && sourceImage) {
      setHeight(Math.round(val / aspectRatio.current));
    }
  };

  const handleHeightChange = (val: number) => {
    setHeight(val);
    if (lockAspect && sourceImage) {
      setWidth(Math.round(val * aspectRatio.current));
    }
  };

  const handleConvert = useCallback(async () => {
    if (!sourceImage || !width || !height) return;
    setIsProcessing(true);
    setError(null);
    setResultBlob(null);
    setResultUrl(null);

    try {
      const config = getFormatConfig(targetFormat);
      if (!config) throw new Error("Invalid format");
      const blob = await resizeImage(sourceImage, {
        width, height, maintainAspectRatio: false, format: config.mime, quality,
      });
      if (resultUrl) URL.revokeObjectURL(resultUrl);
      const url = URL.createObjectURL(blob);
      setResultBlob(blob);
      setResultUrl(url);
    } catch {
      setError("Resize failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  }, [sourceImage, width, height, targetFormat, quality, resultUrl, setIsProcessing, setError, setResultBlob, setResultUrl]);

  const getFilename = () => {
    const ext = getFormatConfig(targetFormat)?.extension ?? ".png";
    if (!sourceFile) return `resized${ext}`;
    return `${sourceFile.name.replace(/\.[^.]+$/, "")}_${width}x${height}${ext}`;
  };

  const originalSize = sourceFile ? sourceFile.size : 0;
  const newSize = resultBlob ? resultBlob.size : 0;
  const sizeChange = originalSize > 0 && newSize > 0
    ? Math.round((1 - newSize / originalSize) * 100)
    : 0;

  return (
    <Container className="py-12">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          Image Resizer
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Resize your images to exact dimensions. Choose your output format and quality. All processing runs in your browser.
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
                showZoom
              />
              {sourceInfo && (
                <ImageInfoOverlay info={sourceInfo} />
              )}
              <button
                onClick={handleReset}
                className="text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
              >
                &larr; Choose a different image
              </button>
            </>
          )}
        </div>

        {sourceImage && (
          <div className="space-y-6">
            <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
              <h3 className="mb-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Resize Settings</h3>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Width (px)</label>
                  <input
                    type="number"
                    min={1}
                    value={width}
                    onChange={(e) => handleWidthChange(parseInt(e.target.value) || 0)}
                    className="mt-1 block w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">Height (px)</label>
                  <input
                    type="number"
                    min={1}
                    value={height}
                    onChange={(e) => handleHeightChange(parseInt(e.target.value) || 0)}
                    className="mt-1 block w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-blue-500"
                  />
                </div>
              </div>

              <label className="mt-3 flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                <input
                  type="checkbox"
                  checked={lockAspect}
                  onChange={(e) => setLockAspect(e.target.checked)}
                  className="rounded border-zinc-300 text-blue-600 focus:ring-blue-500 dark:border-zinc-600"
                />
                Maintain aspect ratio
              </label>

              <div className="mt-4">
                <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400" id="resize-format-label">Output Format</label>
                <div className="mt-1.5 grid grid-cols-3 gap-2" role="radiogroup" aria-labelledby="resize-format-label">
                  {FORMATS.map((fmt) => (
                    <button
                      key={fmt.value}
                      onClick={() => setTargetFormat(fmt.value)}
                      role="radio"
                      aria-checked={targetFormat === fmt.value}
                      tabIndex={targetFormat === fmt.value ? 0 : -1}
                      onKeyDown={(e) => {
                        const idx = FORMATS.findIndex((f) => f.value === targetFormat);
                        let nextIdx: number | null = null;
                        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                          nextIdx = (idx + 1) % FORMATS.length;
                        } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                          nextIdx = (idx - 1 + FORMATS.length) % FORMATS.length;
                        } else if (e.key === "Home") {
                          nextIdx = 0;
                        } else if (e.key === "End") {
                          nextIdx = FORMATS.length - 1;
                        }
                        if (nextIdx !== null) {
                          e.preventDefault();
                          setTargetFormat(FORMATS[nextIdx].value);
                        }
                      }}
                      className={`rounded-lg border px-3 py-2 text-center text-xs font-medium transition-colors ${
                        targetFormat === fmt.value
                          ? "border-blue-500 bg-blue-50 text-blue-700 dark:border-blue-400 dark:bg-blue-950/40 dark:text-blue-400"
                          : "border-zinc-200 text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
                      }`}
                    >
                      {fmt.label}
                    </button>
                  ))}
                </div>
              </div>

              {targetFormat !== "png" && (
                <div className="mt-4">
                  <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                    Quality: {Math.round(quality * 100)}%
                  </label>
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.01"
                    value={quality}
                    onChange={(e) => setQuality(parseFloat(e.target.value))}
                    className="mt-1.5 block w-full accent-blue-600"
                    aria-label="Quality"
                  />
                </div>
              )}
            </div>

            <button
              onClick={handleConvert}
              disabled={isProcessing || !width || !height}
              className="w-full rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
            >
              {isProcessing ? "Resizing..." : "Resize Image"}
            </button>
          </div>
        )}
      </div>

      {isProcessing && (
        <div className="mt-6">
          <ProcessingLoader />
        </div>
      )}

      {resultUrl && !isProcessing && (
        <div className="mt-6 space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <ImagePreview
              src={resultUrl}
              label="Resized"
              alt="Resized image"
              fileSize={resultBlob ? formatFileSize(resultBlob.size) : undefined}
              showZoom
            />
            <div className="flex flex-col justify-end gap-4">
              {sizeChange !== 0 && (
                <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
                  <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    Size Comparison
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-zinc-600 dark:text-zinc-400">Original</span>
                      <span className="font-medium text-zinc-900 dark:text-zinc-50">{formatFileSize(originalSize)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-zinc-600 dark:text-zinc-400">Resized</span>
                      <span className="font-medium text-zinc-900 dark:text-zinc-50">{formatFileSize(newSize)}</span>
                    </div>
                    {sizeChange > 0 && (
                      <div className="mt-2 rounded bg-emerald-50 px-2 py-1.5 text-center text-xs font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                        Saved {sizeChange}% ({formatFileSize(originalSize - newSize)})
                      </div>
                    )}
                    {sizeChange < 0 && (
                      <div className="mt-2 rounded bg-amber-50 px-2 py-1.5 text-center text-xs font-semibold text-amber-700 dark:bg-amber-950/50 dark:text-amber-400">
                        {Math.abs(sizeChange)}% larger
                      </div>
                    )}
                  </div>
                </div>
              )}
              <DownloadButton blob={resultBlob} filename={getFilename()} />
              <p className="text-xs text-zinc-400 dark:text-zinc-500">
                Your resized image is ready. No data was uploaded to any server.
              </p>
            </div>
          </div>
        </div>
      )}

      <FaqSection faqs={faqs} />
    </Container>
  );
}
