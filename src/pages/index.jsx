import Link from 'gatsby-link';
import { css } from 'glamor';
import PropTypes from 'prop-types';
import React from 'react';
import BMEBuildingKImage from '../assets/bme-building-k.jpg';
import MVKLogoImage from '../assets/mvk-logo.svg';
import Container from '../components/container';

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

      <Container {...css({ '& h1, & h2, & h3, & h4, & h5, & h6': { textAlign: 'center' } })}>
        <h1>Hírek</h1>
        {posts.edges.map(({ node: post }) => (
          <div key={post.fields.slug}>
            <Link
              to={post.fields.slug}
              {...css({ color: 'inherit !important', textDecoration: 'none' })}
            >
              <h2>
                {post.frontmatter.title} <span>— {post.frontmatter.date}</span>
              </h2>
              <p>{post.excerpt}</p>
            </Link>
          </div>
        ))}
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
          }
        }
      }
    }
  }
`;
