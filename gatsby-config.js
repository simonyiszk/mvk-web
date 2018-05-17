const siteEmailPretty = 'mvk@ehk.bme.hu';

module.exports = {
  siteMetadata: {
    title: 'Műegyetemi Versenycsapat Közösség',
    language: 'hu',
    telephone: '+36 1 463 3836 (Egyetemi Hallgatói Képviselet)',
    siteAddressURL: 'https://goo.gl/maps/BrBoFEiUsen',
    siteAddressPretty: '1111 Bp., Műegyetem rkp. 3. K. ép. I.61.',
    siteEmailURL: `mailto:${siteEmailPretty}`,
    siteEmailPretty,
    siteFacebookURL: 'https://www.facebook.com/bmemvk',
    siteGitHubURL: 'https://github.com/simonyiszk/mvk-web',
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages/`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'data',
        path: `${__dirname}/src/data/`,
      },
    },
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    /*
    TODO:
    'gatsby-transformer-sharp',
    */
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 608,
            },
          },
        ],
      },
    },
    'gatsby-transformer-yaml',
  ],
};
