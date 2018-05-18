import Typography from '@material-ui/core/Typography';
import { StaticQuery } from 'gatsby';
import React from 'react';

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
        <Typography variant="caption" paragraph color="inherit">
          <a href={staticData.site.siteMetadata.siteAddressURL}>
            {staticData.site.siteMetadata.siteAddressPretty}
          </a>
        </Typography>

        <Typography
          variant="caption"
          component="p"
          gutterBottom
          color="inherit"
        >
          Telefon: {staticData.site.siteMetadata.telephone}
        </Typography>

        <Typography variant="caption" component="p" color="inherit">
          E-mail:{' '}
          <a href={staticData.site.siteMetadata.siteEmailURL}>
            {staticData.site.siteMetadata.siteEmailPretty}
          </a>
        </Typography>
      </address>
    )}
  />
);

export default ContactInfo;
