import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/lib/site";

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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className="noise">
        {children}
      </body>
    </html>
  );
}
