"use client";
import { useState } from "react";

export default function NotebooksPage() {
  const [notes, setNotes] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <div className="p-8">
        <h2 className="text-2xl font-semibold mb-4">📝 Notebooks</h2>
        <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Write class notes or plans here..."
            className="w-full h-60 p-4 border rounded-md"
        />
        <div className="mt-4">
            <button
            onClick={handleSave}
            className="bg-sky-500 text-white px-4 py-2 rounded"
            >
            Save Notes
            </button>
            {saved && <span className="ml-4 text-green-600">Saved!</span>}
        </div>
    </div>
  );
}
