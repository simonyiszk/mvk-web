import { css } from 'glamor';
import { amber, blue } from 'material-ui/colors';
import Grid from 'material-ui/Grid';
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import 'normalize.css';
import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import InstagramIcon from 'react-icons/lib/fa/instagram';
import FacebookIcon from 'react-icons/lib/fa/facebook-official';
import TwitterIcon from 'react-icons/lib/fa/twitter';
import Container from '../components/container';
import MVKLogo from '../components/mvk-logo';
import ResponsiveAppBar from '../components/responsive-app-bar';
import {
  footerBackgroundDark,
  footerBackgroundLight,
  footerTextColor,
  mainBackground,
} from '../utils/presets';

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
  const isHomepage = location.pathname === '/';

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
            <Grid container align="center" justify="space-between">
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
                    <a href="//goo.gl/maps/BrBoFEiUsen" target="_blank" rel="noopener noreferrer">
                      1111 Bp., Műegyetem rkp. 3. K. ép. I.61.
                    </a>
                    <br />
                    Telefon: <a href="tel:+36XXXXXXXXX">+36 XX XXX XXXX</a> (TODO)<br />
                    E-mail: <a href="mailto:mvk@bmeehk.hu">mvk@bmeehk.hu</a>
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
              <FacebookIcon />
              <TwitterIcon />
              <InstagramIcon />
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
      }
    }
  }
`;
