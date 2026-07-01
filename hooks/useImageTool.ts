"use client";

import { useState, useCallback, useRef } from "react";
import { readFileAsDataURL, loadImage } from "@/lib/image/imageUtils";

interface UseImageToolReturn {
  sourceDataUrl: string | null;
  sourceFile: File | null;
  sourceImage: HTMLImageElement | null;
  isProcessing: boolean;
  resultBlob: Blob | null;
  resultUrl: string | null;
  error: string | null;
  setIsProcessing: (v: boolean) => void;
  setResultBlob: (v: Blob | null) => void;
  setResultUrl: (v: string | null) => void;
  setError: (v: string | null) => void;
  handleUpload: (file: File) => Promise<void>;
  handleReset: () => void;
  clearResult: () => void;
}

export function useImageTool(): UseImageToolReturn {
  const [sourceDataUrl, setSourceDataUrl] = useState<string | null>(null);
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [sourceImage, setSourceImage] = useState<HTMLImageElement | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultBlob, setResultBlob] = useState<Blob | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const resultUrlRef = useRef<string | null>(null);

  const clearResult = useCallback(() => {
    setResultBlob(null);
    if (resultUrlRef.current) {
      URL.revokeObjectURL(resultUrlRef.current);
      resultUrlRef.current = null;
    }
    setResultUrl(null);
  }, []);

  const handleUpload = useCallback(async (file: File) => {
    setError(null);
    clearResult();
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
  }, [clearResult]);

  const handleReset = useCallback(() => {
    setSourceDataUrl(null);
    setSourceFile(null);
    setSourceImage(null);
    clearResult();
    setError(null);
  }, [clearResult]);

  return {
    sourceDataUrl,
    sourceFile,
    sourceImage,
    isProcessing,
    resultBlob,
    resultUrl,
    error,
    setIsProcessing,
    setResultBlob,
    setResultUrl,
    setError,
    handleUpload,
    handleReset,
    clearResult,
  };
}
