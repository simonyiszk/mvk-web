import Grid from '@material-ui/core/Grid';
import { StaticQuery } from 'gatsby';
import React from 'react';
import FaFacebookOfficial from 'react-icons/lib/fa/facebook-official';
import FaGitHub from 'react-icons/lib/fa/github';
import ExternalLink from './ExternalLink';

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
          <ExternalLink to={staticData.site.siteMetadata.siteFacebookURL}>
            <FaFacebookOfficial />
          </ExternalLink>
        </Grid>

        <Grid item>
          <ExternalLink to={staticData.site.siteMetadata.siteGitHubURL}>
            <FaGitHub />
          </ExternalLink>
        </Grid>
      </Grid>
    )}
  />
);

export default SocialMediaButtons;
