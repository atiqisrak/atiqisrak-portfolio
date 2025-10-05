"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MoveRight } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";

const jobPositions = [
  {
    timeline: "June 2023 — Present",
    currentPosition: "Product Manager",
    place: "Ether Technologies",
    previousPositions: [""],
    description:
      "Leading product vision and strategy, focusing on user journey optimization and go-to-market execution. Launched and managed enterprise SaaS products while maintaining high engineering quality.",
    achievements: [
      { metric: "20%", label: "New User Acquisition" },
      { metric: "30%", label: "Team Productivity" },
      { metric: "30%", label: "Deployment Cycles" },
      { metric: "40%", label: "Course Completion" },
      { metric: "25%", label: "Dropout Reduction" },
      { metric: "35%", label: "Site Load Time" },
      { metric: "20%", label: "Conversion Rate" },
    ],
    skills: [
      "Product Strategy",
      "Go-to-Market Planning",
      "User Journey Optimization",
      "Revenue vs. Cost Analysis",
      "Agile/Lean Methods",
      "Cross-functional Leadership",
      "Product Analytics",
      "Technical Product Management",
      "SaaS",
      "MACH Architecture",
    ],
    recentProjects: [
      {
        title: "MAVE CMS (SaaS | API-First | MACH)",
        description:
          "Spearheaded strategic and technical blueprint for an enterprise-grade headless CMS. Negotiated requirements with stakeholders and integrated microservices architecture, shortening deployment cycles by 30%.",
        technologies: ["MACH Architecture", "GraphQL", "AWS"],
      },
      {
        title: "MAVE LMS (AI-Driven Learning Management)",
        description:
          "Defined product roadmap emphasizing data-driven feature prioritization. Deployed analytics dashboards to track learner engagement, raising course completion by 40% and reducing dropout by 25%.",
        technologies: ["AI/ML", "Analytics", "LMS"],
      },
      {
        title: "Aranya (E-Commerce Platform)",
        description:
          "Led product discovery and user journey mapping. Collaborated with UI/UX to reduce friction points, improving site load times by 35% and increasing conversions by 20% through phased rollout approach.",
        technologies: ["NextJS", "Redux", "UX Research"],
      },
    ],
  },
  {
    timeline: "Aug 2020 — Mar 2023",
    currentPosition: "Jr. Product Manager, Product & Engineering",
    place: "Navana Group",
    previousPositions: [""],
    description:
      "Oversaw AI-driven chatbot projects and digital transformation initiatives, unifying cross-departmental collaboration. Strengthened product vision by working with senior management on business strategies.",
    achievements: [
      { metric: "$20K+", label: "Annual Cost Savings" },
      { metric: "27%", label: "Sales Boost" },
      { metric: "170%", label: "Client Onboarding" },
    ],
    skills: [
      "Product Management",
      "Technical Project Management",
      "AI Implementation",
      "Digital Transformation",
      "Cost Optimization",
      "Stakeholder Management",
      "Business Strategy",
      "Cloud Architecture",
      "Process Automation",
    ],
    recentProjects: [
      {
        title: "Gloria Jean's Coffees Bangladesh (E-Commerce)",
        description:
          "Drove implementation of server load balancing and process automation, boosting sales by 27%. Redesigned user flow to reduce checkout friction and accelerate client onboarding by 170%.",
        technologies: [
          "Process Optimization",
          "UX Design",
          "Performance Tuning",
        ],
      },
      {
        title: "NAVBOT (AI CRM Chatbot)",
        description:
          "Conceptualized and rolled out an AI-powered CRM chatbot for restaurants and vehicle servicing. Automated reservation and service request workflows, significantly improving response times and user satisfaction.",
        technologies: ["AI/ML", "CRM", "Workflow Automation"],
      },
    ],
  },
  {
    timeline: "Feb 2019 — July 2020",
    currentPosition: "Frontend Web Developer",
    place: "TechCare Inc.",
    previousPositions: [""],
    description:
      "Developed and productized web templates using React/NextJS, creating interactive experiences with Lottiefiles & GSAP.",
    achievements: [
      { metric: "120+", label: "Web Templates" },
      { metric: "863K+", label: "Global Downloads" },
      { metric: "430K+", label: "Purchases" },
      { metric: "27%", label: "Conversion Rate" },
      { metric: "170%", label: "User Base Growth" },
    ],
    skills: [
      "Frontend Development",
      "React/NextJS",
      "UI/UX Design",
      "Performance Optimization",
      "Animation Development",
      "Product Development",
      "User Experience",
    ],
  },
];

