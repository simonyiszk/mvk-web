import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import Container from '../components/Container';
import Layout from '../components/Layout';
import styles from './blog-post.module.scss';

const BlogPostTemplate = ({ data }) => {
  const post = data.markdownRemark;

  return (
    <Layout>
      {/* TODO: Query default cover image from GraphQL */}
      <img src={post.frontmatter.thumbnail} alt="" className={styles.cover} />

      <Container>
        <Paper className={styles.contentContainer}>
          <Typography variant="headline" gutterBottom>
            {post.frontmatter.title}
          </Typography>

          <Typography
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </Paper>
      </Container>
    </Layout>
  );
};

BlogPostTemplate.propTypes = {
  data: PropTypes.shape.isRequired,
};

export default BlogPostTemplate;

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        thumbnail
      }
    }
  }
`;
