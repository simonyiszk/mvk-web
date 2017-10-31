import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import ArticleContainer from '../components/article-container';
import CoverImage from '../components/cover-image';

const BlogPostTemplate = ({ data }) => {
  const post = data.markdownRemark;
  const image = post.frontmatter.image && post.frontmatter.image.childImageSharp.responsiveSizes;

  return (
    <div>
      <Helmet>
        <title>{post.frontmatter.title}</title>
        <meta
          name="description"
          content={post.frontmatter.excerpt != null ? post.frontmatter.excerpt : post.excerpt}
        />
      </Helmet>

      <CoverImage {...image} />

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
        image {
          childImageSharp {
            responsiveSizes {
              src
              srcSet
            }
          }
        }
      }
    }
  }
`;
