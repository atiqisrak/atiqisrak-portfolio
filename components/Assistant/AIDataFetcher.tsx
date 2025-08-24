import api from "@/lib/api";

export interface AIDataFetcherResult {
  projects: any[];
  skills: any[];
  experience: any[];
}

export const fetchAIData = async (
  query: string
): Promise<AIDataFetcherResult> => {
  let projects: any[] = [];
  let skills: any[] = [];
  let experience: any[] = [];

  // Vector search for relevant projects
  try {
    const searchResponse = await api.post("/portfolio/projects/search", {
      query: query,
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

  return { projects, skills, experience };
};
