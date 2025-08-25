export { generateIntelligentResponse } from './AIResponseGenerator';
export type { AIResponseGeneratorProps, Project, Skill, Experience } from './types';
export { createPersonalityPrompt } from './prompts';
export {
  handleSimpleQuestions,
  handleFollowUpQuestions,
  handleProjectQueries,
  handleSpecificTopics,
  handleGeneralQueries,
} from './responseHandlers';
