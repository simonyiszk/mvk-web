import Link from 'gatsby-link';
import { css } from 'glamor';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import Shiitake from 'shiitake';
import BMEBuildingKImage from '../assets/bme-building-k.jpg';
import MVKLogoImage from '../assets/mvk-logo.svg';
import Container from '../components/container';
import { ASPECT_RATIO_4_3, IMAGE_OVERLAY_TINT } from '../utils/presets';

const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark;

  return (
    <div>
      <div
        {...css({
          alignItems: 'center',
          backgroundImage: `${IMAGE_OVERLAY_TINT}, url(${BMEBuildingKImage})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          display: 'flex',
          height: '100vh',
        })}
      >
        <img
          src={MVKLogoImage}
          alt="MVK logó"
          {...css({
            background: 'white',
            height: '12.5vh',
            maxWidth: 'calc(100% - 4rem)',
            minHeight: '3.5rem',
            padding: '2rem',
            userSelect: 'none',
          })}
        />
      </div>

      <Container {...css({ '& a': { textDecoration: 'none' } })}>
        <Typography type="headline" align="center" color="inherit" gutterBottom>
          Hírek
        </Typography>

        <Grid container>
          {posts.edges.map(({ node: post }) => (
            <Grid item xs={12} sm={6} md={4} key={post.fields.slug}>
              <Link to={post.fields.slug}>
                <Card {...css({ height: '100%' })}>
                  <CardMedia
                    image={
                      post.frontmatter.image
                        ? post.frontmatter.image.childImageSharp.responsiveSizes.src
                        : `), ${IMAGE_OVERLAY_TINT.slice(0, -1)}` // TODO: Substitute with a non-hacky solution as soon as possible
                    } // TODO: Add support for responsive images
                    {...css({
                      ...ASPECT_RATIO_4_3,
                    })}
                  />
                  <CardContent>
                    <Typography type="title">
                      <Shiitake lines={2}>{post.frontmatter.title}</Shiitake>
                    </Typography>
                    <Typography color="secondary">{post.frontmatter.date}</Typography>
                    <Typography component="div">
                      <Shiitake lines={2}>{post.excerpt}</Shiitake>
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
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
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "YYYY-MM-DD")
            image {
              childImageSharp {
                responsiveSizes(maxWidth: 400) {
                  src
                }
              }
            }
          }
        }
      }
    }
  }
`;
