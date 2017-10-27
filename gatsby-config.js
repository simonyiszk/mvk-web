module.exports = {
  pathPrefix: '/mvk-web',
  siteMetadata: {
    title: 'Műegyetemi Versenycsapat Közösség',
    siteAddressURL: 'https://goo.gl/maps/BrBoFEiUsen',
    siteAddressPretty: '1111 Bp., Műegyetem rkp. 3. K. ép. I.61.',
    siteTelephoneURL: '+3614633836',
    siteTelephonePretty: '+36\xa01\xa0463\xa03836',
    siteEmailURL: 'mvk@ehk.bme.hu',
    siteFacebookURL: 'https://fb.com/bmemvk',
    siteGitHubURL: 'https://github.com/simonyiszk/mvk-web',
  },
  plugins: [
    'gatsby-plugin-catch-links',
    'gatsby-plugin-glamor',
    'gatsby-plugin-jss',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'src',
        path: `${__dirname}/src/`,
      },
    },
    'gatsby-transformer-json',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-copy-linked-files',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 640,
            },
          },
          'gatsby-remark-responsive-iframe',
          {
            resolve: 'gatsby-remark-smartypants',
            options: {
              dashes: 'oldschool',
            },
          },
        ],
      },
    },
    'gatsby-transformer-sharp',
  ],
};
