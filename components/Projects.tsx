"use client";
import OptimizedImage from "@/components/OptimizedImage";
import { Badge } from "@/components/ui/badge";
import { MoveUpRight, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

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
    imagePath: "/sumo.webp",
    title: "SUMO - Restaurant Inventory Tracking and Management System",
    slug: "sumo",
    description:
      "Led the product strategy and development of SUMO, a restaurant inventory tracking and management system. Spearheaded stakeholder negotiations, defined product roadmap, and implemented data-driven feature prioritization. Successfully shortened deployment cycles by 30% while maintaining high engineering quality and achieving a 20% reduction in operational costs.",
    skills: [
      "Product Strategy",
      "Inventory Management",
      "Go-to-Market",
      "Stakeholder Management",
      "Technical Product Management",
      "Analytics",
    ],
    link: "https://sumo.ethertech.ltd",
  },
  {
    imagePath: "/assetiq.webp",
    title: "AssetIQ - RFID-based Asset Management System",
    slug: "assetiq",
    description:
      "Led the product strategy and development of AssetIQ, an RFID-based asset management system. Spearheaded stakeholder negotiations, defined product roadmap, and implemented data-driven feature prioritization. Successfully shortened deployment cycles by 30% while maintaining high engineering quality and achieving a 20% reduction in operational costs.",
    skills: [
      "Product Strategy",
      "RFID Technology",
      "Go-to-Market",
      "Stakeholder Management",
      "Technical Product Management",
      "Analytics",
    ],
    link: "https://assetiq.ethertech.ltd",
  },
  {
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

// Enhanced interface with additional metadata for SEO and accessibility
interface Project {
  imagePath?: string;
  title: string;
  slug: string;
  description: string;
  skills: string[];
  link: string;
  category?: string;
  status?: "completed" | "in-progress" | "archived";
  featured?: boolean;
}

const ProjectCard = ({
  project,
  index,
}: {
  project: Project;
  index: number;
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  });

  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="relative bg-card rounded-2xl overflow-hidden border border-muted hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 group cursor-pointer"
      role="listitem"
      aria-labelledby={`project-title-${project.slug}`}
      itemScope
      itemType="https://schema.org/CreativeWork"
    >
      {/* Full-width Hero Image */}
      {project.imagePath && (
        <div className="relative w-full h-[200px] overflow-hidden">
          <OptimizedImage
            src={project.imagePath}
            alt={`${project.title} - Project screenshot`}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
            priority={index < 2}
            lazy={index >= 2}
            placeholder="blur"
            itemProp="image"
          />

          {/* Dynamic Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Floating Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <Link
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-background/90 backdrop-blur-sm rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
              aria-label={`Visit ${project.title} live project`}
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="h-4 w-4" />
            </Link>
            <Link
              href={`/projects/${project.slug}`}
              className="p-2 bg-background/90 backdrop-blur-sm rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
              aria-label={`Read case study for ${project.title}`}
              onClick={(e) => e.stopPropagation()}
            >
              <MoveUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}

      {/* Content Section */}
      <div className="p-6">
        <header className="mb-4">
          <h3
            id={`project-title-${project.slug}`}
            className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors duration-300"
            itemProp="name"
          >
            {project.title}
          </h3>
          <p
            className="text-muted-foreground leading-relaxed text-sm line-clamp-3"
            itemProp="description"
          >
            {project.description}
          </p>
        </header>

        {/* Skills with Creative Layout */}
        <div className="mb-6">
          <h4 className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
            Technologies & Skills
          </h4>
          <div
            className="flex flex-wrap gap-2"
            role="list"
            aria-label="Technologies and skills used"
          >
            {project.skills.map((skill, skillIndex) => (
              <Badge
                key={skillIndex}
                variant="secondary"
                className="text-xs font-medium px-2 py-1 bg-primary/10 text-primary border-primary/20 hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                role="listitem"
                aria-label={`Technology: ${skill}`}
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <footer>
          <div
            className="flex flex-col sm:flex-row gap-4"
            role="group"
            aria-label="Project actions"
          >
            <Link
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label={`Visit ${project.title} live project (opens in new tab)`}
              itemProp="url"
              onClick={(e) => e.stopPropagation()}
            >
              <span>View Live Project</span>
              <ExternalLink className="h-3 w-3" />
            </Link>
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center justify-center gap-2 border border-primary text-primary px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label={`Read detailed case study for ${project.title}`}
              onClick={(e) => e.stopPropagation()}
            >
              <span>Case Study</span>
              <MoveUpRight className="h-3 w-3" />
            </Link>
          </div>
        </footer>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br from-primary/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute -top-2 -left-2 w-16 h-16 bg-gradient-to-br from-primary/5 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: project.title,
            description: project.description,
            url: project.link,
            image: project.imagePath
              ? `${
                  typeof window !== "undefined"
                    ? window.location.origin
                    : "https://atiqisrak.vercel.app"
                }${project.imagePath}`
              : undefined,
            author: {
              "@type": "Person",
              name: "Atiq Israk",
            },
            keywords: project.skills.join(", "),
            dateCreated: "2020",
            inLanguage: "en",
          }),
        }}
      />
    </motion.article>
  );
};

export default function Projects() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [filteredProjects, setFilteredProjects] =
    useState<Project[]>(jobProjects);

  // Remove the githubStats state and useEffect for GitHub stats
  // Keep only the filtering useEffect
  useEffect(() => {
    if (selectedFilter === "all") {
      setFilteredProjects(jobProjects);
    } else {
      const filtered = jobProjects.filter((project) =>
        project.skills.some((skill) =>
          skill.toLowerCase().includes(selectedFilter.toLowerCase())
        )
      );
      setFilteredProjects(filtered);
    }
  }, [selectedFilter]);

  return (
    <section
      id="projects"
      className="scroll-mt-16 lg:mt-16 z-50"
      aria-labelledby="projects-heading"
      role="region"
    >
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-background/0 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2
          id="projects-heading"
          className="text-sm font-bold uppercase tracking-widest lg:sr-only"
        >
          Featured Projects
        </h2>
      </div>

      {/* Projects grid */}
      <div className="space-y-6" role="list" aria-label="Portfolio projects">
        <AnimatePresence mode="wait">
          {filteredProjects.map((project, index) => {
            return (
              <ProjectCard key={project.slug} project={project} index={index} />
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
}
