module.exports = {
  pathPrefix: `/gatsby`,
  siteMetadata: {
    title: 'Mika A.',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        /*
      * The base URL of the Wordpress site without the trailingslash and the protocol. This is required.
      * Example : 'gatsbyjswpexample.wordpress.com' or 'www.example-site.com'
      */
        baseUrl: `mikaoelitiana.name`,
        // The protocol. This can be http or https.
        protocol: `https`,
        // Indicates whether the site is hosted on wordpress.com.
        // If false, then the asumption is made that the site is self hosted.
        // If true, then the plugin will source its content on wordpress.com using the JSON REST API V2.
        // If your site is hosted on wordpress.org, then set this to false.
        hostingWPCOM: false,
        // If useACF is true, then the source plugin will try to import the Wordpress ACF Plugin contents.
        // This feature is untested for sites hosted on Wordpress.com
        useACF: false,
      },
    },
  ],
}
