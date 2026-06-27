import type { Metadata, Viewport } from "next";
import { Josefin_Sans, Playfair_Display } from "next/font/google";
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
import { personSchema, seo } from "@/lib/content/portfolio";

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
  variable: "--font-josefin",
  weight: ["300", "400", "500", "600", "700"],
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://atiqisrak.vercel.app"),
  alternates: {
    canonical: "https://atiqisrak.vercel.app",
  },
  title: {
    default: seo.title,
    template: "%s | Atiq Israk",
  },
  description: seo.description,
  keywords: [
    "Atiq Israk",
    "Product Manager",
    "AI Builder",
    "Product Leader",
    "Digital Transformation",
    "Enterprise Software",
    "Growth Operator",
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
    title: seo.ogTitle,
    description: seo.description,
    url: "https://atiqisrak.vercel.app",
    images: [
      {
        url: "/og-large-meik.webp",
        width: 1200,
        height: 630,
        alt: seo.title,
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.ogTitle,
    description: seo.description,
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
    <html
      lang="en"
      className={`scroll-smooth ${josefinSans.variable} ${playfairDisplay.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Preload critical resources */}
        <link rel="preload" href="/og-large-meik.webp" as="image" />

        {/* favicon */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
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
            __html: JSON.stringify(personSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateOrganizationSchema()),
          }}
        />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <ActiveSectionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
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
