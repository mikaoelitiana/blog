import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allMarkdownRemark.edges
    const pageInfo = data.allMarkdownRemark.pageInfo

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="All posts"
          keywords={[
            `blog`,
            `typescript`,
            `javascript`,
            `react`,
            "DevOps",
            "Continuous integration",
          ]}
        />
        <Bio />
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <div key={node.fields.slug}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter.date}</small>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </div>
          )
        })}
        <div style={{ height: "50px", width: "100%", position: "relative" }}>
          {pageInfo.hasPreviousPage && (
            <Link
              to={`${
                pageInfo.currentPager > 1 ? pageInfo.currentPage - 2 : ""
              }`}
            >
              {" "}
              ←{" "}
            </Link>
          )}
          {pageInfo.hasNextPage && (
            <Link
              style={{ position: "absolute", right: 0 }}
              to={`${pageInfo.currentPage}`}
            >
              {" "}
              →{" "}
            </Link>
          )}
        </div>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { lang: { eq: "fr" } } }
      limit: $limit
      skip: $skip
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        currentPage
      }
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`
