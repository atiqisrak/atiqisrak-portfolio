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
  experience: any[]
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

  // Check for specific project queries first
  if (queryLower.includes("mave cms") || queryLower.includes("mave-cms")) {
    response = `## Mave CMS - Content Management System

**Mave CMS** is a modern, headless content management system I built using Next.js and TypeScript. Here are the key details:

### What it is:
A flexible content management system designed for developers and content creators who need a modern, fast, and scalable solution.

### Technologies Used:
- **Frontend:** Next.js 13+ with App Router
- **Language:** TypeScript for type safety
- **Styling:** Tailwind CSS for responsive design
- **Database:** PostgreSQL for reliable data storage
- **Authentication:** JWT-based user management
- **API:** RESTful API with OpenAPI documentation

### Key Features:
- **Headless Architecture:** Content and presentation are separated
- **Real-time Updates:** Live content preview and editing
- **Role-based Access:** Different permission levels for users
- **Media Management:** Built-in file upload and organization
- **SEO Optimized:** Meta tags, sitemaps, and structured data
- **Responsive Design:** Works perfectly on all devices

### Why I Built It:
I created Mave CMS to solve the common pain points of traditional CMS platforms - slow performance, complex interfaces, and limited customization options. It's designed to be developer-friendly while remaining accessible to content creators.

This project showcases my expertise in modern web development, database design, and creating user-friendly interfaces.`;
  } else if (
    queryLower.includes("navbot") ||
    queryLower.includes("navbot-ai")
  ) {
    response = `## NavBot AI - AI-Powered Navigation Assistant

**NavBot AI** is an intelligent navigation system I developed that helps users navigate complex applications using natural language.

### What it is:
An AI-powered assistant that understands user intent and provides contextual navigation guidance within applications.

### Technologies Used:
- **Frontend:** React with modern hooks and context
- **Backend:** Node.js with Express
- **AI Integration:** OpenAI API for natural language processing
- **Database:** MongoDB for flexible data storage
- **Real-time:** WebSocket connections for live updates

### Key Features:
- **Natural Language Processing:** Understands user queries in plain English
- **Context Awareness:** Remembers user context and preferences
- **Smart Suggestions:** Proactively offers relevant navigation options
- **Voice Integration:** Supports voice commands and responses
- **Learning Capability:** Improves suggestions based on user behavior

This project demonstrates my skills in AI integration, real-time applications, and creating intuitive user experiences.`;
  } else if (
    queryLower.includes("aranya") ||
    queryLower.includes("ecommerce")
  ) {
    response = `## Aranya E-commerce - Full-Stack E-commerce Platform

**Aranya E-commerce** is a comprehensive online shopping platform I built from the ground up, featuring modern e-commerce functionality.

### What it is:
A complete e-commerce solution with product management, user authentication, payment processing, and order management.

### Technologies Used:
- **Frontend:** Next.js with TypeScript
- **Payment:** Stripe integration for secure transactions
- **Database:** PostgreSQL with optimized queries
- **Styling:** Tailwind CSS for beautiful, responsive design
- **State Management:** React Context and hooks
- **Authentication:** JWT with refresh tokens

### Key Features:
- **Product Catalog:** Advanced filtering and search
- **Shopping Cart:** Persistent cart with real-time updates
- **Secure Payments:** Stripe integration with webhook handling
- **Order Management:** Complete order lifecycle tracking
- **Admin Panel:** Product and order management interface
- **Responsive Design:** Mobile-first approach

This project showcases my full-stack development skills, payment integration expertise, and ability to build scalable e-commerce solutions.`;
  } else if (
    queryLower.includes("uhl") ||
    queryLower.includes("hospital") ||
    queryLower.includes("healthcare")
  ) {
    response = `## UHL - Healthcare Digital Transformation

**UHL Hospital Management System** is a comprehensive healthcare digital transformation project I spearheaded for United Hospital Limited. This wasn't just a technical implementation - it was a complete operational overhaul that transformed how healthcare is delivered.

### The Challenge
The hospital faced critical challenges with patient data management, appointment scheduling, and resource allocation. Manual processes were causing:
- Delays in patient care
- Increased administrative overhead  
- Limited ability to scale operations effectively
- Inefficient resource utilization

### Our Solution
We implemented a comprehensive digital solution focusing on:

**1. Centralized Patient Management System**
- Single source of truth for all patient data
- Real-time access across departments
- HIPAA-compliant data handling

**2. Digital Appointment Scheduling**
- Automated scheduling with conflict detection
- Patient self-service portal
- Integration with doctor availability

**3. Electronic Health Records (EHR)**
- Complete digital patient history
- Secure, encrypted data storage
- Easy access for authorized personnel

**4. Resource Management Dashboard**
- Real-time resource allocation
- Predictive analytics for capacity planning
- Optimization algorithms for efficiency

**5. Mobile Patient Portal**
- Patient self-service capabilities
- Appointment booking and rescheduling
- Medical record access

### Technologies Used
- **Frontend:** React with Material-UI components
- **Backend:** Node.js with Express
- **Database:** PostgreSQL with Redis caching
- **Infrastructure:** Docker containers on AWS
- **Healthcare APIs:** AWS Healthcare APIs integration
- **Security:** HIPAA-compliant infrastructure

### Impact & Results
The transformation delivered measurable results:
- **40% improvement in operational efficiency**
- **60% reduction in appointment scheduling time**
- **90% patient satisfaction with digital services**
- **50% decrease in administrative overhead**
- **30% increase in resource utilization**

### Key Features
- HIPAA-compliant patient management
- Digital appointment scheduling with AI optimization
- Electronic health records with real-time sync
- Resource optimization using predictive analytics
- Mobile patient portal for enhanced accessibility
- Multi-tenant system architecture

### My Role & Approach
As the Product Manager leading this transformation, I:
- Conducted stakeholder requirement analysis
- Implemented HIPAA compliance protocols
- Designed phased deployment strategy
- Led staff training programs
- Established continuous monitoring and optimization

This project demonstrates my ability to build complex enterprise applications with strict security and compliance requirements, while delivering measurable business value and improving patient care outcomes. It's a perfect example of how technology can revolutionize healthcare delivery when implemented with deep understanding of both technical requirements and healthcare workflows.`;
  } else if (
    queryLower.includes("gloria jeans") ||
    queryLower.includes("coffee")
  ) {
    response = `## Gloria Jeans Coffee - Coffee Shop Management

**Gloria Jeans Coffee** is a comprehensive coffee shop management system I developed for restaurant operations.

### What it is:
A complete point-of-sale and management system designed specifically for coffee shops and cafes.

### Technologies Used:
- **Frontend:** Vue.js with modern composition API
- **Backend:** Node.js with Express
- **Database:** MongoDB for flexible menu and order data
- **Real-time:** Socket.io for live order updates
- **Payment:** Multiple payment method integration
- **Mobile:** Responsive design for tablets and phones

### Key Features:
- **Menu Management:** Dynamic menu with categories and pricing
- **Order Processing:** Real-time order tracking and updates
- **Inventory Management:** Ingredient and supply tracking
- **Staff Management:** Employee scheduling and performance
- **Customer Loyalty:** Rewards program and customer database
- **Analytics:** Sales reports and business insights

This project showcases my skills in real-time applications, restaurant management systems, and creating user-friendly interfaces for fast-paced environments.`;
  } else if (
    queryLower.includes("why do you like") ||
    queryLower.includes("why product management") ||
    queryLower.includes("why pm")
  ) {
    response = `## Why I Love Product Management

Great question! Product Management has become my passion for several reasons that align perfectly with who I am:

### The Perfect Blend of Technical and Strategic Thinking
As someone who started as a developer, I love that PM allows me to bridge the gap between technical implementation and business strategy. I can speak both languages fluently - I understand the complexity of building features while also thinking about market fit and user value.

### User-Centric Problem Solving
I'm naturally curious about people and their problems. PM gives me the framework to dig deep into user needs, conduct research, and validate assumptions. There's nothing more satisfying than watching a feature you designed solve a real user pain point.

### Data-Driven Decision Making
I love that PM isn't about gut feelings - it's about gathering evidence, analyzing data, and making informed decisions. Whether it's A/B testing, user analytics, or market research, I get to be a detective uncovering insights that drive product direction.

### Cross-Functional Leadership
I enjoy working with diverse teams - designers, engineers, marketers, sales. PM lets me orchestrate these different perspectives toward a common goal. It's like being a conductor of an orchestra, ensuring everyone plays their part harmoniously.

### Continuous Learning and Adaptation
The tech landscape changes rapidly, and PM keeps me on my toes. I'm constantly learning about new technologies, market trends, and user behaviors. It's intellectually stimulating and keeps me growing professionally.

### Building Products That Matter
At the end of the day, I want to build things that make a difference in people's lives. Whether it's a healthcare system that improves patient care or an e-commerce platform that helps businesses grow, PM gives me the tools to create meaningful impact.

### My PM Philosophy
I believe in "Build, Measure, Learn" - creating minimum viable products, gathering user feedback, and iterating based on data rather than assumptions. This approach resonates with my engineering background and love for systematic problem-solving.

Product Management isn't just a job for me - it's a mindset that combines my technical skills, strategic thinking, and passion for creating value. It's where I feel most alive professionally!`;
  } else if (
    queryLower.includes("hospital management") ||
    queryLower.includes("healthcare experience") ||
    queryLower.includes("medical system") ||
    queryLower.includes("healthcare management")
  ) {
    response = `## My Healthcare & Hospital Management Experience

Absolutely! I have extensive experience in healthcare digital transformation, specifically with the **UHL Hospital Management System** project. This was a comprehensive digital overhaul that transformed how healthcare is delivered.

### The UHL Project - A Complete Healthcare Transformation

**United Hospital Limited** was facing critical operational challenges:
- Manual patient data management causing delays
- Inefficient appointment scheduling processes
- Resource allocation bottlenecks
- Limited scalability for growth

### What We Built
I led the development of a comprehensive healthcare management system that included:

**Patient Management & EHR**
- Centralized patient database with real-time access
- Electronic Health Records (EHR) with HIPAA compliance
- Patient portal for self-service capabilities
- Secure, encrypted data storage

**Operational Efficiency Tools**
- Digital appointment scheduling with AI optimization
- Resource management dashboard with predictive analytics
- Real-time resource allocation algorithms
- Multi-department coordination system

**Technology Stack**
- **Frontend:** React with Material-UI for professional healthcare interface
- **Backend:** Node.js with Express for scalable API development
- **Database:** PostgreSQL with Redis caching for performance
- **Infrastructure:** Docker containers on AWS for reliability
- **Healthcare APIs:** AWS Healthcare APIs integration
- **Security:** Full HIPAA compliance implementation

### Measurable Impact
The transformation delivered significant results:
- **40% improvement in operational efficiency**
- **60% reduction in appointment scheduling time**
- **90% patient satisfaction with digital services**
- **50% decrease in administrative overhead**
- **30% increase in resource utilization**

### My Role as Product Manager
I wasn't just overseeing development - I was deeply involved in:
- Stakeholder requirement analysis with healthcare professionals
- HIPAA compliance implementation and audit preparation
- Phased deployment strategy to minimize disruption
- Staff training programs for smooth adoption
- Continuous monitoring and optimization post-launch

### Why This Experience Matters
This project taught me the critical importance of:
- **User-Centric Design in Healthcare:** Understanding the workflows of doctors, nurses, and administrators
- **Compliance & Security:** Building systems that meet strict healthcare regulations
- **Change Management:** Helping healthcare staff adapt to new digital tools
- **Scalability:** Designing systems that can grow with healthcare organizations

This experience gives me unique insights into how technology can revolutionize healthcare delivery when implemented with deep understanding of both technical requirements and healthcare workflows. It's a perfect example of my ability to bridge technical expertise with real-world healthcare needs.`;
  } else if (
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
          response += `**Technologies:** ${project.technologies.join(", ")}\n`;
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
          response += `**Technologies:** ${project.technologies.join(", ")}\n`;
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
            project.technologies.forEach((tech: string) => allTechs.add(tech));
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
  } else if (
    queryLower.includes("journey") ||
    queryLower.includes("pm") ||
    queryLower.includes("product manager")
  ) {
    response = `## My Journey as a Product Manager

My journey as a Product Manager has been an exciting evolution from technical development to strategic product leadership. Here's my story:

### The Transition
I started as a **Full Stack Developer** building applications and solving technical challenges. Over time, I realized that the most impactful solutions come from understanding user needs, business goals, and market dynamics - not just technical implementation.

### Key Learnings as a PM
- **User-Centric Thinking:** Always start with the user's problem, not the solution
- **Data-Driven Decisions:** Use analytics and user feedback to guide product direction
- **Cross-Functional Leadership:** Success depends on aligning engineering, design, and business teams
- **Strategic Vision:** Balance short-term wins with long-term product strategy

### My PM Philosophy
I believe in **"Build, Measure, Learn"** - creating minimum viable products, gathering user feedback, and iterating based on real data rather than assumptions.

### Technical PM Advantage
Having a strong technical background gives me unique advantages:
- **Better Communication:** I can bridge the gap between business requirements and technical implementation
- **Realistic Planning:** I understand development complexity and can set realistic timelines
- **Quality Focus:** I can identify technical debt and prioritize technical improvements
- **Innovation:** I can evaluate new technologies and their impact on product strategy

### What I've Built
As a PM, I've led the development of:
- **Healthcare Management Systems** that improve patient care workflows
- **E-commerce Platforms** that drive business growth
- **AI-Powered Tools** that enhance user productivity
- **Enterprise Solutions** that streamline business operations

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

    response +=
      "You can ask me about:\n• My specific projects (like Mave CMS, NavBot AI, Aranya E-commerce)\n• Skills and technologies\n• Work experience\n• My journey as a Product Manager\n• Why I love Product Management\n• Development approach\n• Any particular technology or framework";
  }

  return response;
};
