"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { generateOrganizationSchema } from "@/lib/structured-data";
import dynamic from "next/dynamic";
import React from "react";

// Lazy load Chart.js components to reduce initial bundle size
const Radar = dynamic(
  () => import("react-chartjs-2").then((mod) => mod.Radar),
  {
    loading: () => (
      <div className="h-96 flex items-center justify-center text-muted-foreground">
        Loading chart...
      </div>
    ),
    ssr: false,
  }
);

// Dynamically import Chart.js components
const loadChartJS = async () => {
  const {
    Chart,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
  } = await import("chart.js");
  Chart.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
  );
  return Chart;
};

const currentExperience = () => {
  const startDate = new Date("2019-02-01");
  const currentDate = new Date();
  const diffTime = Math.abs(currentDate.getTime() - startDate.getTime());
  const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);
  return diffYears.toFixed(1);
};

// Generate structured data for the about section
const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Atiq Israk",
  jobTitle: "Product Manager & AI Specialist",
  description:
    "Experienced Product Manager with over 6 years specializing in AI-driven solutions, digital transformation, and enterprise software. Leading innovative projects across healthcare, e-commerce, and SaaS platforms.",
  url: "https://atiqisrak.vercel.app",
  image: "https://atiqisrak.vercel.app/avatar.webp",
  sameAs: [
    "https://github.com/atiqisrak",
    "https://linkedin.com/in/atiq-israk",
    "https://twitter.com/atiqisrak",
  ],
  worksFor: {
    "@type": "Organization",
    name: "Ether Technologies",
    url: "https://ethertech.ltd",
  },
  hasOccupation: {
    "@type": "Occupation",
    name: "Product Manager",
    description:
      "Leading product strategy, user journey optimization, and go-to-market execution for enterprise software solutions",
  },
  knowsAbout: [
    "Product Management",
    "AI/ML",
    "Digital Transformation",
    "Enterprise Software",
    "Healthcare Technology",
    "E-commerce",
    "SaaS Platforms",
    "React",
    "Next.js",
    "TypeScript",
    "Machine Learning",
  ],
  alumniOf: [
    {
      "@type": "Organization",
      name: "TechCare Inc.",
    },
    {
      "@type": "Organization",
      name: "Navana Group",
    },
  ],
};

