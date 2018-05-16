import Typography from '@material-ui/core/Typography';
import { StaticQuery } from 'gatsby';
import React from 'react';
import ExternalLink from './ExternalLink';

const ContactInfo = ({ ...props }) => (
  <StaticQuery
    query={graphql`
      query ContactInfoQuery {
        site {
          siteMetadata {
            telephone
            siteAddressURL
            siteAddressPretty
            siteEmailURL
            siteEmailPretty
          }
        }
      }
    `}
    render={staticData => (
      <address {...props}>
        <Typography variant="caption" gutterBottom>
          <ExternalLink to={staticData.site.siteMetadata.siteAddressURL}>
            {staticData.site.siteMetadata.siteAddressPretty}
          </ExternalLink>
        </Typography>

        <Typography variant="caption" gutterBottom>
          Telefon: {staticData.site.siteMetadata.telephone}
        </Typography>

        <Typography variant="caption">
          E-mail:{' '}
          <ExternalLink to={staticData.site.siteMetadata.siteEmailURL}>
            {staticData.site.siteMetadata.siteEmailPretty}
          </ExternalLink>
        </Typography>
      </address>
    )}
  />
);

export default ContactInfo;
