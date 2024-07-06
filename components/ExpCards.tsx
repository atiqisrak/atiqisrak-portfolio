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

const jobPositions = [
  {
    timeline: "June 2023 — Present",
    currentPosition: "Senior Software Engineer & Tech Team Lead",
    place: "Webable Digital",
    previousPositions: [""],
    description:
      "Led a 12-member team, enhancing collaboration and productivity through Agile practices. Spearheaded initiatives in Node.js, Express.js, MongoDB, and AWS, reducing project delivery time by 40%. Implemented CI/CD pipelines with GitHub Actions, enhancing development speed and reliability.",
    skills: [
      "TypeScript",
      "Node.js",
      "React",
      "Next.js",
      "Tailwind CSS",
      "GraphQL",
      "RESTful APIs",
      "Agile (Scrum, Kanban)",
      "CI/CD",
      "AWS (EC2, S3, RDS)",
      "Leadership",
      "Mentorship",
    ],
    recentProjects: [
      {
        title: "MAVE CMS (PAAS | API First Enterprise software)",
        description:
          "As Product Owner & Lead Developer, implemented a headless CMS using MACH architecture. Boosted team efficiency by 30% and improved project delivery time by 20% through Agile methodologies.",
        technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      },
      {
        title: "Aranya (E-Commerce)",
        description:
          "Developed a fully functional e-commerce platform using Next.js, Redux, and Cloudinary for media management. Integrated CDN for enhanced performance and scalability, increasing load times by 35% and enhancing user experience.",
        technologies: ["Next.js", "Redux", "Cloudinary"],
      },
      {
        title: "UHL (Hospital Management System)",
        description:
          "Designed and implemented a comprehensive hospital management system with features including doctor appointments, report delivery, and patient management. Utilized Next.js and Redux for frontend, and Node.js for backend services, resulting in a 40% increase in system efficiency and user satisfaction.",
        technologies: ["Next.js", "Redux", "Node.js"],
      },
    ],
  },
  {
    timeline: "August 2020 — March 2023",
    currentPosition: "Full Stack Web Developer, Product & Engineering",
    place: "Navana Group",
    previousPositions: [""],
    description:
      "Led web application development for Fortune 500 companies, using React, Node.js, and PostgreSQL. Surpassed revenue goals by 150% and enhanced PWAs for multinational brands, improving performance scores by 45%-56%. Implemented streamlined processes and resource optimization with Docker and AWS, saving over $20K.",
    skills: [
      "React",
      "Node.js",
      "PostgreSQL",
      "Docker",
      "AWS",
      "PWA Development",
      "Resource Optimization",
      "Team Leadership",
    ],
    recentProjects: [
      {
        title: "Gloria Jean’s Coffees Bangladesh (Web App | E-commerce)",
        description:
          "As Front-end Engineer & Head of Product R&D, optimized performance with MERN stack technologies. Implemented server load balancing and automation, driving a 27% increase in sales and onboarding 170% more clients.",
        technologies: ["React", "Node.js", "MongoDB", "Express"],
      },
      {
        title: "NAVBOT (AI CRM Chatbot)",
        description:
          "Developed an AI Chatbot for CRM, providing comprehensive management solutions for restaurant management at Gloria Jean’s and vehicle servicing reservation and queue automation at Toyota. Utilized Node.js and NLP, automating customer interactions and reducing manual workload by 50%.",
        technologies: ["Node.js", "NLP", "Express", "MongoDB"],
      },
    ],
  },
  {
    timeline: "February 2019 — July 2020",
    currentPosition: "Frontend Web Developer",
    place: "TechCare Inc.",
    previousPositions: [""],
    description:
      "Created over 120 website templates using React and Next.js, achieving 863,000+ downloads and 430,000+ purchases. Integrated Lottiefiles & GSAP for interactive animations, increasing sales by 27% and onboarding 170% more clients. Awarded Best Employer in 2020 for exceptional contributions and team leadership.",
    skills: [
      "React",
      "Next.js",
      "Lottiefiles",
      "GSAP",
      "Template Development",
      "Interactive Animations",
      "Team Leadership",
    ],
  },
];


export default function ExpCard() {
  return (
    <section id="experience" className="scroll-mt-16 lg:mt-16">
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-background/0 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest lg:sr-only">
          Experience
        </h2>
      </div>
      <>
        {jobPositions.map((job, index) => (
          <Card
            key={index}
            className="lg:p-6 mb-8 flex flex-col lg:flex-row w-full min-h-fit gap-0 lg:gap-5 border-transparent hover:border dark:lg:hover:border-t-blue-900 dark:lg:hover:bg-slate-800/50 lg:hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:hover:drop-shadow-lg lg:hover:bg-slate-100/50 lg:hover:border-t-blue-200"
          >
            <CardHeader className="h-full w-full p-0">
              <CardTitle className="text-base text-slate-400 whitespace-nowrap">
                {job.timeline}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col p-0">
              <p className="text-primary font-bold">
                {job.currentPosition} • {job.place}
              </p>
              {job.previousPositions.map((position, index) => (
                <p key={index} className="text-slate-400 text-sm font-bold">
                  {position}
                </p>
              ))}
              <CardDescription className="py-3 text-muted-foreground">
                {job.description}
              </CardDescription>
              <CardFooter className="p-0 flex flex-wrap gap-2">
                {job.skills.map((skill, index) => (
                  <Badge key={index}>{skill}</Badge>
                ))}
              </CardFooter>
            </CardContent>
          </Card>
        ))}
      </>
      <div className="lg:px-12 mt-12">
        <a
          className="inline-flex items-center font-medium leading-tight text-foreground group"
          href="/public/Atiq_Israk_Niloy_Resume.pdf"
        >
          <span className="border-b border-transparent pb-px transition hover:border-primary motion-reduce:transition-none">
            View Full Resume
          </span>
          <MoveRight className="ml-1 inline-block h-5 w-5 shrink-0 -translate-y-px transition-transform group-hover:translate-x-2 group-focus-visible:translate-x-2 motion-reduce:transition-none" />
        </a>
      </div>
    </section>
  );
}
