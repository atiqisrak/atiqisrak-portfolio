import { Header } from "@/components/layout/Header";
import LazySection from "@/components/LazySection";
import { Hero } from "@/components/sections/hero";
import { personSchema, seo } from "@/lib/content/portfolio";
import { Metadata } from "next";
import dynamic from "next/dynamic";

const Approach = dynamic(
  () => import("@/components/sections/approach").then((m) => m.Approach),
  { loading: () => <SectionSkeleton /> }
);

const ImpactStats = dynamic(
  () => import("@/components/sections/impact").then((m) => m.ImpactStats),
  { loading: () => <SectionSkeleton /> }
);

const Experience = dynamic(
  () => import("@/components/sections/experience").then((m) => m.Experience),
  { loading: () => <SectionSkeleton height="h-64" /> }
);

const Projects = dynamic(
  () => import("@/components/sections/projects").then((m) => m.Projects),
  { loading: () => <SectionSkeleton height="h-96" /> }
);

const CaseStudies = dynamic(
  () => import("@/components/sections/case-studies").then((m) => m.CaseStudies),
  { loading: () => <SectionSkeleton /> }
);

const Funding = dynamic(
  () => import("@/components/sections/funding").then((m) => m.Funding),
  { loading: () => <SectionSkeleton /> }
);

const Testimonials = dynamic(
  () => import("@/components/sections/testimonials").then((m) => m.Testimonials),
  { loading: () => <SectionSkeleton height="h-64" /> }
);

const FAQ = dynamic(
  () => import("@/components/sections/faq").then((m) => m.FAQ),
  { loading: () => <SectionSkeleton /> }
);

const Contact = dynamic(
  () => import("@/components/sections/contact").then((m) => m.Contact),
  { loading: () => <SectionSkeleton /> }
);

const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => <div className="animate-pulse bg-muted h-16 rounded-lg" />,
  ssr: false,
});

function SectionSkeleton({ height = "h-48" }: { height?: string }) {
  return <div className={`animate-pulse rounded-lg bg-muted ${height}`} />;
}

export const metadata: Metadata = {
  title: seo.title,
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
    type: "website",
    locale: "en_US",
    url: "https://atiqisrak.vercel.app",
    siteName: "Atiq Israk Portfolio",
    title: seo.ogTitle,
    description: seo.description,
    images: [
      {
        url: "https://atiqisrak.vercel.app/og-large-meik.webp",
        width: 1200,
        height: 630,
        alt: seo.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.ogTitle,
    description: seo.description,
    images: ["https://atiqisrak.vercel.app/og-large-meik.webp"],
    creator: "@atiqisrak",
  },
  alternates: {
    canonical: "https://atiqisrak.vercel.app",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Header />
      <main>
        <Hero />
        <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 lg:py-16">
          <div className="flex flex-col gap-16 lg:gap-24">
            <LazySection>
              <Approach />
            </LazySection>
            <LazySection>
              <ImpactStats />
            </LazySection>
            <LazySection>
              <Experience />
            </LazySection>
            <LazySection>
              <Projects />
            </LazySection>
            <LazySection>
              <CaseStudies />
            </LazySection>
            <LazySection>
              <Funding />
            </LazySection>
            <LazySection>
              <Testimonials />
            </LazySection>
            <LazySection>
              <FAQ />
            </LazySection>
            <LazySection>
              <Contact />
            </LazySection>
          </div>
        </div>
      </main>
      <LazySection>
        <Footer />
      </LazySection>
    </>
  );
}
