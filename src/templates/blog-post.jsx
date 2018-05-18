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
      <div
        className={styles.cover}
        style={{
          background: `
            linear-gradient(to bottom, transparent 61.8%, rgba(0, 0, 0, 0.618)),
            url(${post.frontmatter.thumbnail})
          `,
          backgroundSize: 'cover',
        }}
      >
        <Container className={styles.titleContainer}>
          <Typography variant="headline" gutterBottom className={styles.title}>
            {post.frontmatter.title}
          </Typography>
        </Container>
      </div>

      <Container>
        <Paper className={styles.contentBody}>
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
