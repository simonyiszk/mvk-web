import Grid from '@material-ui/core/Grid';
import { StaticQuery } from 'gatsby';
import React from 'react';
import FaFacebookOfficial from 'react-icons/lib/fa/facebook-official';
import FaGitHub from 'react-icons/lib/fa/github';

const SocialMediaButtons = ({ ...props }) => (
  <StaticQuery
    query={graphql`
      query SocialMediaButtonsQuery {
        site {
          siteMetadata {
            siteFacebookURL
            siteGitHubURL
          }
        }
      }
    `}
    render={staticData => (
      <Grid container {...props}>
        <Grid item>
          <a href={staticData.site.siteMetadata.siteFacebookURL}>
            <FaFacebookOfficial />
          </a>
        </Grid>

        <Grid item>
          <a href={staticData.site.siteMetadata.siteGitHubURL}>
            <FaGitHub />
          </a>
        </Grid>
      </Grid>
    )}
  />
);

export default SocialMediaButtons;
