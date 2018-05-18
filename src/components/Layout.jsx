import blue from '@material-ui/core/colors/blue';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { StaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import MVKLogoWhiteURL from '../data/assets/mvk-logo-white.svg';
import ContactInfo from './ContactInfo';
import Container from './Container';
import NavBar from './NavBar';
import SocialMediaButtons from './SocialMediaButtons';
import styles from './Layout.module.scss';

const muiTheme = createMuiTheme({
  palette: {
    primary: { main: blue[500] },
  },

  typography: {
    headline: { textTransform: 'uppercase', fontWeight: 500 },
    title: { fontWeight: 400 },
    button: { fontWeight: 400 },
  },
});

const Layout = ({ children, ...props }) => (
  <div className={styles.root}>
    <CssBaseline />

    <MuiThemeProvider theme={muiTheme}>
      <StaticQuery
        query={graphql`
          query LayoutQuery {
            site {
              siteMetadata {
                title
                language
              }
            }
          }
        `}
        render={staticData => (
          <Helmet
            titleTemplate={`%s | ${staticData.site.siteMetadata.title}`}
            defaultTitle={staticData.site.siteMetadata.title}
          >
            <html lang={staticData.site.siteMetadata.language} />

            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
            />
          </Helmet>
        )}
      />

      <NavBar {...props} />

      <main className={styles.main}>{children}</main>

      <footer>
        <div className={styles.contactSection}>
          <Container>
            <Grid container justify="space-between" spacing={32}>
              <Grid item>
                <img
                  src={MVKLogoWhiteURL}
                  alt=""
                  className={styles.contactSectionBrandLogo}
                />
              </Grid>

              <Grid item>
                <ContactInfo />
              </Grid>
            </Grid>
          </Container>
        </div>

        <div className={styles.socialMediaButtonsSection}>
          <Container className={styles.socialMediaButtonsSectionBody}>
            <SocialMediaButtons justify="center" spacing={40} />
          </Container>
        </div>
      </footer>
    </MuiThemeProvider>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
