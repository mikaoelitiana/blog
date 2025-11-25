import Link from 'next/link';
import { getPaginatedPosts } from '@/lib/posts';
import Bio from '@/components/Bio';
import Pagination from '@/components/Pagination';
import { format } from 'date-fns';

export default function Home() {
  const { posts, totalPages, currentPage } = getPaginatedPosts();

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
