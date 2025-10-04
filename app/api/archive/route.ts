import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sort = searchParams.get('sort') || 'new';
    const search = searchParams.get('search') || '';
    const offset = parseInt(searchParams.get('offset') || '0');
    const limit = parseInt(searchParams.get('limit') || '12');
    const post_tag_id = searchParams.get('post_tag_id') || '';

    // Build external API URL with parameters
    const externalParams = new URLSearchParams({
      sort,
      search,
      offset: offset.toString(),
      limit: limit.toString(),
    });

    if (post_tag_id) {
      externalParams.append('post_tag_id', post_tag_id);
    }

    const externalApiUrl = `https://www.news.aakashg.com/api/v1/archive?${externalParams.toString()}`;
    
    const response = await fetch(externalApiUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Portfolio-Bot/1.0)',
      },
    });

    if (!response.ok) {
      throw new Error(`External API responded with status: ${response.status}`);
    }

    const data = await response.json();

    // Transform the data to replace Aakash's info with Atiq's info
    const transformedData = data.map((post: any) => transformPost(post));

    return NextResponse.json(transformedData, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });

  } catch (error) {
    console.error('Archive API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch archive data' },
      { status: 500 }
    );
  }
}

function transformPost(post: any) {
  return {
    ...post,
    canonical_url: post.canonical_url?.replace('www.news.aakashg.com', 'atiqisrak.com'),
    publishedBylines: post.publishedBylines?.map((byline: any) => ({
      ...byline,
      name: byline.name === 'Aakash Gupta' ? 'Atiq Israk' : byline.name,
      handle: byline.handle === 'aakashgupta' ? 'atiqisrak' : byline.handle,
      twitter_screen_name: byline.twitter_screen_name === 'aakashg0' ? 'atiqisrak' : byline.twitter_screen_name,
      bio: byline.bio?.replace('The AI PM guy', 'Product Manager & AI Enthusiast'),
      publicationUsers: byline.publicationUsers?.map((pubUser: any) => ({
        ...pubUser,
        publication: pubUser.publication ? {
          ...pubUser.publication,
          name: pubUser.publication.name === 'Product Growth' ? 'Atiq Israk Portfolio' : pubUser.publication.name,
          subdomain: pubUser.publication.subdomain === 'aakashgupta' ? 'atiqisrak' : pubUser.publication.subdomain,
          custom_domain: pubUser.publication.custom_domain === 'www.news.aakashg.com' ? 'atiqisrak.com' : pubUser.publication.custom_domain,
          hero_text: pubUser.publication.hero_text?.replace('PM', 'Developer').replace('product leadership', 'full-stack development'),
          author_id: pubUser.publication.author_id,
          primary_user_id: pubUser.publication.primary_user_id,
          email_from_name: pubUser.publication.email_from_name?.replace('Aakash Gupta', 'Atiq Israk'),
          copyright: pubUser.publication.copyright === 'Aakash Gupta' ? 'Atiq Israk' : pubUser.publication.copyright,
        } : pubUser.publication,
      })),
    })),
  };
}