export default function About() {
  const resumeLink =
    process.env.NEXT_PUBLIC_RESUME_LINK || "/AtiqIsrak_Resume.pdf";

  // Initialize Chart.js when component mounts
  React.useEffect(() => {
    loadChartJS();
  }, []);

  const skillsData = {
    labels: [
      "Frontend Development",
      "Backend Development",
      "DevOps & Infrastructure",
      "Database Management",
      "UI/UX Design",
      "Problem Solving",
    ],
    datasets: [
      {
        label: "Technical Skills Proficiency",
        data: [90, 85, 75, 80, 85, 90],
        backgroundColor: "rgba(66, 133, 244, 0.2)",
        borderColor: "rgba(66, 133, 244, 1)",
        borderWidth: 2,
        pointBackgroundColor: "rgba(66, 133, 244, 1)",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
        pointRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        borderColor: "rgba(66, 133, 244, 1)",
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
      },
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        min: 0,
        ticks: {
          stepSize: 20,
          color: "rgba(156, 163, 175, 0.8)",
          font: {
            size: 11,
            weight: "normal" as const,
          },
          callback: function (value: any) {
            return value + "%";
          },
        },
        grid: {
          color: "rgba(156, 163, 175, 0.2)",
          lineWidth: 1,
        },
        angleLines: {
          color: "rgba(156, 163, 175, 0.2)",
        },
        pointLabels: {
          font: {
            size: 12,
            weight: "bold" as const,
          },
          color: "rgba(75, 85, 99, 0.9)",
          padding: 8,
        },
      },
    },
    elements: {
      line: {
        tension: 0.2,
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateOrganizationSchema()),
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-6 md:py-12"
      >
        <section
          id="about"
          className="scroll-mt-16"
          aria-labelledby="about-heading"
          role="region"
        >
          <div className="sticky top-0 z-20 -mx-6 mb-6 w-screen bg-background/80 px-6 py-4 backdrop-blur-sm md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
            <h2
              id="about-heading"
              className="text-lg font-bold uppercase tracking-widest text-foreground lg:sr-only"
            >
              About Me
            </h2>
          </div>
          <div className="flex flex-col gap-6 lg:px-6">
            <article className="prose prose-lg max-w-none dark:prose-invert">
              <p className="text-lg leading-relaxed text-muted-foreground">
                As a forward-thinking <strong>Product Manager</strong> with{" "}
                <span className="font-semibold text-primary">
                  over {currentExperience()} years of experience
                </span>
                , I specialize in translating customer needs into profitable,
                user-centric solutions. My journey in tech began as a developer,
                which gives me a unique technical perspective in product
                management, allowing me to effectively bridge business goals
                with technical implementation.
              </p>
            </article>

            <article className="prose prose-lg max-w-none dark:prose-invert">
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Current Role & Achievements
              </h3>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Currently, I serve as the{" "}
                <strong>Product Manager at Ether Technologies</strong>, where I
                develop product vision and strategy, focusing on user journey
                optimization and go-to-market execution. I&apos;ve successfully
                launched and managed{" "}
                <Link
                  className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary hover:bg-primary/20 font-semibold transition-colors duration-200 rounded-md"
                  href="https://mave.ethertech.ltd"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="MAVE CMS - MACH architecture based Headless CMS (opens in new tab)"
                >
                  MAVE CMS
                </Link>{" "}
                - a MACH architecture based Headless CMS,{" "}
                <Link
                  className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary hover:bg-primary/20 font-semibold transition-colors duration-200 rounded-md"
                  href="https://sumo.ethertech.ltd"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="SUMO - Restaurant inventory tracking and management system (opens in new tab)"
                >
                  SUMO
                </Link>{" "}
                - a restaurant inventory tracking and management system, and{" "}
                <Link
                  className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary hover:bg-primary/20 font-semibold transition-colors duration-200 rounded-md"
                  href="https://assetiq.ethertech.ltd"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="AssetIQ - Asset management platform (opens in new tab)"
                >
                  AssetIQ
                </Link>
                , achieving a{" "}
                <strong className="text-green-600 dark:text-green-400">
                  20% reduction in operational overhead
                </strong>{" "}
                through strategic cost controls and efficient resource
                management.
              </p>
            </article>

            <article className="prose prose-lg max-w-none dark:prose-invert">
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Previous Experience & Impact
              </h3>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Previously at <strong>Navana Group</strong> as Technical Project
                Manager, I oversaw AI-driven chatbot projects and digital
                transformation initiatives. At{" "}
                <Link
                  className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary hover:bg-primary/20 font-semibold transition-colors duration-200 rounded-md"
                  href="https://gloriajeanscoffeesbd.com/menu"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Gloria Jean's Coffees Bangladesh website (opens in new tab)"
                >
                  Gloria Jean&apos;s Coffees Bangladesh
                </Link>{" "}
                , I led the implementation of key e-commerce optimizations that
                boosted sales by{" "}
                <strong className="text-green-600 dark:text-green-400">
                  27%
                </strong>
                . I also conceptualized <strong>NAVBOT</strong>, an AI CRM
                Chatbot that revolutionized customer service automation for
                restaurants and vehicle servicing.
              </p>
            </article>

            <article className="prose prose-lg max-w-none dark:prose-invert">
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Technical Foundation & Philosophy
              </h3>
              <p className="text-lg leading-relaxed text-muted-foreground">
                My background in software development at{" "}
                <strong>TechCare Inc.</strong>, where I developed over{" "}
                <strong>120 web templates</strong> with{" "}
                <strong className="text-blue-600 dark:text-blue-400">
                  863,000+ global downloads
                </strong>
                , provides me with deep technical insights that enhance my
                product management approach. I&apos;m passionate about balancing
                revenue vs. cost, defining user journeys, and managing complex
                roadmaps to deliver high-impact digital products while mentoring
                cross-functional teams.
              </p>
            </article>
          </div>
        </section>

        {/* Skills Radar Chart Section */}
        <section
          className="mt-16"
          aria-labelledby="skills-heading"
          role="region"
        >
          <div className="max-w-2xl mx-auto">
            <div className="bg-card/50 backdrop-blur-sm p-8 rounded-2xl border border-muted/50 shadow-lg">
              <h3
                id="skills-heading"
                className="text-3xl font-bold mb-8 text-center text-foreground"
              >
                Technical Skills Overview
              </h3>
              <div
                className="relative h-96 w-full"
                role="img"
                aria-label="Radar chart showing technical skills proficiency levels"
              >
                <Radar data={skillsData} options={chartOptions} />
              </div>
              <p className="text-sm text-muted-foreground text-center mt-4">
                Skills proficiency measured on a scale of 0-100%
              </p>
            </div>
          </div>
        </section>

        {/* Download Resume Section */}
        <section
          className="mt-12"
          aria-labelledby="resume-heading"
          role="region"
        >
          <div className="text-center">
            <h3
              id="resume-heading"
              className="text-xl font-semibold text-foreground mb-6"
            >
              Download My Resume
            </h3>
            <Link
              href={resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold"
              aria-label="Download Atiq Israk's resume (opens in new tab)"
            >
              <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Download Resume
            </Link>
            <p className="text-sm text-muted-foreground mt-4">
              PDF format • Updated regularly
            </p>
          </div>
        </section>
      </motion.div>
    </>
  );
}
