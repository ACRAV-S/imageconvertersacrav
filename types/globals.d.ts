declare class BarcodeDetector {
  constructor(options?: { formats?: string[] });
  detect(image: ImageBitmap | HTMLCanvasElement | HTMLVideoElement): Promise<{ rawValue: string }[]>;
}

interface BarcodeDetectorOptions {
  formats?: string[];
}
