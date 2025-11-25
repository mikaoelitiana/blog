import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages: (number | string)[] = [];
  const showEllipsis = totalPages > 7;

  if (showEllipsis) {
    // Always show first page
    pages.push(1);

    // Calculate the range of pages to show around current page
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    // Add left ellipsis if there's a gap after page 1
    if (startPage > 2) {
      pages.push('...');
    }

    // Show pages around current page (excluding first and last which are always shown)
    for (let i = startPage; i <= endPage; i++) {
      // Only add if not first or last page (they're handled separately)
      if (i !== 1 && i !== totalPages) {
        pages.push(i);
      }
    }

    // Add right ellipsis if there's a gap before last page
    if (endPage < totalPages - 1) {
      pages.push('...');
    }

    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }
  } else {
    // Show all pages if 7 or fewer
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  }

  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '0.5rem',
        marginTop: '2rem',
        marginBottom: '2rem',
      }}
    >
      {currentPage > 1 && (
        <Link
          href={currentPage === 2 ? '/' : `/page/${currentPage - 1}`}
          style={{
            padding: '0.5rem 0.75rem',
            border: '1px solid #ddd',
            borderRadius: '4px',
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          ← Previous
        </Link>
      )}

      {pages.map((page, index) => {
        if (page === '...') {
          return (
            <span
              key={`ellipsis-${index}`}
              style={{
                padding: '0.5rem 0.75rem',
              }}
            >
              ...
            </span>
          );
        }

        const pageNum = page as number;
        const isCurrentPage = pageNum === currentPage;
        const href = pageNum === 1 ? '/' : `/page/${pageNum}`;

        return (
          <Link
            key={pageNum}
            href={href}
            style={{
              padding: '0.5rem 0.75rem',
              border: '1px solid #ddd',
              borderRadius: '4px',
              textDecoration: 'none',
              color: isCurrentPage ? '#fff' : 'inherit',
              backgroundColor: isCurrentPage ? '#007acc' : 'transparent',
              fontWeight: isCurrentPage ? 'bold' : 'normal',
            }}
          >
            {pageNum}
          </Link>
        );
      })}

      {currentPage < totalPages && (
        <Link
          href={`/page/${currentPage + 1}`}
          style={{
            padding: '0.5rem 0.75rem',
            border: '1px solid #ddd',
            borderRadius: '4px',
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          Next →
        </Link>
      )}
    </nav>
  );
}
