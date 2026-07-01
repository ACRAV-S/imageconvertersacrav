import { readFileAsArrayBuffer } from "./pdfUtils";

export interface PdfMetadata {
  title: string | null;
  author: string | null;
  subject: string | null;
  keywords: string | null;
  creator: string | null;
  producer: string | null;
  creationDate: string | null;
  modDate: string | null;
  pageCount: number | null;
  fileSize: number;
}

function extractField(text: string, field: string): string | null {
  const raw = new RegExp(`/${field}\\s*\\(([^)]*)\\)`, "i").exec(text);
  if (raw) return raw[1];

  const hex = new RegExp(`/${field}\\s*<([0-9a-fA-F]+)>`, "i").exec(text);
  if (hex) {
    try {
      return decodeURIComponent(
        hex[1].replace(/([0-9a-fA-F]{2})/g, (_, h) => `%${h}`)
      );
    } catch {
      return hex[1];
    }
  }

  return null;
}

export async function extractPdfMetadata(file: File): Promise<PdfMetadata> {
  const buffer = await readFileAsArrayBuffer(file);
  const bytes = new Uint8Array(buffer);

  let text = "";
  for (let i = 0; i < bytes.length; i++) {
    text += String.fromCharCode(bytes[i]);
  }

  const pageCountMatch = /\/Count\s+(\d+)/i.exec(text);
  const pageCount = pageCountMatch ? parseInt(pageCountMatch[1], 10) : null;

  return {
    title: extractField(text, "Title"),
    author: extractField(text, "Author"),
    subject: extractField(text, "Subject"),
    keywords: extractField(text, "Keywords"),
    creator: extractField(text, "Creator"),
    producer: extractField(text, "Producer"),
    creationDate: extractField(text, "CreationDate"),
    modDate: extractField(text, "ModDate"),
    pageCount,
    fileSize: file.size,
  };
}

export function formatDateString(pdfDate: string | null): string {
  if (!pdfDate) return "N/A";
  const match = pdfDate.match(/^D:(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/);
  if (!match) return pdfDate;
  const [, y, m, d, h, min, s] = match;
  return `${y}-${m}-${d} ${h}:${min}:${s}`;
}
