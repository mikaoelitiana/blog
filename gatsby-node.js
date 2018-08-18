/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require(`path`)
const createPaginatedPages = require('gatsby-paginate')

// You can delete this file if you're not using it
exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  return new Promise((resolve, reject) => {
    graphql(`
      query GetPostSlugs {
        allWordpressPost {
          edges {
            node {
              title
              excerpt
              slug
              featured_media {
                localFile {
                  childImageSharp {
                    resolutions(width: 250, height: 250) {
                      src
                    }
                  }
                }
              }
            }
          }
        }
      }
    `).then(result => {
      createPaginatedPages({
        edges: result.data.allWordpressPost.edges,
        createPage: createPage,
        pageTemplate: 'src/templates/index.js',
        pageLength: 5,
        pathPrefix: '', // This is optional and defaults to an empty string if not used
        context: {}, // This is optional and defaults to an empty object if not used
      })
      result.data.allWordpressPost.edges.forEach(({ node }) => {
        createPage({
          path: node.slug,
          component: path.resolve(`./src/templates/blog-post.js`),
          context: {
            // Data passed to context is available
            // in page queries as GraphQL variables.
            slug: node.slug,
          },
        })
      })
      resolve()
    })
  })
}
