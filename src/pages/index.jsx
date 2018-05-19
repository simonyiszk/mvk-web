import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import Container from '../components/Container';
import Layout from '../components/Layout';
import MVKLogoURL from '../data/assets/mvk-logo.svg';
import styles from './index.module.scss';

const IndexPage = ({ data }) => (
  <Layout
    backgroundOverlayAlphaOnWindowScrolledToTop={0}
    brandLogoDisplayWindowScollYThreshold={0}
  >
    {/* TODO: Query hero image from GraphQL */}
    <div className={styles.hero}>
      <img src={MVKLogoURL} alt="" className={styles.logo} />
    </div>

    <Container>
      <Typography variant="headline" gutterBottom align="center">
        Hírek
      </Typography>

      <Grid container spacing={24}>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <Grid item key={node.id} xs={12} sm={6}>
            <Link to={node.fields.slug} className={styles.newsItemLink}>
              <Card className={styles.newsItemCard}>
                <CardMedia
                  image={node.frontmatter.thumbnail}
                  className={styles.newsItemMedia}
                />

                <CardContent>
                  <Typography variant="title">
                    {node.frontmatter.title}
                  </Typography>

                  <Typography
                    variant="subheading"
                    gutterBottom
                    color="textSecondary"
                  >
                    {node.frontmatter.date}
                  </Typography>

                  <Typography>{node.excerpt}</Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  </Layout>
);

IndexPage.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default IndexPage;

export const query = graphql`
  query IndexPageQuery {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/news/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "LL", locale: "hu")
            thumbnail
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`;
