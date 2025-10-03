import BlogNav from "@/components/BlogNav";
import Footer from "@/components/Footer";
import ProductHunterClient from "@/components/ProductHunterClient";
import {
  ProductHunterHero,
  ProductHunterServices,
  ProductHunterProcess,
  ProductHunterWhyFree,
  ProductHunterCTA,
} from "@/components/ProductHunter";
import { Metadata } from "next";
import {
  generateFAQSchema,
  generateOrganizationSchema,
} from "@/lib/structured-data";

export const metadata: Metadata = {
  title:
    "Free Product Hunt Launch Services | Professional Review & Promotion - Atiq Israk",
  description:
    "Get your product noticed on Product Hunt for free! Professional review, engagement, voting, and promotion services to help your product launch succeed. No cost, no strings attached.",
  keywords: [
    "Product Hunt",
    "Product Launch",
    "Startup Marketing",
    "Product Review",
    "Launch Strategy",
    "Free Services",
    "Product Promotion",
    "Startup Support",
    "Product Hunt Hunter",
    "Launch Day Support",
    "Product Marketing",
    "Startup Launch",
    "Product Discovery",
    "Launch Optimization",
    "Community Building",
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
    url: "https://atiqisrak.vercel.app/producthunter",
    siteName: "Atiq Israk Portfolio",
    title:
      "Free Product Hunt Launch Services | Professional Review & Promotion",
    description:
      "Get your product noticed on Product Hunt for free! Professional review, engagement, voting, and promotion services to help your product launch succeed.",
    images: [
      {
        url: "https://atiqisrak.vercel.app/og-large-meik.webp",
        width: 1200,
        height: 630,
        alt: "Free Product Hunt Launch Services - Professional Review & Promotion by Atiq Israk",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Free Product Hunt Launch Services | Professional Review & Promotion",
    description:
      "Get your product noticed on Product Hunt for free! Professional review, engagement, voting, and promotion services to help your product launch succeed.",
    images: ["https://atiqisrak.vercel.app/og-large-meik.webp"],
    creator: "@atiqisrak",
  },
  alternates: {
    canonical: "https://atiqisrak.vercel.app/producthunter",
  },
  category: "Business",
};

export default function ProductHunter() {
  // FAQ data for structured data
  const faqs = [
    {
      question: "What services do you offer for Product Hunt launches?",
      answer:
        "We offer comprehensive product review, launch strategy optimization, community engagement, social media promotion, influencer outreach, and post-launch growth strategies - all completely free.",
    },
    {
      question: "How much does your Product Hunt service cost?",
      answer:
        "All our Product Hunt services are completely free. We provide professional review, engagement, and promotion services at no cost to help your product launch succeed.",
    },
    {
      question: "What's included in your free consultation?",
      answer:
        "Our free consultation includes product analysis, launch strategy optimization, market positioning advice, competitive analysis, and personalized recommendations for your Product Hunt launch.",
    },
    {
      question: "How long does it take to see results?",
      answer:
        "We provide fast turnaround times with quick response and rapid implementation. Most clients see improved engagement and visibility within the first week of our collaboration.",
    },
    {
      question: "Do you work with all types of products?",
      answer:
        "Yes, we work with a wide range of products including SaaS applications, mobile apps, web tools, hardware products, and innovative solutions across various industries.",
    },
  ];

  // Generate structured data
  const faqSchema = generateFAQSchema(faqs);
  const organizationSchema = generateOrganizationSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <BlogNav />
      <div className="min-h-screen bg-background">
        <ProductHunterClient />
        <main className="relative">
          <ProductHunterHero />
          <ProductHunterServices />
          <ProductHunterProcess />
          <ProductHunterWhyFree />
          <ProductHunterCTA />
        </main>
        <Footer />
      </div>
    </>
  );
}
