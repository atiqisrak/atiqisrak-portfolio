"use client";

import React, { useState, useRef, useEffect } from "react";
import MessageList from "@/components/Assistant/MessageList";
import ChatInput from "@/components/Assistant/ChatInput";
import api from "@/lib/api";
import {
  Message,
  Project,
  Skill,
  Experience,
  SearchResponse,
} from "@/types/chat";

const AIPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hi! I'm Atiq Israk, your AI portfolio assistant. I can help you learn about my projects, skills, and experience. What would you like to know?",
      role: "assistant",
      timestamp: new Date("2024-01-01T00:00:00Z"),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateIntelligentResponse = (
    query: string,
    projects: any[],
    skills: any[],
    experience: any[]
  ) => {
    let response = "";

    // Analyze the query and provide contextual responses
    const queryLower = query.toLowerCase();

    if (
      queryLower.includes("what do you know") ||
      queryLower.includes("tell me about") ||
      queryLower.includes("introduce")
    ) {
      response =
        "I'm **Atiq Israk**, a full-stack developer and software engineer. Here's what I can tell you about:\n\n";

      if (projects.length > 0) {
        response += "## My Projects\n\n";
        projects.forEach((project: any) => {
          response += `### ${project.title}\n`;
          response += `${project.description}\n`;
          if (project.technologies && project.technologies.length > 0) {
            response += `**Technologies:** ${project.technologies.join(
              ", "
            )}\n`;
          }
          if (project.github_url) {
            response += `**GitHub:** ${project.github_url}\n`;
          }
          response += "\n";
        });
      }

      if (skills.length > 0) {
        response += "## My Skills\n\n";
        const categories = Array.from(
          new Set(skills.map((s: any) => s.category))
        );
        categories.forEach((category) => {
          const categorySkills = skills.filter(
            (s: any) => s.category === category
          );
          // Remove duplicates by name
          const uniqueSkills = Array.from(
            new Map(categorySkills.map((s) => [s.name, s])).values()
          );
          response += `### ${category}\n`;
          uniqueSkills.forEach((s: any) => {
            response += `• ${s.name}\n`;
          });
          response += "\n";
        });
      }

      if (experience.length > 0) {
        response += "## My Experience\n\n";
        experience.slice(0, 3).forEach((exp: any) => {
          const title = exp.title || exp.role || "Software Engineer";
          const company = exp.company || "Company";
          response += `### ${title} at ${company}\n`;
        });
      }

      response +=
        "\nFeel free to ask me about any specific project, technology, or experience!";
    } else if (queryLower.includes("project") || queryLower.includes("work")) {
      if (projects.length > 0) {
        response = "## My Projects\n\n";
        projects.forEach((project: any) => {
          response += `### ${project.title}\n`;
          response += `${project.description}\n`;
          if (project.technologies && project.technologies.length > 0) {
            response += `**Technologies:** ${project.technologies.join(
              ", "
            )}\n`;
          }
          if (project.github_url) {
            response += `**GitHub:** ${project.github_url}\n`;
          }
          response += "\n";
        });
      } else {
        response =
          "I'm currently working on several exciting projects. Would you like me to tell you more about my development approach or specific technologies I use?";
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
        categories.forEach((category) => {
          const categorySkills = skills.filter(
            (s: any) => s.category === category
          );
          // Remove duplicates by name
          const uniqueSkills = Array.from(
            new Map(categorySkills.map((s) => [s.name, s])).values()
          );
          response += `### ${category}\n`;
          uniqueSkills.forEach((skill: any) => {
            response += `• ${skill.name}\n`;
          });
          response += "\n";
        });

        // Add project-based technology insights
        if (projects.length > 0) {
          response += "## Technologies from My Projects\n\n";
          const allTechs = new Set();
          projects.forEach((project) => {
            if (project.technologies) {
              project.technologies.forEach((tech: string) =>
                allTechs.add(tech)
              );
            }
          });
          const uniqueTechs = Array.from(allTechs);
          response += `**${uniqueTechs.join(", ")}**\n\n`;
        }

        response +=
          "I'm constantly learning and expanding my skill set. What specific area would you like to know more about?";
      } else {
        response =
          "I work with a variety of modern technologies including React, Node.js, Python, and cloud platforms. What specific area interests you?";
      }
    } else if (
      queryLower.includes("experience") ||
      queryLower.includes("work history")
    ) {
      if (experience.length > 0) {
        response = "## My Professional Experience\n\n";
        experience.forEach((exp: any) => {
          const title = exp.title || exp.role || "Software Engineer";
          const company = exp.company || "Company";
          const duration = exp.duration || exp.period || "Current";
          const description =
            exp.description ||
            exp.summary ||
            "Full-stack development and product management";

          response += `### ${title} at ${company}\n`;
          if (duration && duration !== "Current") {
            response += `**Duration:** ${duration}\n`;
          }
          response += `${description}\n\n`;
        });

        // Add summary if we have multiple experiences
        if (experience.length > 1) {
          response += `I have **${experience.length} years** of experience in software development, product management, and digital transformation. `;
          response +=
            "My expertise spans from frontend development to AI/ML projects and enterprise solutions.\n\n";
        }
      } else {
        response = "## My Project-Based Experience\n\n";
        if (projects.length > 0) {
          response += "Based on my projects, I have experience in:\n\n";
          projects.slice(0, 3).forEach((project: any) => {
            response += `### ${project.title}\n`;
            response += `${project.description}\n`;
            if (project.technologies && project.technologies.length > 0) {
              response += `**Technologies:** ${project.technologies.join(
                ", "
              )}\n`;
            }
            response += "\n";
          });
        }
        response +=
          "I'm passionate about building scalable solutions and continuously learning new technologies.";
      }
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

      response +=
        "You can ask me about:\n• My specific projects\n• Skills and technologies\n• Work experience\n• Development approach\n• Any particular technology or framework";
    }

    return response;
  };

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      let projects: any[] = [];
      let skills: any[] = [];
      let experience: any[] = [];

      // Vector search for relevant projects
      try {
        const searchResponse = await api.post("/portfolio/projects/search", {
          query: content,
          limit: 5,
          threshold: 0.5,
        });

        // Handle the actual API response structure (array directly)
        if (Array.isArray(searchResponse.data)) {
          projects = searchResponse.data;
        } else if (searchResponse.data.projects) {
          projects = searchResponse.data.projects;
        }
      } catch (searchError) {
        console.log("Vector search not available");
      }

      // Get skills
      try {
        const skillsResponse = await api.get("/portfolio/skills");
        if (skillsResponse.data && Array.isArray(skillsResponse.data)) {
          // Remove duplicates by name and category
          const uniqueSkillsMap = new Map();
          skillsResponse.data.forEach((skill: any) => {
            const key = `${skill.name}-${skill.category}`;
            if (!uniqueSkillsMap.has(key)) {
              uniqueSkillsMap.set(key, skill);
            }
          });
          skills = Array.from(uniqueSkillsMap.values());
        } else if (skillsResponse.data.skills) {
          // Remove duplicates by name and category
          const uniqueSkillsMap = new Map();
          skillsResponse.data.skills.forEach((skill: any) => {
            const key = `${skill.name}-${skill.category}`;
            if (!uniqueSkillsMap.has(key)) {
              uniqueSkillsMap.set(key, skill);
            }
          });
          skills = Array.from(uniqueSkillsMap.values());
        }
      } catch (skillsError) {
        console.log("Skills endpoint not available");
      }

      // Get experience
      try {
        const experienceResponse = await api.get("/portfolio/experience");
        if (experienceResponse.data && Array.isArray(experienceResponse.data)) {
          // Remove duplicates by company and role
          const uniqueExpMap = new Map();
          experienceResponse.data.forEach((exp: any) => {
            const key = `${exp.company}-${exp.title || exp.role}`;
            if (!uniqueExpMap.has(key)) {
              uniqueExpMap.set(key, exp);
            }
          });
          experience = Array.from(uniqueExpMap.values());
          console.log("Experience data:", experience); // Debug log
        } else if (experienceResponse.data.experience) {
          // Remove duplicates by company and role
          const uniqueExpMap = new Map();
          experienceResponse.data.experience.forEach((exp: any) => {
            const key = `${exp.company}-${exp.title || exp.role}`;
            if (!uniqueExpMap.has(key)) {
              uniqueExpMap.set(key, exp);
            }
          });
          experience = Array.from(uniqueExpMap.values());
          console.log("Experience data:", experience); // Debug log
        }
      } catch (experienceError) {
        console.log("Experience endpoint not available");
      }

      // Generate intelligent response
      const responseContent = generateIntelligentResponse(
        content,
        projects,
        skills,
        experience
      );

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responseContent,
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error processing message:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "I'm sorry, I encountered an error while processing your request. Please try again.",
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">
              Atiq Israk - AI Portfolio Assistant
            </h1>
            <p className="text-blue-100 mt-1">
              Ask me anything about my projects, skills, and experience
            </p>
          </div>

          <div className="flex flex-col h-96">
            <MessageList messages={messages} />
            <div ref={messagesEndRef} />
          </div>

          <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default AIPage;
