import api from "@/lib/api";

export interface AIResponseGeneratorProps {
  query: string;
  projects: any[];
  skills: any[];
  experience: any[];
}

// Enhanced prompt for OpenAI to act as Atiq Israk
const createPersonalityPrompt = (
  query: string,
  projects: any[],
  skills: any[],
  experience: any[]
) => {
  return `You are Atiq Israk, a Product Manager and Software Engineer with a passion for building impactful products. You have a unique perspective combining technical expertise with strategic product thinking.

Your background:
- You transitioned from Full Stack Developer to Product Manager
- You believe in "Build, Measure, Learn" methodology
- You focus on user-centric thinking and data-driven decisions
- You have experience in healthcare, e-commerce, AI/ML, and enterprise solutions
- You're passionate about Web3, decentralized applications, and modern web development

Your projects include:
${projects.map((p) => `- ${p.title}: ${p.description}`).join("\n")}

Your key skills:
${skills
  .map((s) => `- ${s.name} (${s.category}): ${s.proficiency}%`)
  .join("\n")}

Your experience:
${experience
  .map((e) => `- ${e.title} at ${e.company}: ${e.description}`)
  .join("\n")}

User Query: "${query}"

Respond as Atiq would - with your personality, insights, and PM perspective. Be conversational, share your thinking process, and provide valuable insights beyond just listing facts. If the user asks about product management, share your philosophy and approach. If they ask about technology, explain your technical decisions and reasoning. Be authentic to who you are as a Product Manager.

Keep responses conversational and engaging, as if you're having a coffee chat with someone interested in your work and perspective.`;
};

