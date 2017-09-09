import { css } from 'glamor';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import Container from '../components/container';
import { headerBackground } from '../utils/presets';

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

      {/* Enforce 21:9 aspect ratio for cover images */}
      <div
        {...css({
          background: headerBackground,
          height: '42.86vw',
          position: 'absolute',
          width: '100%',
        })}
      >
        {image != null && (
          <img
            alt="Featured (TODO)"
            src={image.src}
            srcSet={image.srcSet}
            {...css({
              height: '100%',
              objectFit: 'cover',
              width: '100%',
            })}
          />
        )}
      </div>

      <Container>
        <article {...css({ marginTop: 'calc(42.86vw - 10rem)', position: 'relative' })}>
          <h1
            {...css({
              color: 'white',
              margin: '0 0 0.4em 0',
              textTransform: 'uppercase',
            })}
          >
            {post.frontmatter.title}
          </h1>

          {/* eslint-disable react/no-danger */}
          <Paper dangerouslySetInnerHTML={{ __html: post.html }} {...css({ padding: '5rem' })} />
          {/* eslint-enable react/no-danger */}
        </article>
      </Container>
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
      frontmatter {
        title
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
