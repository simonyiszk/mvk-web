import { css } from 'glamor';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import React from 'react';
import Helmet from 'react-helmet';
import ArticleContainer from '../components/article-container';
import CoverImage from '../components/cover-image';
import { sponsors } from '../data/sponsors.json';
import { sponsorsPageImage as PageCoverImageSrc } from '../data/cover-images.json';

const SponsorsPage = () => {
  const title = 'Szponzorok';

  return (
    <div>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <CoverImage src={PageCoverImageSrc} />

      <ArticleContainer title={title}>
        <Paper>
          {Array.from(sponsors.reduce((acc, currSponsor) => {
              const categorySponsors = acc.get(currSponsor.category) || [];
              return acc.set(currSponsor.category, [...categorySponsors, currSponsor]);
            }, new Map())).map(([category, sponsorsInCurrCategory]) => (
              <div key={category}>
                <Typography type="headline" align="center">
                  {category}
                </Typography>

                <div
                  {...css({
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  marginBottom: '1rem',

                  '& > *': {
                    margin: '1rem',
                  },
                })}
                >
                  {sponsorsInCurrCategory.map(sponsor => (
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
              </div>
          ))}
        </Paper>
      </ArticleContainer>
    </div>
  );
};

export default SponsorsPage;
