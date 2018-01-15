import { css } from 'glamor';
import Paper from 'material-ui/Paper';
import React from 'react';
import Helmet from 'react-helmet';
import { sponsors } from '../data/sponsors.json';
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
                margin: '1rem',
              },
            })}
          >
            {sponsors.map(sponsor => (
              <a
                key={sponsor.name}
                href={sponsor.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  {...css({ height: `${sponsor.importance}rem` })}
                />
              </a>
            ))}
          </div>
        </Paper>
      </ArticleContainer>
    </div>
  );
};

export default SponsorsPage;
