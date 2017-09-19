import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import Container from './container';

const theme = createMuiTheme({
  typography: {
    headline: {
      color: 'white',
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
  },
  overrides: {
    MuiPaper: {
      root: {
        padding: '5rem',
      },
    },
  },
});

const ArticleContainer = ({ children, title, ...props }) => (
  <Container>
    <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
      <article {...props}>
        <Typography type="headline" gutterBottom>
          {title}
        </Typography>

        <div>{children}</div>
      </article>
    </MuiThemeProvider>
  </Container>
);

ArticleContainer.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default ArticleContainer;
