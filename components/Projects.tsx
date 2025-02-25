"use client";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MoveUpRight } from "lucide-react";

const jobProjects = [
  {
    imagePath: "/mave-cms.png",
    title: "MAVE CMS - Enterprise SaaS Platform",
    description:
      "Led the product strategy and development of MAVE CMS, an enterprise-grade headless CMS utilizing MACH architecture. Spearheaded stakeholder negotiations, defined product roadmap, and implemented data-driven feature prioritization. Successfully shortened deployment cycles by 30% while maintaining high engineering quality and achieving a 20% reduction in operational costs.",
    skills: [
      "Product Strategy",
      "MACH Architecture",
      "Go-to-Market",
      "Stakeholder Management",
      "Technical Product Management",
      "Analytics",
    ],
    link: "https://mave.ethertech.ltd",
  },
  {
    imagePath: "/mave-lms.png",
    title: "MAVE LMS - AI-Driven Learning Platform",
    description:
      "Defined and executed the product vision for an innovative learning management system. Implemented analytics dashboards and AI-driven features that increased course completion rates by 40% and reduced dropout rates by 25%. Led cross-functional teams in developing flexible subscription models and content modularity.",
    skills: [
      "Product Analytics",
      "AI Strategy",
      "User Journey Optimization",
      "Revenue Modeling",
      "Feature Prioritization",
      "UX Research",
    ],
    link: "https://mave-lms.ethertech.ltd",
  },
  {
    imagePath: "/aranya-ecommerce.png",
    title: "Aranya - E-Commerce Transformation",
    description:
      "Led end-to-end product discovery and user journey optimization for Aranya's e-commerce platform. Collaborated with UI/UX teams to identify and eliminate friction points, resulting in a 35% improvement in load times and 20% increase in conversion rates through strategic phased rollout.",
    skills: [
      "E-commerce Strategy",
      "User Journey Mapping",
      "Conversion Optimization",
      "A/B Testing",
      "Performance Analytics",
      "UX Design",
    ],
    link: "https://www.aranya.com.bd/",
  },
  {
    imagePath: "/uhl-hms.png",
    title: "UHL - Healthcare Digital Transformation",
    description:
      "Guided product requirements and digital transformation strategy for UHL's hospital management system. Streamlined patient pathways from appointment scheduling to report access, resulting in 40% operational efficiency improvement. Led user acceptance testing with medical staff to optimize service delivery.",
    skills: [
      "Healthcare Tech",
      "Digital Transformation",
      "User Acceptance Testing",
      "Process Optimization",
      "Stakeholder Management",
      "Service Design",
    ],
    link: "https://www.uhlbd.com/",
  },
  {
    imagePath: "/navbot-ai.png",
    title: "NAVBOT - AI-Powered CRM Solution",
    description:
      "Conceptualized and led the development of an innovative AI-powered CRM chatbot for the restaurant and automotive industries. Defined the product roadmap, focusing on automated workflows and intelligent customer interaction. Achieved significant improvements in response times and customer satisfaction metrics.",
    skills: [
      "AI Product Strategy",
      "CRM Solutions",
      "Workflow Automation",
      "Customer Experience",
      "Product Analytics",
      "Industry Solutions",
    ],
    link: "https://linkedin.com/in/atiq-israk",
  },
];


export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-16 lg:mt-16">
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-background/0 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest lg:sr-only">
          Projects
        </h2>
      </div>
      <>
        {jobProjects.map((project, index) => (
          <a
            key={index}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:cursor-pointer"
          >
            <Card className="group lg:p-6 mb-8 flex flex-col lg:flex-row w-full min-h-fit gap-0 lg:gap-5 border-transparent hover:border dark:lg:hover:border-t-blue-900 dark:lg:hover:bg-slate-800/50 lg:hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:hover:drop-shadow-lg lg:hover:bg-slate-100/50 lg:hover:border-t-blue-200">
              <CardHeader className="h-full w-full lg:w-1/3 mb-4 p-0">
                <Image
                  src={project.imagePath}
                  alt={`Screenshot of ${project.title}`}
                  width={1920}
                  height={1080}
                  priority
                  className="bg-[#141414] mt-2 border border-muted-foreground rounded-[0.5rem]"
                />
              </CardHeader>
              <CardContent className="flex flex-col p-0 w-full lg:w-2/3">
                <p className="text-primary font-bold">
                  {project.title}{" "}
                  <MoveUpRight className="ml-1 inline-block h-5 w-5 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 motion-reduce:transition-none" />
                </p>
                <CardDescription className="py-3 text-muted-foreground">
                  {project.description}
                </CardDescription>
                <CardFooter className="p-0 flex flex-wrap gap-2">
                  {project.skills.map((skill, index) => (
                    <Badge key={index}>{skill}</Badge>
                  ))}
                </CardFooter>
              </CardContent>
            </Card>
          </a>
        ))}
      </>
    </section>
  );
}
