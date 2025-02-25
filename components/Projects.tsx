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
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from "next/link";

const jobProjects = [
  {
    imagePath: "/mave-cms.webp",
    title: "MAVE CMS - Enterprise SaaS Platform",
    slug: "mave-cms",
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
    imagePath: "/mave-lms.webp",
    title: "MAVE LMS - AI-Driven Learning Platform",
    slug: "mave-lms",
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
    imagePath: "/aranya-ecommerce.webp",
    title: "Aranya - E-Commerce Transformation",
    slug: "aranya",
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
    imagePath: "/uhl-hms.webp",
    title: "UHL - Healthcare Digital Transformation",
    slug: "uhl",
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
    imagePath: "/navbot-ai.webp",
    title: "NAVBOT - AI-Powered CRM Solution",
    slug: "navbot",
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
  {
    imagePath: "/gloria-jeans.webp",
    title: "Gloria Jean's Digital Transformation",
    slug: "gloria-jeans",
    description:
      "Led end-to-end product discovery and user journey optimization for Gloria Jean's e-commerce platform. Collaborated with UI/UX teams to identify and eliminate friction points, resulting in a 35% improvement in load times and 20% increase in conversion rates through strategic phased rollout.",
    skills: [
      "E-commerce Strategy",
      "User Journey Mapping",
      "Conversion Optimization",
      "A/B Testing",
      "Performance Analytics",
      "UX Design",
    ],
    link: "https://gloriajeanscoffeesbd.com/menu",
  },
  {
    imagePath: "/techcare.webp",
    title: "TechCare Web Template System",
    slug: "techcare",
    description:
      "Developed and maintained a comprehensive web template system that achieved over 863,000 global downloads. Led the implementation of responsive design patterns and accessibility features, resulting in significant improvements in developer productivity and user satisfaction.",
    skills: [
      "Web Development",
      "UI/UX Design",
      "Accessibility",
      "Performance Optimization",
      "Documentation",
      "Open Source",
    ],
    link: "https://templately.com/platform/elementor?page=1",
  },
];

// First, update the interface to match your actual project data
interface Project {
  imagePath: string;
  title: string;
  slug: string;
  description: string;
  skills: string[];
  link: string;
}

export default function Projects() {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(jobProjects);
  
  // Remove the githubStats state and useEffect for GitHub stats
  // Keep only the filtering useEffect
  useEffect(() => {
    if (selectedFilter === 'all') {
      setFilteredProjects(jobProjects);
    } else {
      const filtered = jobProjects.filter(project => 
        project.skills.some(skill => 
          skill.toLowerCase().includes(selectedFilter.toLowerCase())
        )
      );
      setFilteredProjects(filtered);
    }
  }, [selectedFilter]);

  return (
    <section id="projects" className="scroll-mt-16 lg:mt-16">
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-background/0 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest lg:sr-only">
          Projects
        </h2>
      </div>


      {/* Projects grid */}
      <div className="space-y-4">
        <AnimatePresence mode="wait">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-card rounded-lg overflow-hidden border border-muted hover:border-primary transition-colors"
            >
              <div className="flex flex-col">
                <div className="relative w-full h-[240px]">
                  <Image
                    src={project.imagePath}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                </div>
                
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground mb-4 line-clamp-3">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-4">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-primary hover:underline"
                    >
                      View Project <MoveUpRight className="ml-1 h-4 w-4" />
                    </a>
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center text-primary hover:underline"
                    >
                      Case Study <MoveUpRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
