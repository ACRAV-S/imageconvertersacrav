"use client";

import { useRef, useState } from "react";

interface ImageUploaderProps {
  onUpload: (file: File) => void;
  disabled?: boolean;
  accept?: string;
  description?: string;
  multiple?: boolean;
}

const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif", "image/bmp", "image/tiff", "image/avif"];

export default function ImageUploader({ onUpload, disabled, accept, description, multiple }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragError, setDragError] = useState<string | null>(null);

  const handleFile = (file: File) => {
    setDragError(null);
    if (!accept?.includes("pdf") && !ACCEPTED_TYPES.includes(file.type)) {
      setDragError(`Unsupported file type: ${file.type || "unknown"}. Please upload an image file.`);
      return;
    }
    onUpload(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      inputRef.current?.click();
    }
  };

  return (
    <div>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !disabled && inputRef.current?.click()}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-label={description ? `Upload ${description}` : "Upload an image"}
        aria-disabled={disabled}
        className={`cursor-pointer rounded-xl border-2 border-dashed p-12 text-center transition-colors ${
          isDragging
            ? "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-950/30"
            : "border-zinc-200 bg-zinc-50 hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-zinc-700"
        } ${disabled ? "pointer-events-none opacity-50" : ""}`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept ?? "image/*"}
          multiple={multiple}
          className="hidden"
          aria-hidden="true"
          tabIndex={-1}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
            e.target.value = "";
          }}
        />
        <svg className="mx-auto h-10 w-10 text-zinc-400 dark:text-zinc-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
        </svg>
        <p className="mt-4 text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {isDragging ? "Drop your image here" : "Click to upload or drag and drop"}
        </p>
        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
          {description ?? (accept?.includes("pdf") ? "PDF" : "PNG, JPG, WebP, GIF, BMP, TIFF, AVIF")}
        </p>
      </div>
      {dragError && (
        <p className="mt-2 text-xs text-red-500 dark:text-red-400" role="alert">{dragError}</p>
      )}
    </div>
  );
}
