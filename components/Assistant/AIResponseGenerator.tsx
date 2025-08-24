import api from "@/lib/api";

export interface AIResponseGeneratorProps {
  query: string;
  projects: any[];
  skills: any[];
  experience: any[];
}

export const generateIntelligentResponse = async (
  query: string,
  projects: any[],
  skills: any[],
  experience: any[]
): Promise<string> => {
  try {
    // Use the backend knowledge base service for focused responses
    const response = await api.post(
      "/portfolio/knowledge/contextual-response",
      {
        query: query,
      }
    );

    return response.data.response;
  } catch (error) {
    console.error("Error getting focused response:", error);

    // Fallback to focused response based on query type
    const queryLower = query.toLowerCase();
    let response = "";

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
  }
};
