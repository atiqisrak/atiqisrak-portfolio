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
          As a forward-thinking Product Manager with over 5 years of experience, I specialize in translating customer needs into profitable, user-centric solutions. My journey in tech began as a developer, which gives me a unique technical perspective in product management, allowing me to effectively bridge business goals with technical implementation.
        </p>
        <p className="text-start text-muted-foreground lg:px-6">
          Currently, I serve as the Product Manager at Webable Digital, where I develop product vision and strategy, focusing on user journey optimization and go-to-market execution. I've successfully launched and managed{" "}
          <a
            className="no-wrap text-primary dark:text-white"
            href="https://mave.ethertech.ltd"
            target="blank"
            rel="noopener noreferrer"
          >
            MAVE CMS
          </a>{" "}
          , a MACH architecture based Headless CMS, and {" "}
          <a
            className="no-wrap text-primary dark:text-white"
            href="https://mave-lms.ethertech.ltd"
            target="blank"
            rel="noopener noreferrer"
          >
            MAVE LMS
          </a>
          , achieving a 20% reduction in operational overhead through strategic cost controls and efficient resource management.
        </p>
        <p className="text-start text-muted-foreground lg:px-6">
          Previously at Navana Group as Technical Project Manager, I oversaw AI-driven chatbot projects and digital transformation initiatives. At{" "}
          <a
            className="no-wrap text-primary dark:text-white"
            href="https://gloriajeanscoffeesbd.com/menu"
            target="blank"
            rel="noopener noreferrer"
          >
            Gloria Jean's Coffees Bangladesh
          </a>{" "}, 
          I led the implementation of key e-commerce optimizations that boosted sales by 27%. I also conceptualized NAVBOT, an AI CRM Chatbot that revolutionized customer service automation for restaurants and vehicle servicing.
        </p>
        <p className="text-start text-muted-foreground lg:px-6">
          My background in software development at TechCare Inc., where I developed over 120 web templates with 863,000+ global downloads, provides me with deep technical insights that enhance my product management approach. I'm passionate about balancing revenue vs. cost, defining user journeys, and managing complex roadmaps to deliver high-impact digital products while mentoring cross-functional teams.
        </p>
      </div>
    </section>
  );
}
