import fs from "fs";
import path from "path";
import {
  seedPersonalInfo,
  seedSkills,
  seedExperience,
  seedEducation,
  seedCertifications,
  seedAchievements,
  seedExpertise,
  seedMethodologies,
  seedAITraining,
  seedProject,
  seedPortfolioSections
} from "./seeders";

async function seed() {
  try {
    console.log("Starting comprehensive database seeding...");

    // Read all JSON files from knowledgebase
    const knowledgebasePath = path.join(__dirname, '../../knowledgebase');
    
    // Seed personal info
    const personalInfoPath = path.join(knowledgebasePath, 'personal-info.json');
    if (fs.existsSync(personalInfoPath)) {
      const personalInfoData = JSON.parse(fs.readFileSync(personalInfoPath, 'utf8'));
      await seedPersonalInfo(personalInfoData);
    }

    // Seed skills
    const skillsPath = path.join(knowledgebasePath, 'skills.json');
    if (fs.existsSync(skillsPath)) {
      const skillsData = JSON.parse(fs.readFileSync(skillsPath, 'utf8'));
      await seedSkills(skillsData);
    }

    // Seed experience
    const experiencePath = path.join(knowledgebasePath, 'experience.json');
    if (fs.existsSync(experiencePath)) {
      const experienceData = JSON.parse(fs.readFileSync(experiencePath, 'utf8'));
      await seedExperience(experienceData.workHistory || experienceData);
    }

    // Seed education
    const educationPath = path.join(knowledgebasePath, 'education.json');
    if (fs.existsSync(educationPath)) {
      const educationData = JSON.parse(fs.readFileSync(educationPath, 'utf8'));
      await seedEducation(educationData.degrees || educationData);
    }

    // Seed certifications
    const certificationsPath = path.join(knowledgebasePath, 'certifications.json');
    if (fs.existsSync(certificationsPath)) {
      const certificationsData = JSON.parse(fs.readFileSync(certificationsPath, 'utf8'));
      await seedCertifications(certificationsData);
    }

    // Seed achievements
    const achievementsPath = path.join(knowledgebasePath, 'achievements.json');
    if (fs.existsSync(achievementsPath)) {
      const achievementsData = JSON.parse(fs.readFileSync(achievementsPath, 'utf8'));
      // Transform achievements data structure
      const transformedAchievements = [
        {
          title: "Template System Success",
          description: "High-performance web template system achievements",
          category: "Web Development",
          impact: "Global recognition and high user satisfaction",
          metrics: achievementsData.metrics || []
        },
        {
          title: "Professional Recognition",
          description: "Industry recognition and expertise validation",
          category: "Professional Development",
          impact: "Established expertise in key areas",
          metrics: achievementsData.recognition || []
        }
      ];
      await seedAchievements(transformedAchievements);
    }

    // Seed expertise
    const expertisePath = path.join(knowledgebasePath, 'expertise.json');
    if (fs.existsSync(expertisePath)) {
      const expertiseData = JSON.parse(fs.readFileSync(expertisePath, 'utf8'));
      // Transform expertise data structure
      const transformedExpertise = [
        {
          domain: "Healthcare Technology",
          description: "Digital transformation and management systems",
          years_experience: 3,
          key_projects: ["uhl"],
          methodologies: ["Agile", "HIPAA Compliance", "User-Centered Design"],
          technologies: ["React", "Node.js", "PostgreSQL", "AWS"]
        },
        {
          domain: "E-commerce Solutions",
          description: "Digital transformation and optimization",
          years_experience: 4,
          key_projects: ["aranya", "gloria-jeans"],
          methodologies: ["Mobile-First", "Performance Optimization", "User Experience Design"],
          technologies: ["Next.js", "React", "Node.js", "PostgreSQL"]
        },
        {
          domain: "AI/ML Integration",
          description: "AI-powered applications and machine learning",
          years_experience: 2,
          key_projects: ["navbot", "mave-lms"],
          methodologies: ["AI Model Training", "Iterative Development", "Performance Monitoring"],
          technologies: ["Python", "TensorFlow", "OpenAI API", "Node.js"]
        }
      ];
      await seedExpertise(transformedExpertise);
    }

    // Seed methodologies
    const methodologiesPath = path.join(knowledgebasePath, 'methodologies.json');
    if (fs.existsSync(methodologiesPath)) {
      const methodologiesData = JSON.parse(fs.readFileSync(methodologiesPath, 'utf8'));
      // Transform methodologies data structure
      const transformedMethodologies = [
        {
          name: "Agile Development",
          description: "Iterative development with continuous feedback",
          category: "development",
          use_cases: ["Project management", "Team collaboration", "Rapid iteration"],
          benefits: ["Faster delivery", "Better quality", "Customer satisfaction"],
          implementation_steps: ["Sprint planning", "Daily standups", "Retrospectives"]
        },
        {
          name: "User-Centered Design",
          description: "Design focused on user needs and experience",
          category: "design",
          use_cases: ["Product design", "Interface optimization", "User research"],
          benefits: ["Better usability", "Higher adoption", "User satisfaction"],
          implementation_steps: ["User research", "Prototyping", "Testing"]
        },
        {
          name: "Performance Optimization",
          description: "Systematic approach to improving application performance",
          category: "design",
          use_cases: ["Web applications", "Mobile apps", "Backend systems"],
          benefits: ["Faster loading", "Better user experience", "Reduced costs"],
          implementation_steps: ["Performance audit", "Optimization", "Monitoring"]
        }
      ];
      await seedMethodologies(transformedMethodologies);
    }

    // Seed AI training
    const aiTrainingPath = path.join(knowledgebasePath, 'ai-training.json');
    if (fs.existsSync(aiTrainingPath)) {
      const aiTrainingData = JSON.parse(fs.readFileSync(aiTrainingPath, 'utf8'));
      // Transform AI training data structure
      const transformedAITraining = [
        {
          model_name: "Portfolio AI Assistant",
          purpose: "Provide accurate portfolio information and responses",
          training_data: [
            "Project details and technical implementations",
            "Skill proficiency and experience levels",
            "Business impact and measurable outcomes"
          ],
          performance_metrics: {
            "response_accuracy": "95%",
            "response_time": "<2s",
            "user_satisfaction": "90%"
          },
          use_cases: [
            "Portfolio queries",
            "Technical skill assessment",
            "Project information retrieval"
          ]
        }
      ];
      await seedAITraining(transformedAITraining);
    }

    // Seed projects
    const projectsDir = path.join(knowledgebasePath, 'projects');
    if (fs.existsSync(projectsDir)) {
      const projectFiles = fs.readdirSync(projectsDir).filter(file => file.endsWith('.json'));
      for (const projectFile of projectFiles) {
        const projectPath = path.join(projectsDir, projectFile);
        const projectData = JSON.parse(fs.readFileSync(projectPath, 'utf8'));
        await seedProject(projectData);
      }
    }

    // Seed portfolio sections
    await seedPortfolioSections();

    console.log("Comprehensive seeding completed successfully!");
  } catch (error) {
    console.error("Seeding failed:", error);
    throw error;
  }
}

seed().catch(console.error);