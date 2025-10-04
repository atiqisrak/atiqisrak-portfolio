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
      "Leading product vision and strategy, focusing on user journey optimization and go-to-market execution. Achieved 20% increase in new user acquisition and 30% improvement in team productivity through Lean Product Development and Agile methods. Launched and managed enterprise SaaS products while maintaining high engineering quality.",
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
      "Oversaw AI-driven chatbot projects and digital transformation initiatives, unifying cross-departmental collaboration. Delivered $20K+ in annual cost savings through optimized containerized deployments and AWS best practices. Strengthened product vision by working with senior management on business strategies.",
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
      "Developed and productized 120+ web templates using React/NextJS, amassing 863,000+ global downloads and over 430,000 purchases. Leveraged Lottiefiles & GSAP to create interactive experiences, increasing template conversion rates by 27% and scaling user base by 170%.",
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
          const [ref, inView] = useInView({
            triggerOnce: true,
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px",
          });

          return (
            <motion.article
              key={index}
              ref={ref}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-card rounded-lg p-6 hover:shadow-lg transition-all border border-muted hover:border-primary"
              role="listitem"
              aria-labelledby={`job-title-${index}`}
              itemScope
              itemType="https://schema.org/JobPosting"
            >
              <div className="flex flex-col gap-4">
                <header className="flex justify-between items-start">
                  <div>
                    <h3
                      id={`job-title-${index}`}
                      className="text-xl font-bold"
                      itemProp="title"
                    >
                      {job.currentPosition}
                    </h3>
                    <p className="text-primary" itemProp="hiringOrganization">
                      <span itemProp="name">{job.place}</span>
                    </p>
                  </div>
                  <time
                    className="text-sm text-muted-foreground"
                    dateTime={job.timeline}
                    itemProp="datePosted"
                    aria-label={`Employment period: ${job.timeline}`}
                  >
                    {job.timeline}
                  </time>
                </header>

                <p className="text-muted-foreground" itemProp="description">
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
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.article>
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

export default ExpCards;
