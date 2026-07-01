"use client";

import { useState, useCallback, useRef } from "react";
import Link from "next/link";
import Container from "@/components/common/Container";
import ImageUploader from "@/components/tools/ImageUploader";
import ImagePreview from "@/components/tools/ImagePreview";
import ImageSettings from "@/components/tools/ImageSettings";
import DownloadButton from "@/components/tools/DownloadButton";
import ProcessingLoader from "@/components/tools/ProcessingLoader";
import { readFileAsDataURL, loadImage, formatFileSize, getFormatConfig } from "@/lib/image/imageUtils";
import { convertImage } from "@/lib/image/imageConverter";

export default function ImageConverterPage() {
  const [sourceDataUrl, setSourceDataUrl] = useState<string | null>(null);
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [sourceImage, setSourceImage] = useState<HTMLImageElement | null>(null);
  const [targetFormat, setTargetFormat] = useState("png");
  const [quality, setQuality] = useState(0.92);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const resultUrlRef = useRef<string | null>(null);

  const handleUpload = useCallback(async (file: File) => {
    setError(null);
    setResultBlob(null);
    if (resultUrlRef.current) {
      URL.revokeObjectURL(resultUrlRef.current);
      resultUrlRef.current = null;
    }
    setResultUrl(null);
    setSourceImage(null);

    try {
      const dataUrl = await readFileAsDataURL(file);
      setSourceDataUrl(dataUrl);
      setSourceFile(file);
      const img = await loadImage(dataUrl);
      setSourceImage(img);
    } catch {
      setError("Failed to load image. Please try another file.");
    }
  }, []);

  const handleConvert = useCallback(async () => {
    if (!sourceImage) return;
    setIsProcessing(true);
    setError(null);
    setResultBlob(null);
    if (resultUrlRef.current) {
      URL.revokeObjectURL(resultUrlRef.current);
      resultUrlRef.current = null;
    }
    setResultUrl(null);

    try {
      const config = getFormatConfig(targetFormat);
      if (!config) throw new Error("Invalid format");

      const blob = await convertImage(sourceImage, config.mime, quality);
      const url = URL.createObjectURL(blob);
      resultUrlRef.current = url;
      setResultBlob(blob);
      setResultUrl(url);
    } catch {
      setError("Conversion failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  }, [sourceImage, targetFormat, quality]);

  const getFilename = () => {
    if (!sourceFile) return `converted${getFormatConfig(targetFormat)?.extension ?? ".png"}`;
    const name = sourceFile.name.replace(/\.[^.]+$/, "");
    return `${name}${getFormatConfig(targetFormat)?.extension ?? ".png"}`;
  };

  return (
    <Container className="py-12">
      <div className="mb-8">
        <Link href="/tools" className="text-sm text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors">
          &larr; All Tools
        </Link>
      </div>

      <div className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          Image Converter
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Convert images between PNG, JPG, and WebP formats. All processing runs in your browser.
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
                onClick={() => {
                  setSourceDataUrl(null);
                  setSourceFile(null);
                  setSourceImage(null);
                  setResultBlob(null);
                  if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current);
                  setResultUrl(null);
                  setError(null);
                }}
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
              />

              <button
                onClick={handleConvert}
                disabled={isProcessing}
                className="w-full rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
              >
                {isProcessing ? "Converting..." : "Convert Image"}
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
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <ImagePreview
            src={resultUrl}
            label="Converted"
            alt="Converted image"
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
    </Container>
  );
}
