import express from 'express';
import { PortfolioService } from '../services/portfolioService';

const router: express.Router = express.Router();  

// Get portfolio summary
router.get('/summary', async (req, res) => {
  try {
    const summary = await PortfolioService.getPortfolioSummary();
    res.json(summary);
  } catch (error) {
    console.error('Error fetching portfolio summary:', error);
    res.status(500).json({ error: 'Failed to fetch portfolio summary' });
  }
});

// Portfolio Sections
router.get('/sections', async (req, res) => {
  try {
    const sections = await PortfolioService.getPortfolioSections();
    res.json(sections);
  } catch (error) {
    console.error('Error fetching portfolio sections:', error);
    res.status(500).json({ error: 'Failed to fetch portfolio sections' });
  }
});

router.get('/sections/:name', async (req, res) => {
  try {
    const section = await PortfolioService.getPortfolioSection(req.params.name);
    if (!section) {
      return res.status(404).json({ error: 'Section not found' });
    }
    return res.json(section);
  } catch (error) {
    console.error('Error fetching portfolio section:', error);
    return res.status(500).json({ error: 'Failed to fetch portfolio section' });
  }
});

// Personal Info
router.get('/personal-info', async (req, res) => {
  try {
    const personalInfo = await PortfolioService.getPersonalInfo();
    if (!personalInfo) {
      return res.status(404).json({ error: 'Personal info not found' });
    }
    return res.json(personalInfo);
  } catch (error) {
    console.error('Error fetching personal info:', error);
    return res.status(500).json({ error: 'Failed to fetch personal info' });
  }
});

// Skills
router.get('/skills', async (req, res) => {
  try {
    const skills = await PortfolioService.getAllSkills();
    res.json(skills);
  } catch (error) {
    console.error('Error fetching skills:', error);
    res.status(500).json({ error: 'Failed to fetch skills' });
  }
});

router.get('/skills/category/:category', async (req, res) => {
  try {
    const skills = await PortfolioService.getSkillsByCategory(req.params.category);
    res.json(skills);
  } catch (error) {
    console.error('Error fetching skills by category:', error);
    res.status(500).json({ error: 'Failed to fetch skills by category' });
  }
});

router.post('/skills/search', async (req, res) => {
  try {
    const { query, limit = 5, threshold = 0.7 } = req.body;
    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }
    
    const skills = await PortfolioService.searchSkills(query, limit, threshold);
    return res.json(skills);
  } catch (error) {
    console.error('Error searching skills:', error);
    return res.status(500).json({ error: 'Failed to search skills' });
  }
});

// Experience
router.get('/experience', async (req, res) => {
  try {
    const experience = await PortfolioService.getAllExperience();
    return res.json(experience);
  } catch (error) {
    console.error('Error fetching experience:', error);
    return res.status(500).json({ error: 'Failed to fetch experience' });
  }
});

router.get('/experience/:id', async (req, res) => {
  try {
    const experience = await PortfolioService.getExperienceById(parseInt(req.params.id));
    if (!experience) {
      return res.status(404).json({ error: 'Experience not found' });
    }
    return res.json(experience);
  } catch (error) {
    console.error('Error fetching experience:', error);
    return res.status(500).json({ error: 'Failed to fetch experience' });
  }
});

router.post('/experience/search', async (req, res) => {
  try {
    const { query, limit = 5, threshold = 0.7 } = req.body;
    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }
    
    const experience = await PortfolioService.searchExperience(query, limit, threshold);
    return res.json(experience);
  } catch (error) {
    console.error('Error searching experience:', error);
    return res.status(500).json({ error: 'Failed to search experience' });
  }
});

// Education
router.get('/education', async (req, res) => {
  try {
    const education = await PortfolioService.getAllEducation();
    res.json(education);
  } catch (error) {
    console.error('Error fetching education:', error);
    res.status(500).json({ error: 'Failed to fetch education' });
  }
});

