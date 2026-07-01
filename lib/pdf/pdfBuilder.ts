import { readFileAsArrayBuffer, loadImageFromFile } from "./pdfUtils";

interface ImageEntry {
  data: ArrayBuffer;
  width: number;
  height: number;
}

function encode(str: string): Uint8Array {
  return new TextEncoder().encode(str);
}

function formatDate(date: Date): string {
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `D:${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`;
}

function buildPdfBlob(images: ImageEntry[]): Blob {
  const parts: Uint8Array[] = [];
  const offsets: number[] = [];

  function emit(data: Uint8Array) {
    offsets.push(parts.reduce((s, p) => s + p.length, 0));
    parts.push(data);
  }

  const header = encode("%PDF-1.4\n%\xFF\xFF\xFF\xFF\n");
  parts.push(header);

  let objCount = 0;
  const nextNum = () => ++objCount;

  const catNum = nextNum();
  const pagesNum = nextNum();
  const pageNums: number[] = [];
  const contentNums: number[] = [];
  const imageNums: number[] = [];
  const infoNum = nextNum();

  for (let i = 0; i < images.length; i++) {
    pageNums.push(nextNum());
    contentNums.push(nextNum());
    imageNums.push(nextNum());
  }

  const objs: string[] = [];

  // Catalog
  objs.push(`${catNum} 0 obj\n<< /Type /Catalog /Pages ${pagesNum} 0 R >>\nendobj\n`);

  // Pages node (filled after page objects)
  const pagesPlaceholder = pagesNum;

  for (let i = 0; i < images.length; i++) {
    const img = images[i];
    const w = img.width;
    const h = img.height;
    const pageNum = pageNums[i];
    const contentNum = contentNums[i];
    const imageNum = imageNums[i];

    const contentStream = `q ${w} 0 0 ${h} 0 0 cm /Im${i} Do Q\n`;
    objs.push(
      `${contentNum} 0 obj\n<< /Length ${contentStream.length} >>\nstream\n${contentStream}\nendstream\nendobj\n`
    );

    const jpegData = new Uint8Array(img.data);
    objs.push(
      `${imageNum} 0 obj\n<< /Type /XObject /Subtype /Image /Width ${w} /Height ${h} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpegData.length} >>\nstream\n`
    );
    // JPEG data will be emitted as raw bytes after the object
    const jpegObjEnd = `\nendstream\nendobj\n`;

    objs.push(
      `${pageNum} 0 obj\n<< /Type /Page /Parent ${pagesNum} 0 R /MediaBox [0 0 ${w} ${h}] /Contents ${contentNum} 0 R /Resources << /XObject << /Im${i} ${imageNum} 0 R >> >> >>\nendobj\n`
    );
  }

  // Info
  objs.push(
    `${infoNum} 0 obj\n<< /Title (Converted Image) /Producer (ImageConvertersACRAV) /CreationDate (${formatDate(new Date())}) >>\nendobj\n`
  );

  // Now emit all objects
  const objOffsets: number[] = [];

  // Write catalog
  objOffsets.push(parts.reduce((s, p) => s + p.length, 0));
  parts.push(encode(objs[0]));

  // Write pages (placeholder - fill after)
  const pagesObjStr = `${pagesNum} 0 obj\n<< /Type /Pages /Kids [${pageNums.map((n) => `${n} 0 R`).join(" ")}] /Count ${images.length} >>\nendobj\n`;
  objOffsets.push(parts.reduce((s, p) => s + p.length, 0));
  parts.push(encode(pagesObjStr));

  let objIdx = 1; // index into objs (skip catalog at 0)

  for (let i = 0; i < images.length; i++) {
    // content stream
    objOffsets.push(parts.reduce((s, p) => s + p.length, 0));
    parts.push(encode(objs[objIdx++]));
    objOffsets.push(parts.reduce((s, p) => s + p.length, 0));
    parts.push(encode(objs[objIdx++]));

    // image data
    objOffsets.push(parts.reduce((s, p) => s + p.length, 0));
    const jpegData = new Uint8Array(images[i].data);
    parts.push(jpegData);
    parts.push(encode(`\nendstream\nendobj\n`));

    // page
    objOffsets.push(parts.reduce((s, p) => s + p.length, 0));
    parts.push(encode(objs[objIdx++]));
  }

  // info
  objOffsets.push(parts.reduce((s, p) => s + p.length, 0));
  parts.push(encode(objs[objIdx++]));

  // xref table
  const xrefOffset = parts.reduce((s, p) => s + p.length, 0);
  const xrefEntries = objCount + 1;
  let xref = `xref\n0 ${xrefEntries}\n0000000000 65535 f \n`;
  for (const off of objOffsets) {
    xref += `${off.toString().padStart(10, "0")} 00000 n \n`;
  }
  xref += `trailer\n<< /Size ${xrefEntries} /Root ${catNum} 0 R /Info ${infoNum} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;
  parts.push(encode(xref));

  return new Blob(parts as BlobPart[], { type: "application/pdf" });
}

export async function convertJpegToPdf(files: File[]): Promise<Blob> {
  const images: ImageEntry[] = [];
  for (const file of files) {
    const data = await readFileAsArrayBuffer(file);
    const img = await loadImageFromFile(file);
    images.push({ data, width: img.naturalWidth, height: img.naturalHeight });
  }
  return buildPdfBlob(images);
}
