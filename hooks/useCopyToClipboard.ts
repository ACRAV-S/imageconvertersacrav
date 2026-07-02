"use client";

import { useState, useCallback, useRef } from "react";

interface UseCopyToClipboardReturn {
  copied: boolean;
  copy: (text: string) => Promise<void>;
}

export function useCopyToClipboard(resetMs = 2000): UseCopyToClipboardReturn {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), resetMs);
    } catch {
      // Clipboard not available
    }
  }, [resetMs]);

  return { copied, copy };
}
