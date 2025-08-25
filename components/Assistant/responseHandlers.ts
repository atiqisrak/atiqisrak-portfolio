import { Project, Skill, Experience } from './types';

export const handleSimpleQuestions = (queryLower: string): string | null => {
  // Check for name questions
  if (
    queryLower.includes("your name") ||
    queryLower.includes("who are you") ||
    queryLower.includes("what's your name")
  ) {
    return "I'm Atiq Israk.";
  }

  // Check for simple questions that need short answers
  if (queryLower.includes("what is") || queryLower.includes("what's")) {
    if (queryLower.includes("mave cms")) {
      return "Mave CMS is a modern headless content management system built with Next.js, TypeScript, and PostgreSQL. It's designed for developers who need fast, flexible content management.";
    } else if (queryLower.includes("navbot")) {
      return "NavBot AI is an AI-powered navigation assistant that helps users navigate complex applications using natural language commands and real-time assistance.";
    } else if (queryLower.includes("aranya")) {
      return "Aranya is a full-stack e-commerce platform with Stripe payments, product management, and responsive design built with Next.js and PostgreSQL.";
    }
  }

  // Check for yes/no or simple questions
  if (
    queryLower.includes("do you") ||
    queryLower.includes("can you") ||
    queryLower.includes("have you")
  ) {
    if (queryLower.includes("react") || queryLower.includes("next.js")) {
      return "Yes, I have extensive experience with React and Next.js.";
    } else if (
      queryLower.includes("ai") ||
      queryLower.includes("machine learning")
    ) {
      return "Yes, I've worked on AI projects including NavBot AI.";
    } else if (queryLower.includes("healthcare")) {
      return "Yes, I led the UHL Hospital Management System project.";
    }
  }

  return null;
};

export const handleFollowUpQuestions = (
  queryLower: string,
  chatHistory: string
): string | null => {
  const historyLower = chatHistory.toLowerCase();

  // Check if this is a follow-up question about a previously discussed project
  if (
    queryLower.includes("tell me more") ||
    queryLower.includes("more details") ||
    queryLower.includes("explain")
  ) {
    if (
      historyLower.includes("mave cms") ||
      historyLower.includes("mave-cms")
    ) {
      return `**Technical Architecture:** Headless design with Next.js, TypeScript, and PostgreSQL. Features real-time collaboration, image optimization, and Redis caching.

**Key Challenges Solved:** Operational Transformation for conflict resolution, WebSocket real-time updates, and microservices architecture for scalability.

**Business Impact:** Developer experience focus, performance optimization, and flexibility for different frontends.`;
    } else if (
      historyLower.includes("navbot") ||
      historyLower.includes("navbot-ai")
    ) {
      return `**AI Integration:** OpenAI for natural language understanding, intent classification, and context memory across interactions.

**Technical Features:** WebSocket real-time communication, streaming responses, and hybrid AI approach for reliability.

**UX Design:** Proactive assistance with voice commands, accessibility compliance, and multi-language support.`;
    }
  }

  // Check for related questions based on previous topics
  if (
    queryLower.includes("similar") ||
    queryLower.includes("like") ||
    queryLower.includes("compare")
  ) {
    if (
      historyLower.includes("mave cms") ||
      historyLower.includes("navbot")
    ) {
      return `**Mave CMS:** Content management for developers - focuses on performance, scalability, and developer experience.

**NavBot AI:** AI-powered navigation for end users - focuses on real-time processing and user behavior.

**Common Thread:** Both showcase user-centric design and solve real problems through iterative development.`;
    }
  }

  return null;
};

export const handleProjectQueries = (queryLower: string): string | null => {
  if (queryLower.includes("mave cms") || queryLower.includes("mave-cms")) {
    return `**What it is:** A modern, headless content management system built with Next.js and TypeScript.

**Key Features:** Headless architecture, real-time collaboration, role-based access, media management, SEO optimization, and responsive design.

**Technologies:** Next.js 13+, TypeScript, Tailwind CSS, PostgreSQL, JWT authentication, RESTful API.

**Why I Built It:** To solve the pain points of traditional CMS platforms - slow performance, complex interfaces, and limited customization options.`;
  } else if (
    queryLower.includes("navbot") ||
    queryLower.includes("navbot-ai")
  ) {
    return `**What it is:** An intelligent navigation system that helps users navigate complex applications using natural language.

**Key Features:** Natural language processing, context awareness, smart suggestions, voice integration, and learning capability.

**Technologies:** React, Node.js, OpenAI API, MongoDB, WebSocket connections.

**Impact:** Demonstrates my skills in AI integration, real-time applications, and creating intuitive user experiences.`;
  } else if (
    queryLower.includes("aranya") ||
    queryLower.includes("ecommerce")
  ) {
    return `**What it is:** A comprehensive online shopping platform with product management, payments, and order management.

**Key Features:** Product catalog, shopping cart, secure payments (Stripe), order tracking, admin panel, and responsive design.

**Technologies:** Next.js, TypeScript, Stripe integration, PostgreSQL, Tailwind CSS, JWT authentication.

**Impact:** Showcases my full-stack development skills, payment integration expertise, and ability to build scalable e-commerce solutions.`;
  } else if (
    queryLower.includes("uhl") ||
    queryLower.includes("hospital") ||
    queryLower.includes("healthcare")
  ) {
    return `**Project:** Hospital Management System for United Hospital Limited - a complete operational overhaul transforming healthcare delivery.

**Key Solutions:** Centralized patient management, digital appointment scheduling, Electronic Health Records (EHR), resource optimization dashboard, and mobile patient portal.

**Technologies:** React, Node.js, PostgreSQL, Redis, Docker on AWS, HIPAA-compliant infrastructure.

**Impact:** 40% operational efficiency improvement, 60% reduction in scheduling time, 90% patient satisfaction, 50% decrease in administrative overhead.`;
  } else if (
    queryLower.includes("gloria jeans") ||
    queryLower.includes("coffee")
  ) {
    return `**What it is:** A comprehensive point-of-sale and management system designed specifically for coffee shops and cafes.

**Key Features:** Menu management, real-time order processing, inventory tracking, staff management, customer loyalty program, and analytics dashboard.

**Technologies:** Vue.js, Node.js, MongoDB, Socket.io, multiple payment methods, responsive mobile design.

**Impact:** Demonstrates my skills in real-time applications, restaurant management systems, and creating user-friendly interfaces for fast-paced environments.`;
  }

  return null;
};

