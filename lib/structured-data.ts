export interface ArticleSchema {
  "@context": string;
  "@type": "Article";
  headline: string;
  description: string;
  author: {
    "@type": "Person";
    name: string;
    url: string;
  };
  publisher: {
    "@type": "Organization";
    name: string;
    logo: {
      "@type": "ImageObject";
      url: string;
    };
  };
  datePublished: string;
  dateModified: string;
  image: string;
  url: string;
  mainEntityOfPage: {
    "@type": "WebPage";
    "@id": string;
  };
  keywords: string[];
  articleSection: string;
}

export interface OrganizationSchema {
  "@context": string;
  "@type": "Organization";
  name: string;
  url: string;
  logo: string;
  description: string;
  founder: {
    "@type": "Person";
    name: string;
  };
  sameAs: string[];
  contactPoint: {
    "@type": "ContactPoint";
    contactType: string;
    email: string;
  };
}

export interface FAQSchema {
  "@context": string;
  "@type": "FAQPage";
  mainEntity: Array<{
    "@type": "Question";
    name: string;
    acceptedAnswer: {
      "@type": "Answer";
      text: string;
    };
  }>;
}

export interface ProjectSchema {
  "@context": string;
  "@type": "CreativeWork";
  name: string;
  description: string;
  url: string;
  image: string;
  author: {
    "@type": "Person";
    name: string;
  };
  creator: {
    "@type": "Person";
    name: string;
  };
  keywords: string[];
  datePublished: string;
  publisher: {
    "@type": "Organization";
    name: string;
  };
  about: string[];
  technologiesUsed: string[];
}

export interface BreadcrumbSchema {
  "@context": string;
  "@type": "BreadcrumbList";
  itemListElement: Array<{
    "@type": "ListItem";
    position: number;
    name: string;
    item: string;
  }>;
}

export function generateArticleSchema(article: {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  image: string;
  slug: string;
  tags: string[];
}): ArticleSchema {
  const baseUrl = "https://atiqisrak.vercel.app";
  
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    author: {
      "@type": "Person",
      name: "Atiq Israk",
      url: `${baseUrl}`,
    },
    publisher: {
      "@type": "Organization",
      name: "Atiq Israk Portfolio",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/avatar.webp`,
      },
    },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    image: article.image.startsWith('http') ? article.image : `${baseUrl}${article.image}`,
    url: `${baseUrl}/blogs/${article.slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/blogs/${article.slug}`,
    },
    keywords: article.tags,
    articleSection: "Technology",
  };
}

export function generateOrganizationSchema(): OrganizationSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Atiq Israk Portfolio",
    url: "https://atiqisrak.vercel.app",
    logo: "https://atiqisrak.vercel.app/avatar.webp",
    description: "Professional portfolio showcasing AI-driven product management expertise and innovative software solutions.",
    founder: {
      "@type": "Person",
      name: "Atiq Israk",
    },
    sameAs: [
      "https://github.com/atiqisrak",
      "https://linkedin.com/in/atiq-israk",
      "https://twitter.com/atiqisrak",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Professional Inquiry",
      email: "contact@atiqisrak.com",
    },
  };
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>): FAQSchema {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateProjectSchema(project: {
  title: string;
  description: string;
  banner: string;
  slug: string;
  technologies: string[];
  about: string[];
}): ProjectSchema {
  const baseUrl = "https://atiqisrak.vercel.app";
  
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: `${baseUrl}/projects/${project.slug}`,
    image: project.banner.startsWith('http') ? project.banner : `${baseUrl}${project.banner}`,
    author: {
      "@type": "Person",
      name: "Atiq Israk",
    },
    creator: {
      "@type": "Person",
      name: "Atiq Israk",
    },
    keywords: project.technologies,
    datePublished: new Date().toISOString(),
    publisher: {
      "@type": "Organization",
      name: "Atiq Israk Portfolio",
    },
    about: project.about,
    technologiesUsed: project.technologies,
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>): BreadcrumbSchema {
  const baseUrl = "https://atiqisrak.vercel.app";
  
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${baseUrl}${item.url}`,
    })),
  };
}
