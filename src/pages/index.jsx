import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link, StaticQuery } from 'gatsby';
import React from 'react';
import Container from '../components/Container';
import Layout from '../components/Layout';
import MVKLogoURL from '../data/assets/mvk-logo.svg';
import styles from './index.module.scss';

const IndexPage = () => (
  <Layout>
    {/* TODO: Query hero image from GraphQL */}
    <div className={styles.hero}>
      <img src={MVKLogoURL} alt="" className={styles.logo} />
    </div>

    <Container>
      <Typography variant="headline" gutterBottom align="center">
        Hírek
      </Typography>

      <StaticQuery
        query={graphql`
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
        `}
        render={staticData =>
          staticData.allMarkdownRemark.edges.map(({ node }) => (
            <Link to={node.fields.slug} className={styles.newsItemLink}>
              <Card key={node.id}>
                <CardMedia
                  image={node.frontmatter.thumbnail}
                  className={styles.newsItemMedia}
                />

                <CardContent>
                  <Typography variant="headline" component="h2">
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
          ))
        }
      />
    </Container>
  </Layout>
);

export default IndexPage;
