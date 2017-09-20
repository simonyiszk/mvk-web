import Paper from 'material-ui/Paper';
import React from 'react';
import Helmet from 'react-helmet';
import ArticleContainer from '../components/article-container';
import CoverImage from '../components/cover-image';

const NotFoundPage = () => {
  const title = 'Hiba';

  return (
    <div>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <CoverImage />

      <ArticleContainer title={title}>
        <Paper>
          <p>A keresett oldal nem található.</p>
        </Paper>
      </ArticleContainer>
    </div>
  );
};

export default NotFoundPage;
