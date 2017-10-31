import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { withPrefix } from 'gatsby-link';
import { css } from 'glamor';
import { amber, blue } from 'material-ui/colors';
import Grid from 'material-ui/Grid';
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import 'normalize.css';
import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import { reactI18nextModule } from 'react-i18next';
import FacebookIcon from 'react-icons/lib/fa/facebook-official';
import GitHubIcon from 'react-icons/lib/fa/github';
import Container from '../components/container';
import MVKLogo from '../components/mvk-logo';
import ResponsiveAppBar from '../components/responsive-app-bar';
import {
  footerBackgroundDark,
  footerBackgroundLight,
  footerTextColor,
  mainBackground,
} from '../utils/presets';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(reactI18nextModule)
  .init({
    debug: process.env.NODE_ENV === 'development',
    fallbackLng: 'hu',
    ns: [],
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: withPrefix('/locales/{{lng}}/{{ns}}.json'),
    },
    react: {
      wait: true,
    },
  });

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: amber,
  },
  typography: {
    headline: {
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
  },
});

const IndexLayout = ({ children, data, location }) => {
  const isHomepage = location.pathname === withPrefix('/');

  return (
    <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
      <Typography
        type="body2"
        component="div"
        {...css({
          '& a': {
            ':not(:hover)': {
              textDecoration: 'none',
            },
          },
          background: mainBackground,
          display: 'flex !important',
          flexDirection: 'column',
          minHeight: '100vh',
        })}
      >
        <Helmet
          defaultTitle={data.site.siteMetadata.title}
          titleTemplate={`%s | ${data.site.siteMetadata.title}`}
        >
          <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" />

          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Helmet>

        <ResponsiveAppBar hideLogoWhenUnfixed={isHomepage} />

        <main
          {...css({
            '& a': {
              color: theme.palette.primary[500],
            },
            flex: 1,
          })}
        >
          {children()}
        </main>

        <footer
          {...css({
            '& a': {
              color: 'inherit',
            },
            background: footerBackgroundLight,
            color: footerTextColor,
          })}
        >
          <Container>
            <Grid
              container
              alignItems="center"
              {...css({
                [theme.breakpoints.down('md')]: {
                  justifyContent: 'center',
                },
                [theme.breakpoints.up('md')]: {
                  justifyContent: 'space-between',
                },
              })}
            >
              <Grid item>
                <MVKLogo
                  white
                  {...css({
                    height: '3rem',
                    maxWidth: '80vw',
                  })}
                />
              </Grid>

              <Grid item>
                <small>
                  <address>
                    <a
                      href={data.site.siteMetadata.siteAddressURL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {data.site.siteMetadata.siteAddressPretty}
                    </a>
                    <br />
                    Telefon:{' '}
                    <a href={`tel:${data.site.siteMetadata.siteTelephoneURL}`}>
                      {data.site.siteMetadata.siteTelephonePretty}
                    </a>{' '}
                    (Egyetemi Hallgatói Képviselet)<br />
                    E-mail:{' '}
                    <a href={`mailto:${data.site.siteMetadata.siteEmailURL}`}>
                      {data.site.siteMetadata.siteEmailURL}
                    </a>
                  </address>
                </small>
              </Grid>
            </Grid>
          </Container>

          <div {...css({ background: footerBackgroundDark })}>
            <Container
              {...css({
                '& > *': {
                  margin: '0 1.5rem',
                },
                fontSize: '2rem',
                textAlign: 'center',
              })}
            >
              <a
                href={data.site.siteMetadata.siteFacebookURL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookIcon />
              </a>
              <a
                href={data.site.siteMetadata.siteGitHubURL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHubIcon />
              </a>
            </Container>
          </div>
        </footer>
      </Typography>
    </MuiThemeProvider>
  );
};

IndexLayout.propTypes = {
  children: PropTypes.func.isRequired,
  data: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired,
};

export default IndexLayout;

export const query = graphql`
  query IndexLayoutQuery {
    site {
      siteMetadata {
        title
        siteAddressURL
        siteAddressPretty
        siteTelephoneURL
        siteTelephonePretty
        siteEmailURL
        siteFacebookURL
        siteGitHubURL
      }
    }
  }
`;
