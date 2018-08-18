import React from 'react'
import Link from 'gatsby-link'

export default ({ pathContext }) => {
  const { group, index, first, last } = pathContext
  return (
    <div>
      {group.map(({ node }) => (
        <div>
          <Link
            to={node.slug}
            style={{
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <h3 dangerouslySetInnerHTML={{ __html: node.title }} />
            {/* {node.featured_media && (
              <img src={node.featured_media.source_url} alt="featured image" />
            )} */}
            <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
          </Link>
        </div>
      ))}

      {!first && (
        <Link className="prev" to={`/${index > 2 ? index - 1 : ''}`}>
          &larr; Previous
        </Link>
      )}
      {!last && (
        <Link className="next" to={`/${index + 1}`}>
          Next &rarr;
        </Link>
      )}
    </div>
  )
}
