import Link from 'gatsby-link';
import { css } from 'glamor';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import BMEBuildingKImage from '../assets/bme-building-k.jpg';
import MVKLogoImage from '../assets/mvk-logo.svg';
import Container from '../components/container';
import { ASPECT_RATIO_4_3 } from '../utils/presets';

const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark;

  return (
    <div>
      <div
        {...css({
          alignItems: 'center',
          backgroundImage: `linear-gradient(137.51deg, rgba(39, 170, 225, 0.7), rgba(227, 210, 0, 0.6)), url(${BMEBuildingKImage})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          display: 'grid',
          height: '100vh',
        })}
      >
        <img
          src={MVKLogoImage}
          alt="MVK logó"
          {...css({
            background: 'white',
            boxSizing: 'border-box',
            height: '20vh',
            margin: '0',
            maxWidth: '100%',
            minHeight: '7rem',
            padding: '2rem',
          })}
        />
      </div>

      <Container {...css({ '& a': { textDecoration: 'none' } })}>
        <h1 {...css({ textAlign: 'center' })}>Hírek</h1>

        <Grid container>
          {posts.edges.map(({ node: post }) => (
            <Grid item xs={4}>
              <Link to={post.fields.slug}>
                <Card key={post.fields.slug}>
                  <CardMedia
                    image={
                      post.frontmatter.image &&
                      post.frontmatter.image.childImageSharp.responsiveSizes.src
                    }
                    {...css({
                      ...ASPECT_RATIO_4_3,
                    })}
                  />
                  <CardContent>
                    <Typography type="headline" component="h2">
                      {post.frontmatter.title}
                    </Typography>
                    <Typography type="body1" color="secondary">
                      {post.frontmatter.date}
                    </Typography>
                    <Typography
                      component="p"
                      {...css({
                        height: '40px', // TODO: Use lineHeight * 2
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        overflowWrap: 'break-word',
                      })}
                    >
                      {post.excerpt}
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
                responsiveSizes {
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
