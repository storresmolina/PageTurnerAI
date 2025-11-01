export default function HomePage() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4 text-sky-700">
        Welcome to PageTurner AI
      </h1>

      <p className="text-lg text-gray-700 max-w-2xl">
        This is the <strong>Instructor Dashboard</strong> — a companion to the
        PageTurner AI app. Here you can manage materials, monitor student
        progress, and plan future lessons all in one place.
      </p>

      <ul className="list-disc list-inside text-gray-700 mt-6 space-y-2">
        <li>
          📚 <strong>Library:</strong> Upload and manage sheet music or practice
          materials for your students.
        </li>
        <li>
          🎧 <strong>Student Practice Sessions:</strong> Review student
          recordings, AI-generated feedback, and performance confidence scores.
        </li>
        <li>
          📝 <strong>Notebooks:</strong> Keep personal notes and plan class
          material for each student.
        </li>
      </ul>

      <div className="mt-10">
        <p className="text-gray-600 text-base">
          Use the navigation bar above to switch between sections.
        </p>
        <p className="text-gray-500 text-sm mt-2 italic">
          (You can return here anytime by clicking “Instructor Dashboard” in the top bar.)
        </p>
      </div>
    </div>
  );
}
