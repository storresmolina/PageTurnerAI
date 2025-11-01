"use client";
import NavBar from "@/components/NavBar";
import React, { useState, useEffect } from "react";

export default function SessionsPage() {
  const [sessions, setSessions] = useState([
    {
      student_name: "Ana",
      session_date: "2025-10-31",
      accuracy: 0.85,
      feedback_text: "Missed G4, good tempo and rhythm.",
      focus_prompt: "Focus on G major transitions.",
    },
    {
      student_name: "Leo",
      session_date: "2025-10-30",
      accuracy: 0.73,
      feedback_text: "Wrong rhythm, shaky timing.",
      focus_prompt: "Slow down practice tempo.",
    },
  ]);

  return (
    <div className="p-8">
    <h2 className="text-2xl font-semibold mb-6">🎧 Student Practice Sessions</h2>

    <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden">
        <thead className="bg-sky-500 text-white">
        <tr>
            <th className="p-3 text-left">Student</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Confidence</th>
            <th className="p-3 text-left">Feedback</th>
            <th className="p-3 text-left">Focus Area</th>
        </tr>
        </thead>
        <tbody>
        {sessions.map((s, i) => (
            <tr key={i} className="border-b hover:bg-gray-100">
            <td className="p-3 font-medium">{s.student_name}</td>
            <td className="p-3">{s.session_date}</td>
            <td className="p-3">{(s.accuracy * 100).toFixed(1)}%</td>
            <td className="p-3">{s.feedback_text}</td>
            <td className="p-3 italic text-gray-600">{s.focus_prompt}</td>
            </tr>
        ))}
        </tbody>
    </table>
    </div>
  );
}
