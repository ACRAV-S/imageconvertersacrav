export function validatePdfFile(file: File): string | null {
  if (file.type !== "application/pdf") {
    return "Please upload a PDF file.";
  }
  if (file.size === 0) {
    return "The PDF file appears to be empty.";
  }
  return null;
}
