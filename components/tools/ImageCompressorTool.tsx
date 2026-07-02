"use client";

import { useState, useCallback } from "react";
import Container from "@/components/common/Container";
import ImageUploader from "@/components/tools/ImageUploader";
import ImagePreview from "@/components/tools/ImagePreview";
import ImageInfoOverlay from "@/components/tools/ImageInfoOverlay";
import DownloadButton from "@/components/tools/DownloadButton";
import ProcessingLoader from "@/components/tools/ProcessingLoader";
import { formatFileSize } from "@/lib/image/imageUtils";
import { compressImage } from "@/lib/image/imageCompressor";
import { useImageTool } from "@/hooks/useImageTool";
import { useImageInfo } from "@/hooks/useImageInfo";
import ErrorAlert from "@/components/tools/ErrorAlert";
import FaqSection from "@/components/tools/FaqSection";
import type { FaqItem } from "@/components/tools/FaqSection";

interface ImageCompressorToolProps {
  faqs: FaqItem[];
}

export default function ImageCompressorTool({ faqs }: ImageCompressorToolProps) {
  const [quality, setQuality] = useState(0.8);

  const {
    sourceDataUrl, sourceFile, sourceImage,
    isProcessing, resultBlob, resultUrl, error,
    setIsProcessing, setResultBlob, setResultUrl, setError,
    handleUpload: baseUpload, handleReset,
  } = useImageTool();
  const { info: sourceInfo, refresh: refreshSourceInfo } = useImageInfo();

  const handleUpload = useCallback(async (file: File) => {
    await baseUpload(file);
    refreshSourceInfo(file);
  }, [baseUpload, refreshSourceInfo]);

  const handleConvert = useCallback(async () => {
    if (!sourceImage) return;
    setIsProcessing(true);
    setError(null);
    setResultBlob(null);
    setResultUrl(null);

    try {
      const blob = await compressImage(sourceImage, quality);
      if (resultUrl) URL.revokeObjectURL(resultUrl);
      const url = URL.createObjectURL(blob);
      setResultBlob(blob);
      setResultUrl(url);
    } catch {
      setError("Compression failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  }, [sourceImage, quality, resultUrl, setIsProcessing, setError, setResultBlob, setResultUrl]);

  const getFilename = () => {
    if (!sourceFile) return "compressed.jpg";
    return `${sourceFile.name.replace(/\.[^.]+$/, "")}_compressed.jpg`;
  };

  const originalSize = sourceFile ? sourceFile.size : 0;
  const compressedSize = resultBlob ? resultBlob.size : 0;
  const savings = originalSize > 0 && compressedSize > 0
    ? Math.round((1 - compressedSize / originalSize) * 100)
    : 0;

  return (
    <Container className="py-12">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          Image Compressor
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Compress your images to reduce file size while maintaining good visual quality. All processing runs in your browser.
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
              <h3 className="mb-4 text-sm font-semibold text-zinc-700 dark:text-zinc-300">Compression Settings</h3>

              <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400" id="quality-label">
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
                aria-labelledby="quality-label"
              />

              <div className="mt-4 flex justify-between text-xs text-zinc-400 dark:text-zinc-500">
                <span>Smaller file</span>
                <span>Better quality</span>
              </div>

              {resultBlob && (
                <div className="mt-4 rounded-lg bg-zinc-50 p-3 dark:bg-zinc-950">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-600 dark:text-zinc-400">Original</span>
                    <span className="font-medium text-zinc-900 dark:text-zinc-50">{formatFileSize(originalSize)}</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-sm">
                    <span className="text-zinc-600 dark:text-zinc-400">Compressed</span>
                    <span className="font-medium text-emerald-600 dark:text-emerald-500">{formatFileSize(compressedSize)}</span>
                  </div>
                  {savings > 0 && (
                    <div className="mt-2 rounded bg-emerald-50 px-2 py-1 text-center text-xs font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                      Saved {savings}% — {formatFileSize(originalSize - compressedSize)}
                    </div>
                  )}
                </div>
              )}
            </div>

            <button
              onClick={handleConvert}
              disabled={isProcessing}
              className="w-full rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
            >
              {isProcessing ? "Compressing..." : "Compress Image"}
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
        <div className="mt-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <ImagePreview
              src={resultUrl}
              label="Compressed Preview"
              alt="Compressed image"
              fileSize={resultBlob ? formatFileSize(resultBlob.size) : undefined}
              showZoom
            />
            <div className="flex flex-col items-start justify-end gap-4">
              <DownloadButton blob={resultBlob} filename={getFilename()} />
              <p className="text-xs text-zinc-400 dark:text-zinc-500">
                Your compressed image is ready. No data was uploaded to any server.
              </p>
            </div>
          </div>
        </div>
      )}

      <FaqSection faqs={faqs} />
    </Container>
  );
}
