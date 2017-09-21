import { css } from 'glamor';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import BMEBuildingKImage from '../assets/bme-building-k.jpg';
import ArticleContainer from '../components/article-container';
import CoverImage from '../components/cover-image';
import { ASPECT_RATIO_1_1 } from '../utils/presets';

const theme = createMuiTheme({
  overrides: {
    MuiPaper: {
      root: {
        padding: '1.5rem 2rem',
      },
    },
  },
});

const TeamsTemplate = ({ data }) => {
  const title = 'Csapatok';

  return (
    <div>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      {/* TODO: Add a cover image */}
      <CoverImage />

      <ArticleContainer title={title}>
        <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
          <Grid container>
            {data.allTeamsJson.edges.map(({ node: team }) => (
              <Grid item xs={12} key={team.name}>
                <Card
                  {...css({
                    borderLeft: `1rem solid ${team.color || theme.palette.primary[500]}`,
                  })}
                >
                  <article>
                    <Grid container align="center" spacing={24}>
                      <Grid item xs={4}>
                        <div {...css({ margin: '1rem 0' })}>
                          <CardMedia
                            image={BMEBuildingKImage} // TODO: Add support for responsive images
                            {...css({
                              borderRadius: '50%',
                              ...ASPECT_RATIO_1_1,
                            })}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={8}>
                        <CardContent>
                          <Typography type="headline" component="h2" gutterBottom>
                            {team.name}
                          </Typography>
                          <Typography paragraph>{team.description}</Typography>
                          {team.email != null && (
                            <Typography type="subheading" component="address">
                              E-mail: <a href={`mailto:${team.email}`}>{team.email}</a>
                            </Typography>
                          )}
                        </CardContent>
                      </Grid>
                    </Grid>
                  </article>
                </Card>
              </Grid>
            ))}
          </Grid>
        </MuiThemeProvider>
      </ArticleContainer>
    </div>
  );
};

TeamsTemplate.propTypes = {
  data: PropTypes.shape({}).isRequired,
};

export default TeamsTemplate;

export const query = graphql`
  query TeamsTemplateQuery {
    allTeamsJson {
      edges {
        node {
          name
          description
          email
          color
        }
      }
    }
  }
`;