export const handleSpecificTopics = (queryLower: string): string | null => {
  if (
    queryLower.includes("why do you like") ||
    queryLower.includes("why product management") ||
    queryLower.includes("why pm")
  ) {
    return `**Perfect Blend:** Combines my technical expertise with strategic business thinking.

**User-Centric Problem Solving:** I love digging deep into user needs and validating solutions through research and data.

**Data-Driven Decisions:** PM isn't about gut feelings - it's about gathering evidence and making informed choices.

**My Philosophy:** "Build, Measure, Learn" - creating MVPs, gathering user feedback, and iterating based on real data.`;
  } else if (
    queryLower.includes("hospital management") ||
    queryLower.includes("healthcare experience") ||
    queryLower.includes("medical system") ||
    queryLower.includes("healthcare management")
  ) {
    return `**Project:** UHL Hospital Management System - a comprehensive digital transformation.

**Key Solutions:** Centralized patient database, Electronic Health Records (EHR), digital appointment scheduling with AI optimization, resource management dashboard, and mobile patient portal.

**Technical Stack:** React, Node.js, PostgreSQL, Redis, Docker on AWS, HIPAA-compliant infrastructure.

**Impact:** 40% operational efficiency improvement, 60% reduction in scheduling time, 90% patient satisfaction, 50% decrease in administrative overhead.`;
  } else if (
    queryLower.includes("what do you know") ||
    queryLower.includes("tell me about") ||
    queryLower.includes("introduce")
  ) {
    return "I'm **Atiq Israk**, a full-stack developer and software engineer. Ask me about specific projects, skills, or my experience!";
  }

  return null;
};

export const handleGeneralQueries = (
  queryLower: string,
  projects: Project[],
  skills: Skill[],
  experience: Experience[]
): string => {
  if (queryLower.includes("project") || queryLower.includes("work")) {
    if (projects.length > 0) {
      let response = "**My Projects:** ";
      projects.slice(0, 3).forEach((project: Project, index: number) => {
        response += `${project.title}${index < 2 ? ", " : ""}`;
      });
      return response;
    } else {
      return "I'm currently working on several exciting projects.";
    }
  } else if (
    queryLower.includes("skill") ||
    queryLower.includes("technology") ||
    queryLower.includes("tech")
  ) {
    if (skills.length > 0) {
      let response = "**My Skills:** ";
      const categories = Array.from(
        new Set(skills.map((s: Skill) => s.category))
      );
      categories.slice(0, 3).forEach((category, index) => {
        response += `${category}${index < 2 ? ", " : ""}`;
      });
      return response;
    } else {
      return "I work with modern technologies including React, Node.js, Python, and cloud platforms.";
    }
  } else if (
    queryLower.includes("experience") ||
    queryLower.includes("work history")
  ) {
    if (experience.length > 0) {
      let response = "**My Experience:** ";
      experience.slice(0, 3).forEach((exp: Experience, index: number) => {
        const title = exp.title || exp.role || "Software Engineer";
        const company = exp.company || "Company";
        response += `${title} at ${company}${index < 2 ? ", " : ""}`;
      });
      return response;
    } else {
      return "I have experience in healthcare systems, e-commerce platforms, and AI-powered tools.";
    }
  } else if (
    queryLower.includes("journey") ||
    queryLower.includes("pm") ||
    queryLower.includes("product manager")
  ) {
    return `**Transition:** Started as a Full Stack Developer, evolved into Product Manager to bridge technical implementation with business strategy.

**My Philosophy:** "Build, Measure, Learn" - creating MVPs, gathering user feedback, and iterating based on real data.

**What I've Built:** Healthcare systems, e-commerce platforms, AI-powered tools, and enterprise solutions.`;
  }

  return `I understand you're asking about "${queryLower}". Ask me about specific projects, skills, work experience, my PM journey, or any particular technology!`;
};
