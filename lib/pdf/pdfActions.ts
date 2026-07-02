import { PDFDocument, degrees } from "pdf-lib";
import { readFileAsArrayBuffer } from "./pdfUtils";

async function loadDoc(file: File): Promise<PDFDocument> {
  const bytes = await readFileAsArrayBuffer(file);
  return PDFDocument.load(bytes, { ignoreEncryption: true });
}

async function saveBlob(doc: PDFDocument): Promise<Blob> {
  const pdfBytes = await doc.save({ useObjectStreams: true });
  return new Blob([pdfBytes as unknown as Blob], { type: "application/pdf" });
}

function getPageIndices(doc: PDFDocument): number[] {
  return Array.from({ length: doc.getPageCount() }, (_, i) => i);
}

export async function mergePdfs(files: File[]): Promise<Blob> {
  const merged = await PDFDocument.create();
  for (const file of files) {
    const sourceDoc = await loadDoc(file);
    const pages = await merged.copyPages(sourceDoc, getPageIndices(sourceDoc));
    for (const page of pages) merged.addPage(page);
  }
  return saveBlob(merged);
}

export async function splitPdf(file: File): Promise<Blob[]> {
  const sourceDoc = await loadDoc(file);
  const indices = getPageIndices(sourceDoc);
  const results: Blob[] = [];
  for (const idx of indices) {
    const newDoc = await PDFDocument.create();
    const [page] = await newDoc.copyPages(sourceDoc, [idx]);
    newDoc.addPage(page);
    results.push(await saveBlob(newDoc));
  }
  return results;
}

export async function rotatePdf(
  file: File,
  pageIndices: number[],
  rotation: 90 | 180 | 270
): Promise<Blob> {
  const doc = await loadDoc(file);
  const rotMap: Record<number, ReturnType<typeof degrees>> = {
    90: degrees(90),
    180: degrees(180),
    270: degrees(270),
  };
  const rotObj = rotMap[rotation];
  for (const idx of pageIndices) {
    const page = doc.getPage(idx);
    const current = page.getRotation().angle;
    page.setRotation(degrees((current + rotation) % 360));
  }
  return saveBlob(doc);
}

export async function deletePdfPages(
  file: File,
  pageIndices: number[]
): Promise<Blob> {
  const doc = await loadDoc(file);
  const sorted = [...pageIndices].sort((a, b) => b - a);
  for (const idx of sorted) {
    doc.removePage(idx);
  }
  return saveBlob(doc);
}

export async function extractPdfPages(
  file: File,
  pageIndices: number[]
): Promise<Blob> {
  const sourceDoc = await loadDoc(file);
  const newDoc = await PDFDocument.create();
  const pages = await newDoc.copyPages(sourceDoc, pageIndices);
  for (const page of pages) newDoc.addPage(page);
  return saveBlob(newDoc);
}

export async function reorderPdfPages(
  file: File,
  newOrder: number[]
): Promise<Blob> {
  const sourceDoc = await loadDoc(file);
  const newDoc = await PDFDocument.create();
  const pages = await newDoc.copyPages(sourceDoc, newOrder);
  for (const page of pages) newDoc.addPage(page);
  return saveBlob(newDoc);
}

export async function compressPdf(file: File): Promise<Blob> {
  const bytes = await readFileAsArrayBuffer(file);
  const doc = await PDFDocument.load(bytes, { ignoreEncryption: true });
  const pdfBytes = await doc.save({
    useObjectStreams: true,
    objectsPerTick: 50,
  });
  return new Blob([pdfBytes as unknown as Blob], { type: "application/pdf" });
}
