import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    if (!slug) {
      return NextResponse.json(
        { error: 'Slug parameter is required' },
        { status: 400 }
      );
    }

    // Fetch the individual post using the posts API
    const postUrl = `https://www.news.aakashg.com/api/v1/posts/${slug}`;
    
    const postResponse = await fetch(postUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Portfolio-Bot/1.0)',
      },
    });

    if (!postResponse.ok) {
      throw new Error(`Posts API responded with status: ${postResponse.status}`);
    }

    const post = await postResponse.json();


    // Transform the data to replace Aakash's info with Atiq's info
    const transformedPost = {
      ...post,
      canonical_url: post.canonical_url?.replace('www.news.aakashg.com', 'atiqisrak.vercel.app'),
      publishedBylines: post.publishedBylines?.map((byline: any) => ({
        ...byline,
        name: byline.name === 'Aakash Gupta' ? 'Atiq Israk' : byline.name,
        handle: byline.handle === 'aakashgupta' ? 'atiqisrak' : byline.handle,
        twitter_screen_name: byline.twitter_screen_name === 'aakashg0' ? 'atiqisrak' : byline.twitter_screen_name,
        bio: byline.bio?.replace('The AI PM guy', 'Full Stack Developer & AI Enthusiast'),
        publicationUsers: byline.publicationUsers?.map((pubUser: any) => ({
          ...pubUser,
          publication: pubUser.publication ? {
            ...pubUser.publication,
            name: pubUser.publication.name === 'Product Growth' ? 'Atiq Israk Portfolio' : pubUser.publication.name,
            subdomain: pubUser.publication.subdomain === 'aakashgupta' ? 'atiqisrak' : pubUser.publication.subdomain,
            custom_domain: pubUser.publication.custom_domain === 'www.news.aakashg.com' ? 'atiqisrak.vercel.app' : pubUser.publication.custom_domain,
            hero_text: pubUser.publication.hero_text?.replace('PM', 'Developer').replace('product leadership', 'full-stack development'),
            author_id: pubUser.publication.author_id,
            primary_user_id: pubUser.publication.primary_user_id,
            email_from_name: pubUser.publication.email_from_name?.replace('Aakash Gupta', 'Atiq Israk'),
            copyright: pubUser.publication.copyright === 'Aakash Gupta' ? 'Atiq Israk' : pubUser.publication.copyright,
          } : pubUser.publication,
        })),
      })),
    };

    return NextResponse.json(transformedPost, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });

  } catch (error) {
    console.error('Archive Slug API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch post data' },
      { status: 500 }
    );
  }
}
