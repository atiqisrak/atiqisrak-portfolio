import { notFound } from 'next/navigation';
import projectsData from '../data.json';
import ProjectContent from './ProjectContent';
import { type Project } from './types';

export function generateStaticParams() {
  return Object.keys(projectsData).map((slug) => ({
    slug,
  }));
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projectsData[params.slug as keyof typeof projectsData] as Project;

  if (!project) {
    notFound();
  }

  return <ProjectContent project={project} />;
} 