

import React from "react"

export default ({ data }) => {
  console.log(data)
  return (
    <div>
      {data.allWordpressPost.edges.map(({ node }) => (
        <div>
          <h4>{node.title}</h4>
          <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
        </div>
      ))}
    </div>
  )
}

export const pageQuery = graphql`
  query GetPosts{
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

