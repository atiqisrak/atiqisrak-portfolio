import Head from "next/head";

interface ProjectMetaProps {
  title: string;
  description: string;
  image: string;
  url: string;
  technologies: string[];
}

export default function ProjectMeta({
  title,
  description,
  image,
  url,
  technologies,
}: ProjectMetaProps) {
  const fullUrl = `https://atiqisrak.vercel.app${url}`;
  const fullImageUrl = `https://atiqisrak.vercel.app${image}`;

  return (
    <Head>
      <title>{`${title} - Atiq Israk Portfolio`}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={technologies.join(", ")} />

      {/* Open Graph */}
      <meta property="og:title" content={`${title} - Atiq Israk Portfolio`} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content="article" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${title} - Atiq Israk Portfolio`} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />

      {/* Canonical */}
      <link rel="canonical" href={fullUrl} />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: title,
            description: description,
            url: fullUrl,
            image: fullImageUrl,
            author: {
              "@type": "Person",
              name: "Atiq Israk",
            },
            creator: {
              "@type": "Person",
              name: "Atiq Israk",
            },
            keywords: technologies.join(", "),
            datePublished: new Date().toISOString(),
            publisher: {
              "@type": "Person",
              name: "Atiq Israk",
            },
          }),
        }}
      />
    </Head>
  );
}
