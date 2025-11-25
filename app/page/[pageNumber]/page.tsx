import Link from 'next/link';
import { getPaginatedPosts } from '@/lib/posts';
import Bio from '@/components/Bio';
import Pagination from '@/components/Pagination';
import { format } from 'date-fns';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{
    pageNumber: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { pageNumber } = await params;
  const page = parseInt(pageNumber, 10);

  // Validate page number
  if (isNaN(page) || page < 1) {
    notFound();
  }

  const { posts, totalPages, currentPage } = getPaginatedPosts(page, 20);

  // If page number is greater than total pages, show 404
  if (page > totalPages) {
    notFound();
  }

  return (
    <>
      <Bio />
      {posts.map(({ slug, title, date, description, excerpt }) => (
        <div key={slug} style={{ marginBottom: '2.625rem' }}>
          <h3
            style={{
              marginBottom: '0.4375rem',
              marginTop: 0,
            }}
          >
            <Link
              href={`/blog/${slug}`}
              style={{
                boxShadow: 'none',
              }}
            >
              {title}
            </Link>
          </h3>
          <small>{format(new Date(date), 'MMMM dd, yyyy')}</small>
          {(description || excerpt) && (
            <p
              dangerouslySetInnerHTML={{
                __html: description || excerpt || '',
              }}
            />
          )}
        </div>
      ))}
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}

export async function generateStaticParams() {
  const { totalPages } = getPaginatedPosts(1, 20);
  const pages = [];

  for (let i = 2; i <= totalPages; i++) {
    pages.push({
      pageNumber: i.toString(),
    });
  }

  return pages;
}
