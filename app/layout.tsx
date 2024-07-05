import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://atiqisrak.me"),
  alternates: {
    canonical: "https://atiqisrak.me",
  },
  title: "Atiq Israk",
  description:
    "Atiq Israk is a Front-End Software Engineer, founder, and Quality nerd.",
  keywords:
    "Atiq Israk, Front-end Engineer, Project Leader, Web Development, Web3, Decentralized Applications, Quality Assurance, Software Engineering, Blockchain, Cryptography",
  openGraph: {
    locale: "en_US",
    siteName: "Atiq Israk",
    type: "website",
    title: "Atiq Israk",
    description:
      "Atiq Israk is a Front-End Software Engineer, founder, and Quality nerd.",
    url: "https://atiqisrak.me",
    images: [
      {
        url: "./og-large-meik.jpg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Atiq Israk",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* favicon */}
        <link rel="icon" href="/favicon.ico" />
        </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
