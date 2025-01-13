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
    title: "MAVE CMS - Headless CMS",
    description:
      "MAVE CMS is an API First Enterprise software utilizing MACH architecture. As the Product Owner and Lead Developer, I spearheaded the development of this transformative headless CMS, integrating a visual page builder and ensuring scalability and security. This project set new standards in industry efficiency and innovation, enhancing team productivity by 30% and reducing project delivery time by 20%.",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "GraphQL",
      "AWS",
    ],
    link: "https://mave.ethertech.ltd",
  },
  {
    imagePath: "/aranya-ecommerce.png",
    title: "Aranya - E-Commerce Platform",
    description:
      "Aranya is a fully functional e-commerce platform developed with Next.js and Redux. I contributed to both frontend development and backend architecture, utilizing Cloudinary for media management and CDN integration for enhanced performance and scalability. This project increased load times by 35% and significantly enhanced user experience.",
    skills: [
      "Next.js",
      "Redux",
      "Cloudinary",
      "JavaScript",
      "TypeScript",
      "CDN",
    ],
    link: "https://www.aranya.com.bd/",
  },
  {
    imagePath: "/uhl-hms.png",
    title: "UHL - Hospital Management System",
    description:
      "UHL is a comprehensive hospital management system designed to handle everything from doctor appointments to report delivery and patient management. Developed with Next.js, Redux for the frontend, and Node.js for backend services, this system improved efficiency and user satisfaction by 40%.",
    skills: [
      "Next.js",
      "Redux",
      "Node.js",
      "JavaScript",
      "TypeScript",
      "MongoDB",
    ],
    link: "https://www.uhlbd.com/",
  },
  {
    imagePath: "/gloria-jeans.png",
    title: "Gloria Jean’s Coffees Bangladesh - Web App",
    description:
      "As the Front-end Engineer and Head of Product R&D, I optimized the performance of Gloria Jean’s Coffees BD franchise web app using MERN stack technologies. Implemented server load balancing and automation, driving a 27% increase in sales and onboarding 170% more clients.",
    skills: [
      "React",
      "Node.js",
      "MongoDB",
      "Express",
      "JavaScript",
      "TypeScript",
    ],
    link: "https://gloriajeanscoffeesbd.com/menu",
  },
  {
    imagePath: "/navbot-ai.png",
    title: "NAVBOT - AI CRM Chatbot",
    description:
      "NAVBOT is an AI chatbot developed for CRM, providing comprehensive management solutions for various industries including restaurants and automotive services. Utilizing Node.js and natural language processing (NLP), NAVBOT automated customer interactions, reducing manual workload by 50% and boosting customer satisfaction by 35%.",
    skills: [
      "Node.js",
      "NLP",
      "Express",
      "MongoDB",
      "JavaScript",
      "TypeScript",
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
