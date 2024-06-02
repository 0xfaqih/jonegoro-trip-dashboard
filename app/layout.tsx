import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./custom.css";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dasboard Jonegoro Trip",
  description: "Dashboard for API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex`}>
        <Sidebar/>
        <div className="flex-grow p-4 ml-40">
          {children}
        </div>
        <Toaster/>
      </body>
    </html>
  );
}
