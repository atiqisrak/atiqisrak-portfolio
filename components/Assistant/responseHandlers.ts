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
      return "Mave CMS is a modern headless content management system. Ask me for more details about this project!";
    } else if (queryLower.includes("navbot")) {
      return "NavBot AI is an AI-powered navigation assistant. I'd be happy to tell you more about this project!";
    } else if (queryLower.includes("aranya")) {
      return "Aranya is a full-stack e-commerce platform. Let me know if you'd like to hear more about it!";
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
      return "I'd be happy to provide more details about Mave CMS! Let me fetch the latest information from my portfolio.";
    } else if (
      historyLower.includes("navbot") ||
      historyLower.includes("navbot-ai")
    ) {
      return "I'd be happy to provide more details about NavBot AI! Let me fetch the latest information from my portfolio.";
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
      return "I'd be happy to compare these projects! Let me fetch the latest information from my portfolio to give you an accurate comparison.";
    }
  }

  return null;
};

export const handleProjectQueries = (queryLower: string): string | null => {
  if (queryLower.includes("mave cms") || queryLower.includes("mave-cms")) {
    return "I'd be happy to tell you about Mave CMS! Let me fetch the latest project details from my portfolio.";
  } else if (
    queryLower.includes("navbot") ||
    queryLower.includes("navbot-ai")
  ) {
    return "I'd be happy to tell you about NavBot AI! Let me fetch the latest project details from my portfolio.";
  } else if (
    queryLower.includes("aranya") ||
    queryLower.includes("ecommerce")
  ) {
    return "I'd be happy to tell you about Aranya! Let me fetch the latest project details from my portfolio.";
  } else if (
    queryLower.includes("uhl") ||
    queryLower.includes("hospital") ||
    queryLower.includes("healthcare")
  ) {
    return "I'd be happy to tell you about the UHL Hospital Management System! Let me fetch the latest project details from my portfolio.";
  } else if (
    queryLower.includes("gloria jeans") ||
    queryLower.includes("coffee")
  ) {
    return "I'd be happy to tell you about the Gloria Jeans project! Let me fetch the latest project details from my portfolio.";
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
    return "I'd be happy to tell you about my healthcare experience! Let me fetch the latest details from my portfolio.";
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
      return "I'm currently working on several exciting projects. Let me fetch the latest information from my portfolio!";
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
      return "I work with modern technologies. Let me fetch the latest skills information from my portfolio!";
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
      return "I have experience in various domains. Let me fetch the latest experience information from my portfolio!";
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
