import { css } from 'glamor';
import Paper from 'material-ui/Paper';
import React from 'react';
import Helmet from 'react-helmet';
import BMELogoImage from '../assets/bme-logo.svg';
import EHKLogoImage from '../assets/ehk-logo.svg';
import ArticleContainer from '../components/article-container';
import CoverImage from '../components/cover-image';

const SponsorsPage = () => {
  const title = 'Szponzorok';

  return (
    <div>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <CoverImage />

      <ArticleContainer title={title}>
        <Paper>
          <div
            {...css({
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              margin: '-1rem',

              '& > *': {
                height: '6rem',
                padding: '1rem',
              },
            })}
          >
            <img src={BMELogoImage} alt="Műegyetem 1782" />
            <img src={EHKLogoImage} alt="Egyetemi Hallgatói Képviselet" />
          </div>
        </Paper>
      </ArticleContainer>
    </div>
  );
};

export default SponsorsPage;
