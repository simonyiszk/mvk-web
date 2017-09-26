import { css } from 'glamor';
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import Container from './container';

const theme = outerTheme =>
  createMuiTheme({
    ...outerTheme,
    overrides: {
      MuiPaper: {
        root: {
          padding: '2rem',
          [outerTheme.breakpoints.up('md')]: {
            padding: '5rem',
          },
        },
      },
    },
  });

const ArticleContainer = ({ children, title, ...props }) => (
  <Container>
    <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
      <article {...props}>
        <Typography type="headline" gutterBottom {...css({ color: 'white !important' })}>
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
