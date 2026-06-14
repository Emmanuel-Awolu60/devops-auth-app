import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DevOps Auth App",
  description: "Full-stack auth — a DevOps learning project",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-gray-100 antialiased">{children}</body>
    </html>
  );
}
