import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/offline', '/api/'],
    },
    sitemap: 'https://atiqisrak.vercel.app/sitemap.xml',
  };
}
