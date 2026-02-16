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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const hideToolbar = () => {
                  const elements = [
                    'vercel-live-feedback',
                    '#vercel-live-feedback',
                    '[data-vercel-toolbar]',
                    '.vercel-toolbar'
                  ];
                  elements.forEach(selector => {
                    const el = document.querySelector(selector);
                    if (el) el.remove();
                  });
                };
                hideToolbar();
                const observer = new MutationObserver(hideToolbar);
                observer.observe(document.body, { childList: true, subtree: true });
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
