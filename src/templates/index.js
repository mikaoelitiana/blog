import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import { path } from 'ramda'

export default ({ pathContext }) => {
  const { group, index, first, last } = pathContext
  return (
    <div>
      {group.map(({ node }, i) => (
        <div key={i}>
          <Link
            to={node.slug}
            style={{
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <h3 dangerouslySetInnerHTML={{ __html: node.title }} />
          </Link>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            {path(['featured_media', 'localFile'], node) && (
              <Link
                to={node.slug}
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                }}
              >
                <Img
                  resolutions={
                    node.featured_media.localFile.childImageSharp.resolutions
                  }
                  alt="featured image"
                  className="homeThumbnail"
                />
              </Link>
            )}
            <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
          </div>
        </div>
      ))}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
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
    </div>
  )
}
