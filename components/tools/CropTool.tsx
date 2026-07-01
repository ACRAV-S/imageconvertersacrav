"use client";

import { useState, useCallback } from "react";
import Container from "@/components/common/Container";
import ImageUploader from "@/components/tools/ImageUploader";
import ImagePreview from "@/components/tools/ImagePreview";
import DownloadButton from "@/components/tools/DownloadButton";
import ProcessingLoader from "@/components/tools/ProcessingLoader";
import { formatFileSize } from "@/lib/image/imageUtils";
import { cropImage } from "@/lib/image/imageTransform";
import { useImageTool } from "@/hooks/useImageTool";

interface FaqItem {
  question: string;
  answer: string;
}

interface CropToolProps {
  title: string;
  description: string;
  faqs: FaqItem[];
}

export default function CropTool({ title, description, faqs }: CropToolProps) {
  const {
    sourceDataUrl, sourceFile, sourceImage,
    isProcessing, resultBlob, resultUrl, error,
    setIsProcessing, setResultBlob, setResultUrl, setError,
    handleUpload: baseUpload, handleReset,
  } = useImageTool();

  const [cropX, setCropX] = useState(0);
  const [cropY, setCropY] = useState(0);
  const [cropW, setCropW] = useState(100);
  const [cropH, setCropH] = useState(100);

  const handleUpload = useCallback(async (file: File) => {
    await baseUpload(file);
  }, [baseUpload]);

  const handleCrop = useCallback(async () => {
    if (!sourceImage) return;
    if (cropW < 1 || cropH < 1) {
      setError("Crop width and height must be at least 1 pixel.");
      return;
    }
    setIsProcessing(true);
    setError(null);
    setResultBlob(null);
    setResultUrl(null);

    try {
      const blob = await cropImage(sourceImage, cropX, cropY, cropW, cropH);
      const url = URL.createObjectURL(blob);
      setResultBlob(blob);
      setResultUrl(url);
    } catch {
      setError("Cropping failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  }, [sourceImage, cropX, cropY, cropW, cropH, setIsProcessing, setError, setResultBlob, setResultUrl]);

  const getFilename = () => {
    const base = sourceFile ? sourceFile.name.replace(/\.[^.]+$/, "") : "image";
    return `${base}-cropped.png`;
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
                Crop Settings
              </h3>

              <p className="mb-4 text-xs text-zinc-500 dark:text-zinc-400">
                Image size: {sourceImage.naturalWidth} &times; {sourceImage.naturalHeight} px
              </p>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400" id="crop-x-label">
                    X Offset
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={sourceImage.naturalWidth - 1}
                    value={cropX}
                    onChange={(e) => setCropX(Math.max(0, parseInt(e.target.value) || 0))}
                    className="mt-1 block w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                    aria-labelledby="crop-x-label"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400" id="crop-y-label">
                    Y Offset
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={sourceImage.naturalHeight - 1}
                    value={cropY}
                    onChange={(e) => setCropY(Math.max(0, parseInt(e.target.value) || 0))}
                    className="mt-1 block w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                    aria-labelledby="crop-y-label"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400" id="crop-w-label">
                    Width
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={sourceImage.naturalWidth - cropX}
                    value={cropW}
                    onChange={(e) => setCropW(Math.max(1, parseInt(e.target.value) || 1))}
                    className="mt-1 block w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                    aria-labelledby="crop-w-label"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400" id="crop-h-label">
                    Height
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={sourceImage.naturalHeight - cropY}
                    value={cropH}
                    onChange={(e) => setCropH(Math.max(1, parseInt(e.target.value) || 1))}
                    className="mt-1 block w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                    aria-labelledby="crop-h-label"
                  />
                </div>
              </div>

              <button
                onClick={handleCrop}
                disabled={isProcessing}
                className="mt-6 w-full rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
              >
                {isProcessing ? "Cropping..." : "Crop Image"}
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
            label="Cropped"
            alt="Cropped image"
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
