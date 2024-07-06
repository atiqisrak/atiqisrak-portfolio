"use client";

export default function About() {
  return (
    <section id="about" className="scroll-mt-16 ">
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-background/0 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest lg:sr-only">
          About
        </h2>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-start text-muted-foreground lg:px-6">
          I started my tech journey at 17, diving into web development with a
          passion for bringing ideas to life. Over the years, I have designed and
          developed various websites as a freelancer, which led me to work with
          advertising agencies, startups, large corporations, and digital
          product studios.
        </p>
        <p className="text-start  text-muted-foreground lg:px-6">
          Currently, I work as a Senior Software Engineer and Tech Team Lead at
          Webable Digital. Leading a 12-member team, I drive strategic
          innovations using technologies like Node.js, Express.js, MongoDB, and
          AWS. Some of my recent projects include{" "}
          <a
            className="no-wrap text-primary dark:text-white"
            href="https://app.aliio.tech"
            target="blank"
            rel="noopener noreferrer"
          >
            Mave CMS
          </a>{" "}
          , a headless CMS utilizing MACH architecture, and Aranya, a fully
          functional e-commerce platform that improved load times by 35%.
        </p>
        <p className="text-start text-muted-foreground lg:px-6">
          Before that, I was at Navana Group, where I led web application
          development for Fortune 500 companies. We surpassed revenue goals by
          150% and saved over $20K through streamlined processes. At <a
            className="no-wrap text-primary dark:text-white"
            href="https://gloriajeanscoffeesbd.com/menu"
            target="blank"
            rel="noopener noreferrer"
          >
            Gloria
            Jean’s Coffees Bangladesh
          </a>{" "}, I optimized system performance with MERN
          stack technologies, driving a 27% increase in sales. I also developed
          NAVBOT, an AI CRM Chatbot that automated customer interactions,
          enhancing operational efficiency.
        </p>
        <p className="text-start text-muted-foreground lg:px-6">
          At TechCare Inc., I created over 120 website {" "}
          <a
            className="no-wrap text-primary dark:text-white"
            href="https://templately.com/platform/elementor"
            target="blank"
            rel="noopener noreferrer"
          >
            templates
          </a>{" "}
          using React and
          Next.js, achieving 863,000+ downloads and 430,000+ purchases. My
          innovative approach to animations increased sales by 27%, earning me
          the Best Employer Award in 2020.
        </p>
      </div>
    </section>
  );
}