// Certifications
router.get('/certifications', async (req, res) => {
  try {
    const certifications = await PortfolioService.getAllCertifications();
    res.json(certifications);
  } catch (error) {
    console.error('Error fetching certifications:', error);
    res.status(500).json({ error: 'Failed to fetch certifications' });
  }
});

// Achievements
router.get('/achievements', async (req, res) => {
  try {
    const achievements = await PortfolioService.getAllAchievements();
    res.json(achievements);
  } catch (error) {
    console.error('Error fetching achievements:', error);
    res.status(500).json({ error: 'Failed to fetch achievements' });
  }
});

// Expertise
router.get('/expertise', async (req, res) => {
  try {
    const expertise = await PortfolioService.getAllExpertise();
    res.json(expertise);
  } catch (error) {
    console.error('Error fetching expertise:', error);
    res.status(500).json({ error: 'Failed to fetch expertise' });
  }
});

// Methodologies
router.get('/methodologies', async (req, res) => {
  try {
    const methodologies = await PortfolioService.getAllMethodologies();
    res.json(methodologies);
  } catch (error) {
    console.error('Error fetching methodologies:', error);
    res.status(500).json({ error: 'Failed to fetch methodologies' });
  }
});

// AI Training
router.get('/ai-training', async (req, res) => {
  try {
    const aiTraining = await PortfolioService.getAllAITraining();
    res.json(aiTraining);
  } catch (error) {
    console.error('Error fetching AI training:', error);
    res.status(500).json({ error: 'Failed to fetch AI training' });
  }
});

// Projects
router.get('/projects', async (req, res) => {
  try {
    const projects = await PortfolioService.getAllProjects();
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

router.get('/projects/:id', async (req, res) => {
  try {
    const project = await PortfolioService.getProjectById(parseInt(req.params.id));
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    return res.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    return res.status(500).json({ error: 'Failed to fetch project' });
  }
});

router.get('/projects/slug/:slug', async (req, res) => {
  try {
    const project = await PortfolioService.getProjectBySlug(req.params.slug);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    return res.json(project);
  } catch (error) {
    console.error('Error fetching project by slug:', error);
    return res.status(500).json({ error: 'Failed to fetch project by slug' });
  }
});

router.get('/projects/featured/:limit?', async (req, res) => {
  try {
    const limit = req.params.limit ? parseInt(req.params.limit) : 6;
    const projects = await PortfolioService.getFeaturedProjects(limit);
    res.json(projects);
  } catch (error) {
    console.error('Error fetching featured projects:', error);
    res.status(500).json({ error: 'Failed to fetch featured projects' });
  }
});

router.post('/projects/search', async (req, res) => {
  try {
    const { query, limit = 5, threshold = 0.7 } = req.body;
    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }
    
    const projects = await PortfolioService.searchProjects(query, limit, threshold);
    return res.json(projects);
  } catch (error) {
    console.error('Error searching projects:', error);
    return res.status(500).json({ error: 'Failed to search projects' });
  }
});

router.get('/projects/technology/:technology', async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const projects = await PortfolioService.getProjectsByTechnology(req.params.technology, limit);
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects by technology:', error);
    res.status(500).json({ error: 'Failed to fetch projects by technology' });
  }
});

router.get('/projects/category/:category', async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
    const projects = await PortfolioService.getProjectsByCategory(req.params.category, limit);
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects by category:', error);
    res.status(500).json({ error: 'Failed to fetch projects by category' });
  }
});

// Comprehensive Search
router.post('/search', async (req, res) => {
  try {
    const { query, limit = 10, threshold = 0.7 } = req.body;
    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }
    
    const results = await PortfolioService.comprehensiveSearch(query, limit, threshold);
    return res.json(results);
  } catch (error) {
    console.error('Error performing comprehensive search:', error);
    return res.status(500).json({ error: 'Failed to perform comprehensive search' });
  }
});

export default router;
