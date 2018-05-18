import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import Layout from '../components/Layout';
import PageContainer from '../components/PageContainer';
import styles from './blog-post.module.scss';

const BlogPostTemplate = ({ data }) => {
  const post = data.markdownRemark;

  return (
    <Layout>
      <PageContainer
        title={post.frontmatter.title}
        coverImageSrc={post.frontmatter.thumbnail}
      >
        <Paper className={styles.contentBody}>
          <Typography
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </Paper>
      </PageContainer>
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
