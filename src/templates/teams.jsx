import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import Shiitake from 'shiitake';
import ArticleContainer from '../components/article-container';
import CoverImage from '../components/cover-image';

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
        {data.allTeamsJson.edges.map(({ node: team }) => (
          <Card key={team.name}>
            <CardContent>
              <Typography type="headline" component="h2">
                {team.name}
              </Typography>
              <Typography component="span">
                <Shiitake lines={5}>{team.description}</Shiitake>
              </Typography>
            </CardContent>
          </Card>
        ))}
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
