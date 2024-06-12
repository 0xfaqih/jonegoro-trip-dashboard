"use client"

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./custom.css";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { usePathname } from "next/navigation";
import Loading from "@/components/Loading";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>
          <MainContent>{children}</MainContent>
          <Toaster />
        </body>
      </html>
    </AuthProvider>
  );
}

function MainContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Loading isLoading={loading} />;
  }

  if (!isAuthenticated && pathname !== "/login") {
    return null;
  }

  return (
    <div className={`flex ${pathname !== "/login" ? "" : "ml-40"}`}>
      {pathname !== "/login" && <Sidebar />}
      <div className="flex-grow p-4 ml-40">
        {children}
      </div>
    </div>
  );
}
