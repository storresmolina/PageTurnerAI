"use client";
import { useState, useEffect } from "react";
import { getPdfJs } from "@/lib/pdf-worker";

interface UploadedPDF {
  name: string;
  previewUrl: string;
}

export default function LibraryPage() {
  const [files, setFiles] = useState<UploadedPDF[]>([]);
  const [loading, setLoading] = useState(false);
  const [pdfjs, setPdfjs] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const lib = await getPdfJs();
      setPdfjs(lib);
    })();
  }, []);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !pdfjs) return;
    setLoading(true);

    const fileReader = new FileReader();
    fileReader.onload = async function () {
      const typedArray = new Uint8Array(this.result as ArrayBuffer);
      const pdf = await pdfjs.getDocument({ data: typedArray }).promise;
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 0.8 });
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d")!;
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      await page.render({ canvasContext: context, viewport }).promise;
      const previewUrl = canvas.toDataURL();

      setFiles((prev) => [...prev, { name: file.name, previewUrl }]);
      setLoading(false);
    };
    fileReader.readAsArrayBuffer(file);
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-4">📚 Library</h2>
      <p>Upload and manage sheet music for your students here.</p>

      <div className="mt-6 border p-4 rounded-lg bg-gray-50">
        <input type="file" accept="application/pdf" onChange={handleFileUpload} />
        {loading && <p className="mt-2 text-sky-600">Processing preview...</p>}
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {files.map((file, index) => (
          <div
            key={index}
            className="rounded-lg shadow-md bg-white overflow-hidden border hover:shadow-lg transition"
          >
            <img
              src={file.previewUrl}
              alt={`Preview of ${file.name}`}
              className="w-full h-48 object-cover"
            />
            <div className="p-3 text-center">
              <p className="text-sm font-medium text-gray-700 truncate">{file.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
