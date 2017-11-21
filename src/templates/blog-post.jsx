import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import ArticleContainer from '../components/article-container';
import CoverImage from '../components/cover-image';

const BlogPostTemplate = ({ data }) => {
  const post = data.markdownRemark;
  const thumbnail = post.frontmatter.thumbnail && post.frontmatter.thumbnail.childImageSharp.sizes;

  return (
    <div>
      <Helmet>
        <title>{post.frontmatter.title}</title>
        <meta
          name="description"
          content={post.frontmatter.excerpt != null ? post.frontmatter.excerpt : post.excerpt}
        />
      </Helmet>

      <CoverImage {...thumbnail} />

      <ArticleContainer title={post.frontmatter.title}>
        <Paper dangerouslySetInnerHTML={{ __html: post.html }} />
      </ArticleContainer>
    </div>
  );
};

BlogPostTemplate.propTypes = {
  data: PropTypes.shape({}).isRequired,
};

export default BlogPostTemplate;

export const query = graphql`
  query BlogPostTemplateQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      frontmatter {
        title
        excerpt
        thumbnail {
          childImageSharp {
            sizes {
              src
              srcSet
            }
          }
        }
      }
    }
  }
`;
