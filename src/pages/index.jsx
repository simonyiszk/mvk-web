import Link from 'gatsby-link';
import { css } from 'glamor';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import ConferenceImage from '../assets/conference.jpg';
import Container from '../components/container';
import MVKLogo from '../components/mvk-logo';
import { ASPECT_RATIO_4_3, IMAGE_OVERLAY_TINT } from '../utils/presets';

const IndexPage = ({ data }) => {
  const title = 'Hírek';
  const posts = data.allMarkdownRemark;

  return (
    <div>
      <div
        {...css({
          alignItems: 'center',
          backgroundImage: `${IMAGE_OVERLAY_TINT}, url(${ConferenceImage})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          display: 'flex',
          height: '100vh',
        })}
      >
        <MVKLogo
          {...css({
            background: 'white',
            height: '12.5vh',
            maxWidth: 'calc(100% - 4rem)',
            minHeight: '3.5rem',
            padding: '2rem',
          })}
        />
      </div>

      <Container>
        <Typography type="headline" align="center" gutterBottom>
          {title}
        </Typography>

        <Grid container>
          {posts.edges.map(({ node: post }) => {
            const image =
              post.frontmatter.image && post.frontmatter.image.childImageSharp.resolutions;

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
                      {image && (
                        <CardMedia
                          component="img"
                          {...image}
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

IndexPage.propTypes = {
  data: PropTypes.shape({}).isRequired,
};

export default IndexPage;

export const query = graphql`
  query IndexPageQuery {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/news/" }, frontmatter: { draft: { ne: true } } }
      limit: 6
      sort: { fields: [frontmatter___date], order: DESC }
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
            image {
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
