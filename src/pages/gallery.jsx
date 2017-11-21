import Link from 'gatsby-link';
import { css } from 'glamor';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import Container from '../components/container';
import CoverImage from '../components/cover-image';
import { ASPECT_RATIO_4_3, IMAGE_OVERLAY_TINT } from '../utils/presets';

const GalleryPage = ({ data }) => {
  const title = 'Galéria';
  const posts = data.allMarkdownRemark;

  return (
    <div>
      <Helmet>
        <title>{title}</title>
      </Helmet>

      <CoverImage />

      {/* TODO: Handle CoverImage-related margins better */}
      <Container {...css({ marginTop: '10rem !important' })}>
        <Typography type="headline" align="center" gutterBottom>
          {title}
        </Typography>

        {/* TODO: Abstract the logic below into a new component */}
        <Grid container>
          {posts.edges.map(({ node: post }) => {
            const thumbnail =
              post.frontmatter.thumbnail && post.frontmatter.thumbnail.childImageSharp.resolutions;

            return (
              <Grid item xs={12} sm={6} md={4} key={post.fields.slug}>
                <Link to={post.fields.slug} {...css({ textDecoration: 'none' })}>
                  <Card {...css({ height: '100%' })}>
                    <div
                      {...css({
                        ...ASPECT_RATIO_4_3,
                        background: IMAGE_OVERLAY_TINT,
                        position: 'relative',
                      })}
                    >
                      {thumbnail && (
                        <CardMedia
                          component="img"
                          {...thumbnail}
                          {...css({
                            height: '100%',
                            objectFit: 'cover',
                            position: 'absolute',
                          })}
                        />
                      )}
                    </div>
                    <CardContent>
                      <Typography type="title">{post.frontmatter.title}</Typography>
                      <Typography color="secondary">{post.frontmatter.date}</Typography>
                      <Typography>
                        {post.frontmatter.excerpt != null ? post.frontmatter.excerpt : post.excerpt}
                      </Typography>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
};

GalleryPage.propTypes = {
  data: PropTypes.shape({}).isRequired,
};

export default GalleryPage;

export const query = graphql`
  query GalleryPageQuery {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/gallery/" }, frontmatter: { draft: { ne: true } } }
      sort: { fields: [frontmatter___date, frontmatter___title], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
          }
          excerpt(pruneLength: 80)
          frontmatter {
            title
            date(formatString: "YYYY-MM-DD")
            excerpt
            thumbnail {
              childImageSharp {
                resolutions(width: 540, height: 405) {
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
