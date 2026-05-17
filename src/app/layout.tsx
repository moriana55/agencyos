import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AgencyOS | AI-Powered Agency Hub",
  description: "Next-generation agency management and social intelligence platform.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="tr" className="scroll-smooth">
        <body className={`${inter.className} bg-[#F8FAFC] text-slate-900 antialiased relative`}>
          {/* Film Grain Overlay */}
          <div className="film-grain pointer-events-none fixed inset-0 z-[9999] opacity-[0.015]" />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
