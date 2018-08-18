import React from 'react'
import Link from 'gatsby-link'

export default ({ data }) => {
  console.log(data)
  return (
    <div>
      {data.allWordpressPost.edges.map(({ node }) => (
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
    </div>
  )
}

export const pageQuery = graphql`
  query GetPosts {
    allWordpressPost(sort: { fields: [date], order: DESC }) {
      edges {
        node {
          title
          excerpt
          slug
          featured_media {
            source_url
          }
        }
      }
    }
  }
`
