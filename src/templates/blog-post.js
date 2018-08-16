import React from 'react'

export default ({ data }) => {
  const post = data.wordpressPost
  return (
    <div>
      <h1 dangerouslySetInnerHTML={{ __html: post.title }} />
      {post.featured_media.source_url && <img src={post.featured_media.source_url} alt="featured image"/>}
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  )
}

export const query = graphql`
  query GetPostContent($slug: String!) {
    wordpressPost(slug: { eq: $slug }) {
      title
      content
      featured_media {
        source_url
      }
    }
  }
`
