import { css } from 'glamor';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import Container from './container';

const ArticleContainer = ({ title, ...props }) => (
  <Container>
    <article>
      <h1
        {...css({
          color: 'white',
          margin: '0 0 0.4em 0',
          textTransform: 'uppercase',
        })}
      >
        {title}
      </h1>

      <Paper {...css({ padding: '5rem' })} {...props} />
    </article>
  </Container>
);

ArticleContainer.propTypes = {
  title: PropTypes.string.isRequired,
};

export default ArticleContainer;
