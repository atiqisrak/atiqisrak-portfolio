import { notFound } from "next/navigation";
import projectsData from "../data.json";
import { type Project } from "./types";
import {
  generateProjectSchema,
  generateBreadcrumbSchema,
} from "@/lib/structured-data";
import dynamic from "next/dynamic";

// Dynamic import for ProjectContent
const ProjectContent = dynamic(() => import("./ProjectContent"), {
  loading: () => <div className="animate-pulse bg-muted h-96 rounded-lg" />,
});

export function generateStaticParams() {
  return Object.keys(projectsData).map((slug) => ({
    slug,
  }));
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projectsData[
    params.slug as keyof typeof projectsData
  ] as Project;

  if (!project) {
    notFound();
  }

  // Generate structured data
  const projectSchema = generateProjectSchema({
    title: project.title,
    description: project.overview,
    banner: project.banner,
    slug: params.slug,
    technologies: project.technicalDetails.technologies,
    about: project.impact,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Projects", url: "/#projects" },
    { name: project.title, url: `/projects/${params.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ProjectContent project={project} />
    </>
  );
}
