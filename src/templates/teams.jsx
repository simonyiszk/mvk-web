import Card, { CardContent } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import Shiitake from 'shiitake';
import ArticleContainer from '../components/article-container';
import CoverImage from '../components/cover-image';

const theme = createMuiTheme({
  overrides: {
    MuiPaper: {
      root: {
        padding: '2rem',
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
                <Card>
                  <CardContent>
                    <Typography type="title">{team.name}</Typography>
                    <Typography component="div">
                      <Shiitake lines={5}>{team.description}</Shiitake>
                    </Typography>
                  </CardContent>
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
        }
      }
    }
  }
`;
