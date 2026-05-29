import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MyMate - Career Guidance Platform",
  description: "AI-powered career guidance platform for students.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "MyMate",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport = {
  themeColor: "#FF7E67",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

import Navbar from "@/components/layout/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
