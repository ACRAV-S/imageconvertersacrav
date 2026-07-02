"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { formatFileSize } from "@/lib/image/imageUtils";

export interface ImageInfo {
  width: number;
  height: number;
  aspectRatio: string;
  fileSize: string;
  fileSizeBytes: number;
  fileName: string;
  mimeType: string;
  exif: Record<string, string>;
}

interface UseImageInfoReturn {
  info: ImageInfo | null;
  refresh: (file: File, imageElement?: HTMLImageElement | null) => void;
}

export function useImageInfo(): UseImageInfoReturn {
  const [info, setInfo] = useState<ImageInfo | null>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => { mountedRef.current = false; };
  }, []);

  const refresh = useCallback((file: File, imageElement?: HTMLImageElement | null) => {
    if (!mountedRef.current) return;

    const size = formatFileSize(file.size);

    if (imageElement) {
      setInfo(makeInfo(imageElement, size, file));
      return;
    }

    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      if (mountedRef.current) setInfo(makeInfo(img, size, file));
      URL.revokeObjectURL(url);
    };
    img.onerror = () => {
      if (mountedRef.current) {
        setInfo({
          width: 0,
          height: 0,
          aspectRatio: "N/A",
          fileSize: size,
          fileSizeBytes: file.size,
          fileName: file.name,
          mimeType: file.type || "unknown",
          exif: {},
        });
      }
      URL.revokeObjectURL(url);
    };
    img.src = url;
  }, []);

  return { info, refresh };
}

function gcdAspect(w: number, h: number): string {
  if (w === 0 || h === 0) return "N/A";
  const g = gcd(w, h);
  return `${w / g}:${h / g}`;
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

function makeInfo(img: HTMLImageElement, size: string, file: File): ImageInfo {
  return {
    width: img.naturalWidth,
    height: img.naturalHeight,
    aspectRatio: gcdAspect(img.naturalWidth, img.naturalHeight),
    fileSize: size,
    fileSizeBytes: file.size,
    fileName: file.name,
    mimeType: file.type || "unknown",
    exif: {},
  };
}
