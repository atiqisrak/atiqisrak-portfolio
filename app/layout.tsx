import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";
import PerformanceMonitor from "@/components/PerformanceMonitor";
import WebVitalsTracker from "@/components/WebVitalsTracker";
import { ActiveSectionProvider } from "@/contexts/ActiveSectionContext";
import FloatingActionContainer from "@/components/FloatingActionContainer";
import { generateOrganizationSchema } from "@/lib/structured-data";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://atiqisrak.vercel.app"),
  alternates: {
    canonical: "https://atiqisrak.vercel.app",
  },
  title: {
    default: "Atiq Israk - Product Manager & AI Specialist",
    template: "%s | Atiq Israk",
  },
  description:
    "Experienced Product Manager specializing in AI-driven solutions, digital transformation, and enterprise software. Leading innovative projects across healthcare, e-commerce, and SaaS platforms.",
  keywords: [
    "Atiq Israk",
    "Product Manager",
    "AI Specialist",
    "Digital Transformation",
    "Enterprise Software",
    "Healthcare Technology",
    "E-commerce",
    "SaaS",
    "Machine Learning",
    "Product Strategy",
    "User Experience",
    "Software Engineering",
    "React",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: "Atiq Israk" }],
  creator: "Atiq Israk",
  publisher: "Atiq Israk",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    locale: "en_US",
    siteName: "Atiq Israk Portfolio",
    type: "website",
    title: "Atiq Israk - Product Manager & AI Specialist",
    description:
      "Experienced Product Manager specializing in AI-driven solutions, digital transformation, and enterprise software.",
    url: "https://atiqisrak.vercel.app",
    images: [
      {
        url: "/og-large-meik.webp",
        width: 1200,
        height: 630,
        alt: "Atiq Israk - Product Manager & AI Specialist",
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Atiq Israk - Product Manager & AI Specialist",
    description:
      "Experienced Product Manager specializing in AI-driven solutions, digital transformation, and enterprise software.",
    creator: "@atiqisrak",
    site: "@atiqisrak",
    images: ["/og-large-meik.webp"],
  },
  verification: {
    google: "your-google-verification-code",
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
        {/* Preload critical resources */}
        <link rel="preload" href="/og-large-meik.webp" as="image" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Atiq Israk",
              jobTitle: "Product Manager & AI Specialist",
              description:
                "Experienced Product Manager specializing in AI-driven solutions, digital transformation, and enterprise software.",
              url: "https://atiqisrak.vercel.app",
              image: "https://atiqisrak.vercel.app/avatar.webp",
              sameAs: [
                "https://github.com/atiqisrak",
                "https://linkedin.com/in/atiq-israk",
                "https://twitter.com/atiqisrak",
              ],
              knowsAbout: [
                "Product Management",
                "Artificial Intelligence",
                "Digital Transformation",
                "Enterprise Software",
                "Healthcare Technology",
                "E-commerce",
                "SaaS",
                "Machine Learning",
                "Product Strategy",
                "User Experience",
                "Software Engineering",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateOrganizationSchema()),
          }}
        />
      </head>
      <body className={`${inter.className} ${inter.variable}`}>
        <ActiveSectionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Analytics />
            <ServiceWorkerRegistration />
            <PerformanceMonitor />
            <WebVitalsTracker />
            <FloatingActionContainer />
          </ThemeProvider>
        </ActiveSectionProvider>
      </body>
    </html>
  );
}
