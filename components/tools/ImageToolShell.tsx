"use client";

import { useState, useCallback } from "react";
import Container from "@/components/common/Container";
import ImageUploader from "@/components/tools/ImageUploader";
import ImagePreview from "@/components/tools/ImagePreview";
import ImageSettings from "@/components/tools/ImageSettings";
import DownloadButton from "@/components/tools/DownloadButton";
import ProcessingLoader from "@/components/tools/ProcessingLoader";
import { formatFileSize, getFormatConfig } from "@/lib/image/imageUtils";
import { convertImage } from "@/lib/image/imageConverter";
import { useImageTool } from "@/hooks/useImageTool";

export interface FaqItem {
  question: string;
  answer: string;
}

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

  const formats = targetFormats ?? [defaultTargetFormat];

  const handleUpload = useCallback(async (file: File) => {
    if (!acceptedFormats.includes(file.type)) {
      setError(`Please upload a ${acceptedFormats.map((f) => f.split("/")[1].toUpperCase()).join(" or ")} file.`);
      return;
    }
    await baseUpload(file);
  }, [acceptedFormats, baseUpload, setError]);

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
      const url = URL.createObjectURL(blob);
      setResultBlob(blob);
      setResultUrl(url);
    } catch {
      setError("Conversion failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  }, [sourceImage, targetFormat, quality, setIsProcessing, setError, setResultBlob, setResultUrl]);

  const getFilename = () => {
    const ext = getFormatConfig(targetFormat)?.extension ?? ".png";
    if (!sourceFile) return `converted${ext}`;
    return `${sourceFile.name.replace(/\.[^.]+$/, "")}${ext}`;
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
