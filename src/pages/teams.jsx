import Link from 'gatsby-link';
import { css } from 'glamor';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import ArticleContainer from '../components/article-container';
import CoverImage from '../components/cover-image';
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

      {/* TODO: Add a cover image */}
      <CoverImage />

      <ArticleContainer title={title}>
        <MuiThemeProvider theme={theme} sheetsManager={new Map()}>
          <Grid container>
            {data.allMarkdownRemark.edges.map(({ node: team }) => {
              const image =
                team.frontmatter.image &&
                team.frontmatter.image.childImageSharp.responsiveResolution;

              return (
                <Grid item xs={12} key={team.frontmatter.title}>
                  {/* eslint-disable jsx-a11y/anchor-is-valid */}
                  <Link to={team.fields.slug} {...css({ textDecoration: 'none' })}>
                    {/* eslint-enable jsx-a11y/anchor-is-valid */}
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
                              {image && (
                                <CardMedia
                                  component="img"
                                  {...image}
                                  {...css({
                                    borderRadius: '50%',
                                    position: 'absolute',
                                  })}
                                />
                              )}
                            </div>
                          </Grid>
                          <Grid item xs={12} md={8}>
                            <CardContent>
                              <Typography type="headline" component="h2" gutterBottom>
                                {team.frontmatter.title}
                              </Typography>
                              <Typography paragraph>
                                {team.frontmatter.excerpt != null
                                  ? team.frontmatter.excerpt
                                  : team.excerpt}
                              </Typography>
                              {team.frontmatter.email != null && (
                                <Typography type="subheading" component="address">
                                  E-mail:{' '}
                                  <a href={`mailto:${team.frontmatter.email}`}>
                                    {team.frontmatter.email}
                                  </a>
                                </Typography>
                              )}
                            </CardContent>
                          </Grid>
                        </Grid>
                      </article>
                    </Card>
                  </Link>
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
            color
            excerpt
            image {
              childImageSharp {
                responsiveResolution(width: 240, height: 240) {
                  src
                  srcSet
                }
              }
            }
          }
        }
      }
    }
  }
`;
