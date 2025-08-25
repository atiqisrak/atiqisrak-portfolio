import api from "@/lib/api";
import { AIResponseGeneratorProps } from "./types";
import { createPersonalityPrompt } from "./prompts";
import {
  handleSimpleQuestions,
  handleFollowUpQuestions,
  handleProjectQueries,
  handleSpecificTopics,
  handleGeneralQueries,
} from "./responseHandlers";

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

  // Handle simple questions first
  const simpleResponse = handleSimpleQuestions(queryLower);
  if (simpleResponse) return simpleResponse;

  // Handle follow-up questions if chat history exists
  if (chatHistory) {
    const followUpResponse = handleFollowUpQuestions(queryLower, chatHistory);
    if (followUpResponse) return followUpResponse;
  }

  // Handle project-specific queries
  const projectResponse = handleProjectQueries(queryLower);
  if (projectResponse) return projectResponse;

  // Handle specific topics
  const topicResponse = handleSpecificTopics(queryLower);
  if (topicResponse) return topicResponse;

  // Handle general queries
  return handleGeneralQueries(queryLower, projects, skills, experience);
};
