import { css } from 'glamor';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import Container from './container';

const ArticleContainer = ({ title, ...props }) => (
  <Container>
    <article>
      <Typography type="headline" gutterBottom>
        {title}
      </Typography>

      <Paper {...css({ padding: '5rem' })} {...props} />
    </article>
  </Container>
);

ArticleContainer.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ArticleContainer;
