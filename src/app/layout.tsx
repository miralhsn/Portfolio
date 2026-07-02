import type { Metadata } from "next";
import { Bebas_Neue, Manrope } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site";
import CustomCursor from "@/components/CustomCursor";
import SmoothScrollProvider from "@/components/motion/SmoothScrollProvider";

const display = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

const grotesk = Manrope({
  subsets: ["latin"],
  variable: "--font-grotesk",
});

export const metadata: Metadata = {
  title: "Miral Hasan — AI Systems Engineer",
  description: "Building production-grade AI systems across Computer Vision, NLP, RAG, and Agentic AI.",
  keywords: ["AI Engineer","Computer Vision","NLP","RAG","LLM","Machine Learning","Full Stack","Miral Hasan"],
  metadataBase: new URL(siteConfig.siteUrl),
  authors: [{ name: "Miral Hasan", url: siteConfig.githubUrl }],
  openGraph: {
    title: "Miral Hasan — AI Systems Engineer",
    description: "Building production-grade AI systems that operate in real-world environments.",
    type: "website",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: "Miral Hasan — AI Systems Engineer" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${grotesk.variable}`}>
      <body className="noise">
        <CustomCursor />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
