"use client";

import { useState, useCallback } from "react";
import Container from "@/components/common/Container";
import ImageUploader from "@/components/tools/ImageUploader";
import ImagePreview from "@/components/tools/ImagePreview";
import ImageSettings from "@/components/tools/ImageSettings";
import ImageInfoOverlay from "@/components/tools/ImageInfoOverlay";
import DownloadButton from "@/components/tools/DownloadButton";
import ProcessingLoader from "@/components/tools/ProcessingLoader";
import { formatFileSize, getFormatConfig } from "@/lib/image/imageUtils";
import { convertImage } from "@/lib/image/imageConverter";
import { useImageTool } from "@/hooks/useImageTool";
import { useImageInfo } from "@/hooks/useImageInfo";
import ErrorAlert from "@/components/tools/ErrorAlert";
import FaqSection from "@/components/tools/FaqSection";
import type { FaqItem } from "@/components/tools/FaqSection";

interface ImageToolShellProps {
  title: string;
  description: string;
  faqs: FaqItem[];
  acceptedFormats: string[];
  targetFormat: string;
  targetFormats?: string[];
}

export default function ImageToolShell({
  title,
  description,
  faqs,
  acceptedFormats,
  targetFormat: defaultTargetFormat,
  targetFormats,
}: ImageToolShellProps) {
  const [targetFormat, setTargetFormat] = useState(defaultTargetFormat);
  const [quality, setQuality] = useState(0.92);
  const {
    sourceDataUrl, sourceFile, sourceImage,
    isProcessing, resultBlob, resultUrl, error,
    setIsProcessing, setResultBlob, setResultUrl, setError,
    handleUpload: baseUpload, handleReset,
  } = useImageTool();
  const { info: sourceInfo, refresh: refreshSourceInfo } = useImageInfo();

  const formats = targetFormats ?? [defaultTargetFormat];

  const handleUpload = useCallback(async (file: File) => {
    if (!acceptedFormats.includes(file.type)) {
      setError(`Please upload a ${acceptedFormats.map((f) => f.split("/")[1].toUpperCase()).join(" or ")} file.`);
      return;
    }
    await baseUpload(file);
    refreshSourceInfo(file);
  }, [acceptedFormats, baseUpload, setError, refreshSourceInfo]);

  const handleConvert = useCallback(async () => {
    if (!sourceImage) return;
    setIsProcessing(true);
    setError(null);
    setResultBlob(null);
    setResultUrl(null);

    try {
      const config = getFormatConfig(targetFormat);
      if (!config) throw new Error("Invalid format");
      const blob = await convertImage(sourceImage, config.mime, quality);
      if (resultUrl) URL.revokeObjectURL(resultUrl);
      const url = URL.createObjectURL(blob);
      setResultBlob(blob);
      setResultUrl(url);
    } catch {
      setError("Conversion failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  }, [sourceImage, targetFormat, quality, resultUrl, setIsProcessing, setError, setResultBlob, setResultUrl]);

  const getFilename = () => {
    const ext = getFormatConfig(targetFormat)?.extension ?? ".png";
    if (!sourceFile) return `converted${ext}`;
    return `${sourceFile.name.replace(/\.[^.]+$/, "")}${ext}`;
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

        <div className="space-y-6">
          {sourceImage && (
            <>
              <ImageSettings
                targetFormat={targetFormat}
                quality={quality}
                onFormatChange={setTargetFormat}
                onQualityChange={setQuality}
                availableFormats={targetFormats}
              />

              <button
                onClick={handleConvert}
                disabled={isProcessing}
                className="w-full rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
              >
                {isProcessing ? "Converting..." : `Convert to ${getFormatConfig(targetFormat)?.label ?? targetFormat.toUpperCase()}`}
              </button>
            </>
          )}
        </div>
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
              label="Converted"
              alt="Converted image"
              fileSize={resultBlob ? formatFileSize(resultBlob.size) : undefined}
              showZoom
            />
            <div className="flex flex-col justify-end gap-4">
              {savings !== 0 && (
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
                      <span className="text-zinc-600 dark:text-zinc-400">Converted</span>
                      <span className="font-medium text-zinc-900 dark:text-zinc-50">{formatFileSize(compressedSize)}</span>
                    </div>
                    {savings > 0 && (
                      <div className="mt-2 rounded bg-emerald-50 px-2 py-1.5 text-center text-xs font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                        Saved {savings}% ({formatFileSize(originalSize - compressedSize)})
                      </div>
                    )}
                    {savings < 0 && (
                      <div className="mt-2 rounded bg-amber-50 px-2 py-1.5 text-center text-xs font-semibold text-amber-700 dark:bg-amber-950/50 dark:text-amber-400">
                        {Math.abs(savings)}% larger
                      </div>
                    )}
                  </div>
                </div>
              )}
              <DownloadButton blob={resultBlob} filename={getFilename()} />
              <p className="text-xs text-zinc-400 dark:text-zinc-500">
                Your file is processed and ready to download. No data was uploaded to any server.
              </p>
            </div>
          </div>
        </div>
      )}

      <FaqSection faqs={faqs} />
    </Container>
  );
}
