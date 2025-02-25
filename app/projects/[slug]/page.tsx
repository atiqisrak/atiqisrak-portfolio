import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from "@/components/ui/badge";

const projectDetails: Record<string, {
  title: string;
  banner: string;
  overview: string;
  challenge: string;
  solution: string;
  impact: string[];
  technicalDetails: {
    architecture: string[];
    technologies: string[];
  };
  processAndMethodology: string[];
}> = {
  'mave-cms-enterprise-saas-platform': {
    title: "MAVE CMS - Enterprise SaaS Platform",
    banner: "/mave-cms.png",
    overview: "MAVE CMS is an enterprise-grade headless CMS built on MACH architecture, designed to revolutionize content management for large organizations.",
    challenge: "Enterprise organizations struggled with traditional CMS platforms that were inflexible, slow to deploy, and costly to maintain. The challenge was to create a modern, scalable solution that could handle complex content structures while remaining user-friendly.",
    solution: `Our approach focused on three key areas:
      1. MACH Architecture Implementation
      2. Microservices-based Design
      3. API-First Development`,
    impact: [
      "30% reduction in deployment cycles",
      "20% decrease in operational costs",
      "40% improvement in content delivery speed",
      "95% positive feedback from content editors"
    ],
    technicalDetails: {
      architecture: [
        "Microservices Architecture",
        "Containerized Deployments",
        "Event-Driven Design",
        "GraphQL API Layer"
      ],
      technologies: [
        "Next.js",
        "Node.js",
        "PostgreSQL",
        "Redis",
        "Docker",
        "Kubernetes"
      ]
    },
    processAndMethodology: [
      "Discovery workshops with stakeholders",
      "Iterative development with bi-weekly releases",
      "Continuous feedback integration",
      "Performance monitoring and optimization"
    ]
  },
  'mave-lms-ai-driven-learning-platform': {
    title: "MAVE LMS - AI-Driven Learning Platform",
    banner: "/mave-lms.png",
    overview: "An innovative learning management system that leverages AI to personalize learning experiences and improve outcomes.",
    challenge: "Traditional learning platforms were unable to provide personalized learning experiences or adapt to individual learner needs. The challenge was to create a platform that could deliver tailored learning paths while maintaining a user-friendly interface.",
    solution: `Our solution focused on:
      1. AI-Powered Personalization
      2. Adaptive Learning Paths
      3. Gamification Elements`,
    impact: [
      "90% increase in user engagement",
      "85% reduction in learning time",
      "92% satisfaction rating from learners"
    ],
    technicalDetails: {
      architecture: [
        "Microservices Architecture",
        "Containerized Deployments",
        "Event-Driven Design",
        "AI Integration Layer"
      ],
      technologies: [
        "React",
        "Node.js",
        "PostgreSQL",
        "OpenAI API",
        "Docker"
      ]
    },
    processAndMethodology: [
      "Agile development with bi-weekly sprints",
      "User testing and feedback integration",
      "Continuous performance monitoring"
    ]
  },
};

export default function ProjectPage({ params }: { params: { slug: string } }) {
    const project = projectDetails[params.slug];

  if (!project) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto py-12 px-4">
      <Image
        src={project.banner}
        alt={project.title}
        width={1920}
        height={1080}
        className="w-full h-64 object-cover rounded-lg mb-8"
      />

      <h1 className="text-3xl font-bold mb-6">{project.title}</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Overview</h2>
        <p className="text-muted-foreground">{project.overview}</p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Challenge</h2>
        <p className="text-muted-foreground">{project.challenge}</p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Solution</h2>
        <p className="text-muted-foreground whitespace-pre-line">{project.solution}</p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Impact</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          {project.impact.map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Technical Details</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Architecture</h3>
            <div className="flex flex-wrap gap-2">
              {project.technicalDetails.architecture.map((item: string, index: number) => (
                <Badge key={index} variant="secondary">{item}</Badge>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {project.technicalDetails.technologies.map((item: string, index: number) => (
                <Badge key={index} variant="secondary">{item}</Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Process & Methodology</h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          {project.processAndMethodology.map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </section>
    </article>
  );
} 