export const generateIntelligentResponse = async (
  query: string,
  projects: any[],
  skills: any[],
  experience: any[],
  chatHistory?: string
): Promise<string> => {
  try {
    // First try to use OpenAI for intelligent responses
    const openaiResponse = await api.post("/portfolio/ai/contextual-response", {
      query: query,
      context: {
        projects,
        skills,
        experience,
        personality: "Atiq Israk - Product Manager and Software Engineer",
        chatHistory: chatHistory || "",
      },
    });

    if (openaiResponse.data && openaiResponse.data.response) {
      return openaiResponse.data.response;
    }
  } catch (error) {
    console.log("OpenAI not available, using fallback responses");
  }

  // Fallback to intelligent pattern matching with personality
  const queryLower = query.toLowerCase();
  let response = "";

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
      return "Yes, I have extensive experience with React and Next.js. I've built multiple production applications using these technologies.";
    } else if (
      queryLower.includes("ai") ||
      queryLower.includes("machine learning")
    ) {
      return "Yes, I've worked on AI projects including NavBot AI and have experience integrating OpenAI APIs and building intelligent systems.";
    } else if (queryLower.includes("healthcare")) {
      return "Yes, I led the UHL Hospital Management System project, a comprehensive healthcare digital transformation that improved operational efficiency by 40%.";
    }
  }

  // Check for follow-up questions based on chat history
  if (chatHistory) {
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
        response = `## More Details About Mave CMS

**Technical Architecture:** Headless design with Next.js, TypeScript, and PostgreSQL. Features real-time collaboration, image optimization, and Redis caching.

**Key Challenges Solved:** Operational Transformation for conflict resolution, WebSocket real-time updates, and microservices architecture for scalability.

**Business Impact:** Developer experience focus, performance optimization, and flexibility for different frontends.`;
        return response;
      } else if (
        historyLower.includes("navbot") ||
        historyLower.includes("navbot-ai")
      ) {
        response = `## More Details About NavBot AI

**AI Integration:** OpenAI for natural language understanding, intent classification, and context memory across interactions.

**Technical Features:** WebSocket real-time communication, streaming responses, and hybrid AI approach for reliability.

**UX Design:** Proactive assistance with voice commands, accessibility compliance, and multi-language support.`;
        return response;
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
        response = `## Comparing My Projects

**Mave CMS:** Content management for developers - focuses on performance, scalability, and developer experience.

**NavBot AI:** AI-powered navigation for end users - focuses on real-time processing and user behavior.

**Common Thread:** Both showcase user-centric design and solve real problems through iterative development.`;
        return response;
      }
    }
  }

  // Check for specific project queries first
  if (queryLower.includes("mave cms") || queryLower.includes("mave-cms")) {
    response = `## Mave CMS - Content Management System

**What it is:** A modern, headless content management system built with Next.js and TypeScript.

**Key Features:** Headless architecture, real-time collaboration, role-based access, media management, SEO optimization, and responsive design.

**Technologies:** Next.js 13+, TypeScript, Tailwind CSS, PostgreSQL, JWT authentication, RESTful API.

**Why I Built It:** To solve the pain points of traditional CMS platforms - slow performance, complex interfaces, and limited customization options.`;
  } else if (
    queryLower.includes("navbot") ||
    queryLower.includes("navbot-ai")
  ) {
    response = `## NavBot AI - AI-Powered Navigation Assistant

**What it is:** An intelligent navigation system that helps users navigate complex applications using natural language.

**Key Features:** Natural language processing, context awareness, smart suggestions, voice integration, and learning capability.

**Technologies:** React, Node.js, OpenAI API, MongoDB, WebSocket connections.

**Impact:** Demonstrates my skills in AI integration, real-time applications, and creating intuitive user experiences.`;
  } else if (
    queryLower.includes("aranya") ||
    queryLower.includes("ecommerce")
  ) {
    response = `## Aranya E-commerce - Full-Stack E-commerce Platform

**What it is:** A comprehensive online shopping platform with product management, payments, and order management.

**Key Features:** Product catalog, shopping cart, secure payments (Stripe), order tracking, admin panel, and responsive design.

**Technologies:** Next.js, TypeScript, Stripe integration, PostgreSQL, Tailwind CSS, JWT authentication.

**Impact:** Showcases my full-stack development skills, payment integration expertise, and ability to build scalable e-commerce solutions.`;
  } else if (
    queryLower.includes("uhl") ||
    queryLower.includes("hospital") ||
    queryLower.includes("healthcare")
  ) {
    response = `## UHL - Healthcare Digital Transformation

**Project:** Hospital Management System for United Hospital Limited - a complete operational overhaul transforming healthcare delivery.

**Key Solutions:** Centralized patient management, digital appointment scheduling, Electronic Health Records (EHR), resource optimization dashboard, and mobile patient portal.

**Technologies:** React, Node.js, PostgreSQL, Redis, Docker on AWS, HIPAA-compliant infrastructure.

**Impact:** 40% operational efficiency improvement, 60% reduction in scheduling time, 90% patient satisfaction, 50% decrease in administrative overhead.

**My Role:** Led the transformation as Product Manager, implementing HIPAA compliance, managing stakeholder requirements, and overseeing phased deployment.`;
  } else if (
    queryLower.includes("gloria jeans") ||
    queryLower.includes("coffee")
  ) {
    response = `## Gloria Jeans Coffee - Coffee Shop Management

**What it is:** A comprehensive point-of-sale and management system designed specifically for coffee shops and cafes.

**Key Features:** Menu management, real-time order processing, inventory tracking, staff management, customer loyalty program, and analytics dashboard.

**Technologies:** Vue.js, Node.js, MongoDB, Socket.io, multiple payment methods, responsive mobile design.

**Impact:** Demonstrates my skills in real-time applications, restaurant management systems, and creating user-friendly interfaces for fast-paced environments.`;
  } else if (
    queryLower.includes("why do you like") ||
    queryLower.includes("why product management") ||
    queryLower.includes("why pm")
  ) {
    response = `## Why I Love Product Management

**Perfect Blend:** Combines my technical expertise with strategic business thinking - I can bridge both worlds effectively.

**User-Centric Problem Solving:** I love digging deep into user needs and validating solutions through research and data.

**Data-Driven Decisions:** PM isn't about gut feelings - it's about gathering evidence and making informed choices.

**Cross-Functional Leadership:** I enjoy orchestrating diverse teams toward common goals.

**Continuous Learning:** The tech landscape changes rapidly, keeping me intellectually stimulated and growing.

**Building Impact:** I want to create products that make a difference in people's lives.

**My Philosophy:** "Build, Measure, Learn" - creating MVPs, gathering user feedback, and iterating based on real data.

${
  chatHistory && chatHistory.toLowerCase().includes("project")
    ? "Speaking of which, the projects we've discussed - like Mave CMS and NavBot AI - are perfect examples of this philosophy in action."
    : ""
}

Product Management isn't just a job - it's a mindset that combines my technical skills, strategic thinking, and passion for creating value.`;
  } else if (
    queryLower.includes("hospital management") ||
    queryLower.includes("healthcare experience") ||
    queryLower.includes("medical system") ||
    queryLower.includes("healthcare management")
  ) {
    response = `## My Healthcare & Hospital Management Experience

**Project:** UHL Hospital Management System - a comprehensive digital transformation that revolutionized healthcare delivery.

**Key Solutions:** Centralized patient database, Electronic Health Records (EHR), digital appointment scheduling with AI optimization, resource management dashboard, and mobile patient portal.

**Technical Stack:** React, Node.js, PostgreSQL, Redis, Docker on AWS, HIPAA-compliant infrastructure.

**Measurable Impact:** 40% operational efficiency improvement, 60% reduction in scheduling time, 90% patient satisfaction, 50% decrease in administrative overhead.

**My Role:** Led the transformation as Product Manager, implementing HIPAA compliance, managing stakeholder requirements, and overseeing phased deployment.

**Key Learnings:** User-centric design in healthcare, compliance & security, change management, and building scalable healthcare systems.`;
  } else if (
    queryLower.includes("what do you know") ||
    queryLower.includes("tell me about") ||
    queryLower.includes("introduce")
  ) {
    response =
      "I'm **Atiq Israk**, a full-stack developer and software engineer. Here's what I can tell you about:\n\n";

    if (projects.length > 0) {
      response += "## My Projects\n\n";
      projects.slice(0, 3).forEach((project: any) => {
        response += `**${project.title}:** ${project.description}\n`;
        if (project.technologies && project.technologies.length > 0) {
          response += `Technologies: ${project.technologies.join(", ")}\n`;
        }
        response += "\n";
      });
    }

    if (skills.length > 0) {
      response += "## My Skills\n\n";
      const categories = Array.from(
        new Set(skills.map((s: any) => s.category))
      );
      categories.slice(0, 3).forEach((category) => {
        const categorySkills = skills.filter(
          (s: any) => s.category === category
        );
        const uniqueSkills = Array.from(
          new Map(categorySkills.map((s) => [s.name, s])).values()
        );
        response += `**${category}:** ${uniqueSkills
          .slice(0, 3)
          .map((s) => s.name)
          .join(", ")}\n`;
      });
      response += "\n";
    }

    response += "Ask me about specific projects, skills, or my experience!";
  } else if (queryLower.includes("project") || queryLower.includes("work")) {
    if (projects.length > 0) {
      response = "## My Projects\n\n";
      projects.slice(0, 3).forEach((project: any) => {
        response += `**${project.title}:** ${project.description}\n`;
        if (project.technologies && project.technologies.length > 0) {
          response += `Technologies: ${project.technologies.join(", ")}\n`;
        }
        response += "\n";
      });
    } else {
      response =
        "I'm currently working on several exciting projects. Would you like me to tell you about my development approach or specific technologies I use?";
    }
  } else if (
    queryLower.includes("skill") ||
    queryLower.includes("technology") ||
    queryLower.includes("tech")
  ) {
    if (skills.length > 0) {
      response = "## My Key Skills & Technologies\n\n";
      const categories = Array.from(
        new Set(skills.map((s: any) => s.category))
      );
      categories.slice(0, 3).forEach((category) => {
        const categorySkills = skills.filter(
          (s: any) => s.category === category
        );
        const uniqueSkills = Array.from(
          new Map(categorySkills.map((s) => [s.name, s])).values()
        );
        response += `**${category}:** ${uniqueSkills
          .slice(0, 3)
          .map((s) => s.name)
          .join(", ")}\n`;
      });
      response +=
        "\nAsk me about specific areas or how I apply these skills in projects!";
    } else {
      response =
        "I work with modern technologies including React, Node.js, Python, and cloud platforms. What specific area interests you?";
    }
  } else if (
    queryLower.includes("experience") ||
    queryLower.includes("work history")
  ) {
    if (experience.length > 0) {
      response = "## My Professional Experience\n\n";
      experience.slice(0, 3).forEach((exp: any) => {
        const title = exp.title || exp.role || "Software Engineer";
        const company = exp.company || "Company";
        const duration = exp.duration || exp.period || "Current";
        const description =
          exp.description ||
          exp.summary ||
          "Full-stack development and product management";

        response += `**${title} at ${company}** (${duration})\n`;
        response += `${description}\n\n`;
      });
    } else {
      response =
        "Based on my projects, I have experience in healthcare systems, e-commerce platforms, and AI-powered tools. I'm passionate about building scalable solutions and continuously learning new technologies.";
    }
  } else if (
    queryLower.includes("journey") ||
    queryLower.includes("pm") ||
    queryLower.includes("product manager")
  ) {
    response = `## My Journey as a Product Manager

**Transition:** Started as a Full Stack Developer, evolved into Product Manager to bridge technical implementation with business strategy.

**Key Learnings:** User-centric thinking, data-driven decisions, cross-functional leadership, and strategic vision.

**My Philosophy:** "Build, Measure, Learn" - creating MVPs, gathering user feedback, and iterating based on real data.

**Technical PM Advantage:** Better communication with engineering teams, realistic planning, quality focus, and innovation evaluation.

**What I've Built:** Healthcare systems, e-commerce platforms, AI-powered tools, and enterprise solutions that deliver measurable business value.

My journey reflects my belief that the best products come from combining technical expertise with deep user understanding and strategic business thinking.`;
  } else {
    // Generic response for other queries
    response = `I understand you're asking about "${query}". Let me search for relevant information from my portfolio.\n\n`;

    if (projects.length > 0) {
      response += "**Relevant Projects:**\n";
      projects.slice(0, 2).forEach((project: any) => {
        response += `• **${project.title}** - ${project.description}\n`;
      });
      response += "\n";
    }

    // Add context-aware suggestions based on chat history
    if (chatHistory) {
      const historyLower = chatHistory.toLowerCase();
      if (
        historyLower.includes("project") ||
        historyLower.includes("mave") ||
        historyLower.includes("navbot")
      ) {
        response +=
          "**Based on our conversation, you might also be interested in:**\n";
        response += "• Asking for more details about specific projects\n";
        response += "• Comparing different projects and their approaches\n";
        response += "• Understanding my development methodology\n\n";
      } else if (
        historyLower.includes("skill") ||
        historyLower.includes("technology")
      ) {
        response +=
          "**Since we've been discussing skills and technology, you might want to know:**\n";
        response += "• How I apply these skills in real projects\n";
        response += "• My learning approach and methodology\n";
        response += "• Specific technical challenges I've solved\n\n";
      }
    }

    response +=
      "Ask me about: specific projects, skills, work experience, my PM journey, or any particular technology!";
  }

  return response;
};
