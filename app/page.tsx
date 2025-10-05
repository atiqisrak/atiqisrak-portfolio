import Nav from "@/components/Nav";
import LazySection from "@/components/LazySection";
import { Metadata } from "next";
import dynamic from "next/dynamic";

// Dynamic imports for all components to reduce initial bundle size
const ExpCard = dynamic(() => import("@/components/ExpCards"), {
  loading: () => <div className="animate-pulse bg-muted h-64 rounded-lg" />,
  ssr: false,
});

const About = dynamic(() => import("@/components/About"), {
  loading: () => <div className="animate-pulse bg-muted h-96 rounded-lg" />,
  ssr: false,
});

const Contact = dynamic(() => import("@/components/Contact"), {
  loading: () => <div className="animate-pulse bg-muted h-32 rounded-lg" />,
  ssr: false,
});

const Footer = dynamic(() => import("@/components/Footer"), {
  loading: () => <div className="animate-pulse bg-muted h-16 rounded-lg" />,
  ssr: false,
});

const HomeClient = dynamic(() => import("@/components/HomeClient"), {
  ssr: false,
});

const Projects = dynamic(() => import("@/components/Projects"), {
  loading: () => <div className="animate-pulse bg-muted h-96 rounded-lg" />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "Atiq Israk - Product Manager & AI Specialist",
  description:
    "Experienced Product Manager specializing in AI-driven solutions, digital transformation, and enterprise software. Leading innovative projects across healthcare, e-commerce, and SaaS platforms.",
  keywords: [
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
    title: "Atiq Israk - Product Manager & AI Specialist",
    description:
      "Experienced Product Manager specializing in AI-driven solutions, digital transformation, and enterprise software.",
    images: [
      {
        url: "https://atiqisrak.vercel.app/og-large-meik.webp",
        width: 1200,
        height: 630,
        alt: "Atiq Israk - Product Manager & AI Specialist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Atiq Israk - Product Manager & AI Specialist",
    description:
      "Experienced Product Manager specializing in AI-driven solutions, digital transformation, and enterprise software.",
    images: ["https://atiqisrak.vercel.app/og-large-meik.webp"],
    creator: "@atiqisrak",
  },
  alternates: {
    canonical: "https://atiqisrak.vercel.app",
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Atiq Israk",
    jobTitle: "Product Manager & AI Specialist",
    description:
      "Experienced Product Manager specializing in AI-driven solutions, digital transformation, and enterprise software.",
    url: "https://atiqisrak.vercel.app",
    image: "https://atiqisrak.vercel.app/og-large-meik.webp",
    sameAs: [
      "https://linkedin.com/in/atiq-israk",
      "https://github.com/atiqisrak",
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
    ],
    hasOccupation: {
      "@type": "Occupation",
      name: "Product Manager",
      description:
        "Leading innovative projects across healthcare, e-commerce, and SaaS platforms",
    },
    alumniOf: {
      "@type": "Organization",
      name: "Various Technology Companies",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="relative min-h-screen bg-background">
        <HomeClient />
        <div className="mx-auto max-w-7xl px-4 py-4 md:px-6 md:py-8 lg:px-8 lg:py-12 xl:px-12 lg:pt-0 xl:pt-0">
          <div className="lg:flex lg:justify-between lg:gap-4 xl:gap-6">
            <div className="lg:w-1/2 lg:fixed lg:top-0 lg:h-auto lg:pr-2 xl:pr-4 lg:pt-0">
              <Nav />
            </div>
            <main className="lg:w-1/2 lg:ml-[50%] flex flex-col pt-2 lg:pt-16 gap-2 lg:gap-4">
              <LazySection>
                <About />
              </LazySection>
              <LazySection>
                <ExpCard />
              </LazySection>
              <LazySection>
                <Projects />
              </LazySection>
              <LazySection>
                <Contact />
              </LazySection>
              <LazySection>
                <Footer />
              </LazySection>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
