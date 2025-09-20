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
    currentPosition: "Technical Project Manager, Product & Engineering",
    place: "Navana Group",
    previousPositions: [""],
    description:
      "Oversaw AI-driven chatbot projects and digital transformation initiatives, unifying cross-departmental collaboration. Delivered $20K+ in annual cost savings through optimized containerized deployments and AWS best practices. Strengthened product vision by working with senior management on business strategies.",
    skills: [
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
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="experience" className="scroll-mt-16 lg:mt-16">
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-background/0 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest lg:sr-only">
          Experience
        </h2>
      </div>
      <div className="space-y-6">
        {jobPositions.map((job, index) => (
          <motion.div
            key={index}
            ref={ref}
            variants={cardVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="bg-card rounded-lg p-6 hover:shadow-lg transition-all border border-muted hover:border-primary"
          >
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold">{job.currentPosition}</h3>
                  <p className="text-primary">{job.place}</p>
                </div>
                <span className="text-sm text-muted-foreground">
                  {job.timeline}
                </span>
              </div>

              <p className="text-muted-foreground">{job.description}</p>

              {job.previousPositions && job.previousPositions.length > 0 && (
                <div className="space-y-2">
                  <p className="font-medium">Previous Roles:</p>
                  {job.previousPositions.map((position, idx) => (
                    <p key={idx} className="text-sm text-muted-foreground">
                      {position}
                    </p>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, idx) => (
                  <Badge key={idx} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12">
        <a
          className="inline-flex items-center font-medium leading-tight text-foreground group"
          href="https://drive.google.com/file/d/13h7J03vULHZds3JOza6DOkFJN59OhkPR/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="border-b border-transparent pb-px transition hover:border-primary motion-reduce:transition-none">
            View Full Resume
          </span>
          <MoveRight className="ml-1 inline-block h-5 w-5 shrink-0 -translate-y-px transition-transform group-hover:translate-x-2 group-focus-visible:translate-x-2 motion-reduce:transition-none" />
        </a>
      </div>
    </section>
  );
};

export default ExpCards;
