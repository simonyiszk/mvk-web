import Link from 'gatsby-link';
import { css } from 'glamor';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import FaEnvelope from 'react-icons/lib/fa/envelope';
import FaFacebookOfficial from 'react-icons/lib/fa/facebook-official';
import ArticleContainer from '../components/article-container';
import CoverImage from '../components/cover-image';
import { teamsPageImage as PageCoverImageSrc } from '../data/cover-images.json';
import { ASPECT_RATIO_1_1, IMAGE_OVERLAY_TINT } from '../utils/presets';

const theme = createMuiTheme({
  overrides: {
    MuiPaper: {
      root: {
        padding: '1.5rem 2rem',
      },
    },
  },
});

const TeamsPage = ({ data }) => {
  const title = 'Csapatok';

  return (
    <div>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <CoverImage src={PageCoverImageSrc} />

      <ArticleContainer title={title}>
        <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
          <Grid container>
            {data.allMarkdownRemark.edges.map(({ node: team }) => {
              const thumbnail = team.thumbnail && team.thumbnail.resolutions;

              return (
                <Grid item xs={12} key={team.frontmatter.title}>
                  <Card
                    {...css({
                      borderLeft: `1rem solid ${team.frontmatter.color ||
                        theme.palette.primary[500]}`,
                    })}
                  >
                    <article>
                      <Grid container alignItems="center" spacing={24}>
                        <Grid item xs={12} md={4}>
                          <div
                            {...css({
                              [theme.breakpoints.down('md')]: {
                                height: '14rem',
                                marginBottom: 0,
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                width: '14rem',
                              },
                              [theme.breakpoints.up('md')]: {
                                ...ASPECT_RATIO_1_1,
                              },
                              background: IMAGE_OVERLAY_TINT,
                              borderRadius: '50%',
                              margin: '1rem 0',
                              position: 'relative',
                            })}
                          >
                            {thumbnail && (
                              <Link to={team.fields.slug} {...css({ textDecoration: 'none' })}>
                                <CardMedia
                                  component="img"
                                  {...thumbnail}
                                  {...css({
                                    borderRadius: '50%',
                                    position: 'absolute',
                                  })}
                                />
                              </Link>
                            )}
                          </div>
                        </Grid>
                        <Grid item xs={12} md={8}>
                          <CardContent>
                            <Link to={team.fields.slug} {...css({ textDecoration: 'none' })}>
                              <Typography type="headline" component="h2" gutterBottom>
                                {team.frontmatter.title}
                              </Typography>
                              <Typography paragraph>
                                {team.frontmatter.excerpt != null
                                  ? team.frontmatter.excerpt
                                  : team.excerpt}
                              </Typography>
                            </Link>

                            {typeof team.frontmatter.email === 'string' &&
                              team.frontmatter.email.length > 0 && (
                                <Typography type="subheading">
                                  <FaEnvelope />{' '}
                                  <a href={`mailto:${team.frontmatter.email}`}>
                                    {team.frontmatter.email}
                                  </a>
                                </Typography>
                              )}
                            {typeof team.frontmatter.facebookHandle === 'string' &&
                              team.frontmatter.facebookHandle.length > 0 && (
                                <Typography type="subheading">
                                  <FaFacebookOfficial />{' '}
                                  <a
                                    href={`https://facebook.com/${team.frontmatter.facebookHandle}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {team.frontmatter.facebookHandle}
                                  </a>
                                </Typography>
                              )}
                          </CardContent>
                        </Grid>
                      </Grid>
                    </article>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </MuiThemeProvider>
      </ArticleContainer>
    </div>
  );
};

TeamsPage.propTypes = {
  data: PropTypes.shape({}).isRequired,
};

export default TeamsPage;

export const query = graphql`
  query TeamsPageQuery {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/teams/" }, frontmatter: { draft: { ne: true } } }
      sort: { fields: [frontmatter___title] }
    ) {
      edges {
        node {
          fields {
            slug
          }
          excerpt
          frontmatter {
            title
            email
            facebookHandle
            color
            excerpt
          }
          thumbnail: childImageSharp {
            resolutions(width: 240, height: 240) {
              src
              srcSet
            }
          }
        }
      }
    }
  }
`;
