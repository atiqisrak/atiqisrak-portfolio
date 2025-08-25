import api from "@/lib/api";

export interface AIDataFetcherResult {
  projects: any[];
  skills: any[];
  experience: any[];
}

// Fallback data from static knowledge base files
const fallbackData = {
  projects: [
    {
      id: "mave-cms",
      title: "Mave CMS",
      description:
        "A modern content management system built with Next.js and TypeScript",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
      category: "Web Development",
      featured: true,
      slug: "mave-cms",
    },
    {
      id: "navbot-ai",
      title: "NavBot AI",
      description: "AI-powered navigation assistant for complex applications",
      technologies: ["React", "Node.js", "OpenAI API", "MongoDB"],
      category: "AI/ML",
      featured: true,
      slug: "navbot-ai",
    },
    {
      id: "aranya-ecommerce",
      title: "Aranya E-commerce",
      description: "Full-stack e-commerce platform with modern UI/UX",
      technologies: ["Next.js", "Stripe", "PostgreSQL", "Tailwind CSS"],
      category: "E-commerce",
      featured: true,
      slug: "aranya-ecommerce",
    },
    {
      id: "uhl",
      title: "UHL - Healthcare Digital Transformation",
      description:
        "Spearheaded the digital transformation of United Hospital Limited's healthcare management system, implementing modern digital solutions to enhance patient care and operational efficiency.",
      technologies: [
        "React",
        "Node.js",
        "PostgreSQL",
        "Redis",
        "Docker",
        "AWS Healthcare APIs",
      ],
      category: "Healthcare",
      featured: true,
      slug: "uhl",
      challenge:
        "The hospital faced critical challenges with patient data management, appointment scheduling, and resource allocation. Manual processes were causing delays in patient care, increasing administrative overhead, and limiting the hospital's ability to scale operations effectively.",
      solution:
        "We implemented a comprehensive digital solution focusing on: Centralized Patient Management System, Digital Appointment Scheduling, Electronic Health Records (EHR), Resource Management Dashboard, Mobile Patient Portal",
      impact: [
        "40% improvement in operational efficiency",
        "60% reduction in appointment scheduling time",
        "90% patient satisfaction with digital services",
        "50% decrease in administrative overhead",
        "30% increase in resource utilization",
      ],
      keyFeatures: [
        "HIPAA-compliant patient management",
        "Digital appointment scheduling",
        "Electronic health records",
        "Resource optimization",
        "Mobile patient portal",
      ],
    },
    {
      id: "gloria-jeans",
      title: "Gloria Jeans Coffee",
      description: "Coffee shop management and ordering system",
      technologies: ["Vue.js", "Node.js", "MongoDB", "Socket.io"],
      category: "Food & Beverage",
      featured: true,
      slug: "gloria-jeans",
    },
  ],
  skills: [
    { name: "React", category: "Frontend", proficiency: 95 },
    { name: "Next.js", category: "Frontend", proficiency: 90 },
    { name: "TypeScript", category: "Frontend", proficiency: 88 },
    { name: "Node.js", category: "Backend", proficiency: 85 },
    { name: "PostgreSQL", category: "Database", proficiency: 80 },
    { name: "MongoDB", category: "Database", proficiency: 75 },
    { name: "Python", category: "Programming", proficiency: 85 },
    { name: "Machine Learning", category: "AI/ML", proficiency: 80 },
    { name: "Docker", category: "DevOps", proficiency: 75 },
    { name: "AWS", category: "Cloud", proficiency: 70 },
    { name: "Healthcare APIs", category: "Healthcare", proficiency: 85 },
    { name: "HIPAA Compliance", category: "Healthcare", proficiency: 90 },
  ],
  experience: [
    {
      company: "TechCare Solutions",
      title: "Senior Full Stack Developer",
      role: "Lead developer for healthcare applications",
      duration: "2023 - Present",
      description: "Leading development of healthcare management systems",
    },
    {
      company: "Digital Innovations Ltd",
      title: "Product Manager",
      role: "Product strategy and development",
      duration: "2022 - 2023",
      description: "Managed product lifecycle and development teams",
    },
    {
      company: "Startup Ventures",
      title: "Full Stack Developer",
      role: "Web application development",
      duration: "2021 - 2022",
      description: "Built scalable web applications using modern technologies",
    },
  ],
};

export const fetchAIData = async (
  query: string
): Promise<AIDataFetcherResult> => {
  let projects: any[] = [];
  let skills: any[] = [];
  let experience: any[] = [];

  // Try to fetch from API first
  try {
    // Vector search for relevant projects
    const searchResponse = await api.post("/portfolio/projects/search", {
      query: query,
      limit: 5,
      threshold: 0.5,
    });

    if (Array.isArray(searchResponse.data)) {
      projects = searchResponse.data;
    } else if (searchResponse.data.projects) {
      projects = searchResponse.data.projects;
    }
  } catch (searchError) {
    console.log("Vector search not available, using fallback data");
  }

  // Get skills from API
  try {
    const skillsResponse = await api.get("/portfolio/skills");
    if (skillsResponse.data && Array.isArray(skillsResponse.data)) {
      const uniqueSkillsMap = new Map();
      skillsResponse.data.forEach((skill: any) => {
        const key = `${skill.name}-${skill.category}`;
        if (!uniqueSkillsMap.has(key)) {
          uniqueSkillsMap.set(key, skill);
        }
      });
      skills = Array.from(uniqueSkillsMap.values());
    } else if (skillsResponse.data.skills) {
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
    console.log("Skills endpoint not available, using fallback data");
  }

  // Get experience from API
  try {
    const experienceResponse = await api.get("/portfolio/experience");
    if (experienceResponse.data && Array.isArray(experienceResponse.data)) {
      const uniqueExpMap = new Map();
      experienceResponse.data.forEach((exp: any) => {
        const key = `${exp.company}-${exp.title || exp.role}`;
        if (!uniqueExpMap.has(key)) {
          uniqueExpMap.set(key, exp);
        }
      });
      experience = Array.from(uniqueExpMap.values());
    } else if (experienceResponse.data.experience) {
      const uniqueExpMap = new Map();
      experienceResponse.data.experience.forEach((exp: any) => {
        const key = `${exp.company}-${exp.title || exp.role}`;
        if (!uniqueExpMap.has(key)) {
          uniqueExpMap.set(key, exp);
        }
      });
      experience = Array.from(uniqueExpMap.values());
    }
  } catch (experienceError) {
    console.log("Experience endpoint not available, using fallback data");
  }

  // Use fallback data if API calls failed
  if (projects.length === 0) {
    projects = fallbackData.projects;
  }
  if (skills.length === 0) {
    skills = fallbackData.skills;
  }
  if (experience.length === 0) {
    experience = fallbackData.experience;
  }

  return { projects, skills, experience };
};
