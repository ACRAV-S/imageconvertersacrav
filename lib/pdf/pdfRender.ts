import * as pdfjsLib from "pdfjs-dist";
import { readFileAsArrayBuffer } from "./pdfUtils";

let workerInitialized = false;

function ensureWorker() {
  if (workerInitialized) return;
  workerInitialized = true;
  try {
    const workerUrl = new URL(
      "pdfjs-dist/build/pdf.worker.min.mjs",
      import.meta.url
    );
    pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl.toString();
  } catch {
    // Run on main thread
  }
}

export interface RenderedPage {
  blob: Blob;
  pageNumber: number;
  width: number;
  height: number;
}

export async function renderPdfToImages(
  file: File,
  scale: number = 0.4
): Promise<RenderedPage[]> {
  ensureWorker();
  const buffer = await readFileAsArrayBuffer(file);
  const loadingTask = pdfjsLib.getDocument({ data: buffer.slice(0) });
  const doc = await loadingTask.promise;
  const results: RenderedPage[] = [];

  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({ canvasContext: ctx, viewport, canvas }).promise;

    const blob = await new Promise<Blob>((resolve) =>
      canvas.toBlob((b) => resolve(b!), "image/jpeg", 0.85)
    );

    results.push({
      blob,
      pageNumber: i,
      width: viewport.width,
      height: viewport.height,
    });
  }

  return results;
}

export async function convertPdfToJpg(
  file: File,
  options?: { scale?: number; format?: "jpeg" | "png"; quality?: number }
): Promise<Blob[]> {
  const scale = options?.scale ?? 2;
  const format = options?.format ?? "jpeg";
  const quality = options?.quality ?? 0.92;
  const mime = format === "png" ? "image/png" : "image/jpeg";

  ensureWorker();
  const buffer = await readFileAsArrayBuffer(file);
  const loadingTask = pdfjsLib.getDocument({ data: buffer.slice(0) });
  const doc = await loadingTask.promise;
  const blobs: Blob[] = [];

  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const viewport = page.getViewport({ scale });
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({ canvasContext: ctx, viewport, canvas }).promise;

    const blob = await new Promise<Blob>((resolve) =>
      canvas.toBlob((b) => resolve(b!), mime, quality)
    );
    blobs.push(blob);
  }

  return blobs;
}
