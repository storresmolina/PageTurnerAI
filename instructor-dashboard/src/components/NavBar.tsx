"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();

  const tabs = [
    { name: "Library", href: "/library" },
    { name: "Student Practice Sessions", href: "/sessions" },
    { name: "Notebooks", href: "/notebooks" },
  ];

  return (
    <nav className="bg-sky-600 text-white px-6 py-3 flex justify-between items-center">
      <Link href="/">
        <h1 className="text-xl font-bold cursor-pointer hover:underline">
          🎓 Instructor Dashboard
        </h1>
      </Link>
      <div className="flex space-x-6">
        {tabs.map((tab) => (
          <Link key={tab.name} href={tab.href}>
            <span
              className={`hover:underline ${
                pathname === tab.href ? "font-bold underline" : ""
              }`}
            >
              {tab.name}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
