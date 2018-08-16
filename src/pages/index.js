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
              textDecoration: "none",
              color: "inherit"
            }}
          >
            <h4 dangerouslySetInnerHTML={{ __html: node.title }} />
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
        }
      }
    }
  }
`
