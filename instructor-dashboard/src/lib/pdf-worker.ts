// src/lib/pdf-worker.ts
let pdfjsLib: any = null;

export async function getPdfJs() {
  if (typeof window === "undefined") {
    return null; // don’t run on server
  }

  if (!pdfjsLib) {
    const pdfjsModule = await import("pdfjs-dist/build/pdf");
    const worker = await import("pdfjs-dist/build/pdf.worker?url");
    pdfjsModule.GlobalWorkerOptions.workerSrc = worker.default;
    pdfjsLib = pdfjsModule;
  }

  return pdfjsLib;
}
