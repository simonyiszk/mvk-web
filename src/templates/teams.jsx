import { css } from 'glamor';
import Card, { CardContent } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
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
          <Card>
            <CardContent>
              <Typography type="headline" component="h2">
                {team.name}
              </Typography>
              <Typography
                component="p"
                {...css({
                  height: '100px', // TODO: Use lineHeight * 5
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  overflowWrap: 'break-word',
                })}
              >
                {team.description}
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
