import type { Metadata } from "next";
import { Orbitron, Inter } from "next/font/google";
import "./globals.css";
import InteractiveBackground from "@/components/InteractiveBackground";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "9TH REALM | Liquid Intelligence",
  description: "The Apex of Strategic Synergy & Innovation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${orbitron.variable} ${inter.variable} antialiased bg-[#020205] text-[#e0e0e0]`}>
        <InteractiveBackground />
        {children}
      </body>
    </html>
  );
}
