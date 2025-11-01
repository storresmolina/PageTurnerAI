import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "PageTurner Instructor Dashboard",
  description: "Instructor tools for reviewing student progress",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <NavBar />  {/* 👈 Always visible */}
        <main>{children}</main>
      </body>
    </html>
  );
}
