"use client";

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { motion } from "framer-motion";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const currentExperience = () => {
  const startDate = new Date("2019-02-01");
  const currentDate = new Date();
  const diffTime = Math.abs(currentDate.getTime() - startDate.getTime());
  const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);
  return diffYears.toFixed(1);
};

export default function About() {
  const skillsData = {
    labels: [
      "Frontend",
      "Backend",
      "DevOps",
      "Database",
      "UI/UX",
      "Problem Solving",
    ],
    datasets: [
      {
        label: "Skills",
        data: [90, 85, 75, 80, 85, 90],
        backgroundColor: "rgba(66, 133, 244, 0.2)",
        borderColor: "rgba(66, 133, 244, 1)",
        borderWidth: 2,
      },
    ],
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-12"
    >
      <section id="about" className="scroll-mt-16 ">
        <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-background/0 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
          <h2 className="text-sm font-bold uppercase tracking-widest lg:sr-only">
            About
          </h2>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-start text-muted-foreground lg:px-6">
            As a forward-thinking Product Manager with
            <span className="pl-2 font-bold">
              over {currentExperience()} years of experience
            </span>{" "}
            , I specialize in translating customer needs into profitable,
            user-centric solutions. My journey in tech began as a developer,
            which gives me a unique technical perspective in product management,
            allowing me to effectively bridge business goals with technical
            implementation.
          </p>
          <p className="text-start text-muted-foreground lg:px-6">
            Currently, I serve as the Product Manager at Webable Digital, where
            I develop product vision and strategy, focusing on user journey
            optimization and go-to-market execution. I&apos;ve successfully
            launched and managed{" "}
            <a
              className="no-wrap text-primary dark:text-white"
              href="https://mave.ethertech.ltd"
              target="blank"
              rel="noopener noreferrer"
            >
              MAVE CMS
            </a>{" "}
            , a MACH architecture based Headless CMS, and{" "}
            <a
              className="no-wrap text-primary dark:text-white"
              href="https://mave-lms.ethertech.ltd"
              target="blank"
              rel="noopener noreferrer"
            >
              MAVE LMS
            </a>
            , achieving a 20% reduction in operational overhead through
            strategic cost controls and efficient resource management.
          </p>
          <p className="text-start text-muted-foreground lg:px-6">
            Previously at Navana Group as Technical Project Manager, I oversaw
            AI-driven chatbot projects and digital transformation initiatives.
            At{" "}
            <a
              className="no-wrap text-primary dark:text-white"
              href="https://gloriajeanscoffeesbd.com/menu"
              target="blank"
              rel="noopener noreferrer"
            >
              Gloria Jean&apos;s Coffees Bangladesh
            </a>{" "}
            , I led the implementation of key e-commerce optimizations that
            boosted sales by 27%. I also conceptualized NAVBOT, an AI CRM
            Chatbot that revolutionized customer service automation for
            restaurants and vehicle servicing.
          </p>
          <p className="text-start text-muted-foreground lg:px-6">
            My background in software development at TechCare Inc., where I
            developed over 120 web templates with 863,000+ global downloads,
            provides me with deep technical insights that enhance my product
            management approach. I&apos;m passionate about balancing revenue vs.
            cost, defining user journeys, and managing complex roadmaps to
            deliver high-impact digital products while mentoring
            cross-functional teams.
          </p>
        </div>
      </section>

      {/* Add Skills Radar Chart */}
      <div className="mt-12 max-w-md mx-auto bg-card p-6 rounded-lg border border-muted">
        <h3 className="text-2xl font-bold mb-6 text-center">Skills Overview</h3>
        <Radar
          data={skillsData}
          options={{
            scales: {
              r: {
                beginAtZero: true,
                max: 100,
                ticks: {
                  stepSize: 20,
                },
                grid: {
                  color: "rgba(255, 255, 255, 0.1)",
                },
                pointLabels: {
                  font: {
                    size: 12,
                  },
                },
              },
            },
            plugins: {
              legend: {
                display: false,
              },
            },
          }}
        />
      </div>

      {/* Add downloadable CV button */}
      <div className="mt-8 text-center">
        <a
          href="https://drive.google.com/file/d/1k9u8kSZBKRf637oK06XbSLjdqR8oc4bJ/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Download Resume
        </a>
      </div>
    </motion.div>
  );
}