const ExpCards = () => {
  const resumeLink =
    process.env.NEXT_PUBLIC_RESUME_LINK || "/AtiqIsrak_Resume.pdf";

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="experience"
      className="scroll-mt-16 lg:mt-16"
      aria-labelledby="experience-heading"
      role="region"
    >
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-background/0 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2
          id="experience-heading"
          className="text-sm font-bold uppercase tracking-widest lg:sr-only"
        >
          Experience
        </h2>
      </div>
      <div
        className="space-y-4"
        role="list"
        aria-label="Work experience timeline"
      >
        {jobPositions.map((job, index) => {
          return (
            <ExpCard
              key={index}
              job={job}
              index={index}
              cardVariants={cardVariants}
            />
          );
        })}
      </div>

      <footer className="mt-12">
        <Link
          href={resumeLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center font-medium leading-tight text-foreground group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
          aria-label="View full resume (opens in new tab)"
        >
          <span className="border-b border-transparent pb-px transition hover:border-primary motion-reduce:transition-none">
            View Full Resume
          </span>
          <MoveRight
            className="ml-1 inline-block h-5 w-5 shrink-0 -translate-y-px transition-transform group-hover:translate-x-2 group-focus-visible:translate-x-2 motion-reduce:transition-none"
            aria-hidden="true"
          />
        </Link>
      </footer>
    </section>
  );
};

interface JobPosition {
  timeline: string;
  currentPosition: string;
  place: string;
  previousPositions: string[];
  description: string;
  achievements: Array<{ metric: string; label: string }>;
  skills: string[];
  recentProjects?: Array<{
    title: string;
    description: string;
    technologies: string[];
  }>;
}

interface CardVariants {
  hidden: { opacity: number; y: number };
  visible: { opacity: number; y: number };
  [key: string]: { opacity: number; y: number };
}

const ExpCard = ({
  job,
  index,
  cardVariants,
}: {
  job: JobPosition;
  index: number;
  cardVariants: CardVariants;
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  });

  return (
    <motion.article
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-card rounded-xl p-4 hover:shadow-xl transition-all duration-300 border border-muted hover:border-primary/50 hover:shadow-primary/5"
      role="listitem"
      aria-labelledby={`job-title-${index}`}
      itemScope
      itemType="https://schema.org/JobPosting"
    >
      <div className="flex flex-col gap-4">
        <header className="flex justify-between items-start">
          <div className="space-y-1">
            <h3
              id={`job-title-${index}`}
              className="text-xl font-bold text-foreground"
              itemProp="title"
            >
              {job.currentPosition}
            </h3>
            <p
              className="text-base text-primary font-medium"
              itemProp="hiringOrganization"
            >
              <span itemProp="name">{job.place}</span>
            </p>
          </div>
          <time
            className="text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-full"
            dateTime={job.timeline}
            itemProp="datePosted"
            aria-label={`Employment period: ${job.timeline}`}
          >
            {job.timeline}
          </time>
        </header>

        {/* Key Achievements Section */}
        {job.achievements && job.achievements.length > 0 && (
          <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-3 border border-primary/20">
            <h4 className="text-xs font-semibold text-primary mb-2 uppercase tracking-wide">
              Key Achievements
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {job.achievements.map((achievement, idx) => (
                <div
                  key={idx}
                  className="text-center bg-background/50 rounded-lg p-2 border border-muted/50"
                >
                  <div className="text-lg font-bold text-primary">
                    {achievement.metric}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 leading-tight">
                    {achievement.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <p
          className="text-sm text-muted-foreground leading-relaxed"
          itemProp="description"
        >
          {job.description}
        </p>

        {job.previousPositions && job.previousPositions.length > 0 && (
          <div className="space-y-2">
            <ul role="list" aria-label="Previous positions">
              {job.previousPositions.map((position, idx) => (
                <li key={idx} className="text-sm text-muted-foreground">
                  {position}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div
          className="flex flex-wrap gap-2"
          role="list"
          aria-label="Skills and technologies"
        >
          {job.skills.map((skill, idx) => (
            <Badge
              key={idx}
              variant="secondary"
              role="listitem"
              aria-label={`Skill: ${skill}`}
              className="text-xs font-medium px-2 py-1"
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </motion.article>
  );
};

export default ExpCards;
