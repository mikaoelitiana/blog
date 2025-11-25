import { getAllPostSlugs, getPostData, getSortedPostsData } from '@/lib/posts';
import Bio from '@/components/Bio';
import Link from 'next/link';
import { format } from 'date-fns';
import type { Metadata } from 'next';
import { siteMetadata } from '@/lib/config';

export async function generateStaticParams() {
  const paths = getAllPostSlugs();
  return paths.map((path) => ({
    slug: path.params.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const postData = await getPostData(slug);

  return {
    title: postData.title,
    description: postData.description || postData.excerpt,
    openGraph: {
      title: postData.title,
      description: postData.description || postData.excerpt || '',
      url: `${siteMetadata.siteUrl}/blog/${slug}/`,
      type: 'article',
      publishedTime: postData.date,
    },
  };
}

export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const postData = await getPostData(slug);
  const allPosts = getSortedPostsData();
  
  // Find previous and next posts
  const currentIndex = allPosts.findIndex((post) => post.slug === slug);
  const previous = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const next = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  return (
    <>
      <article>
        <h1>{postData.title}</h1>
        <p
          style={{
            display: 'block',
            marginBottom: '1.75rem',
            marginTop: '-1.75rem',
            fontSize: '0.83255rem',
          }}
        >
          {format(new Date(postData.date), 'MMMM dd, yyyy')}
        </p>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml || '' }} />
        <hr
          style={{
            marginBottom: '1.75rem',
          }}
        />
      </article>
      <Bio />
      <ul
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          listStyle: 'none',
          padding: 0,
        }}
      >
        <li>
          {previous && (
            <Link href={`/blog/${previous.slug}`} rel="prev">
              ← {previous.title}
            </Link>
          )}
        </li>
        <li>
          {next && (
            <Link href={`/blog/${next.slug}`} rel="next">
              {next.title} →
            </Link>
          )}
        </li>
      </ul>
    </>
  );
}
