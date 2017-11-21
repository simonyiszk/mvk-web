import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import Lightbox from 'react-images';
import Gallery from 'react-photo-gallery';
import ArticleContainer from '../components/article-container';
import CoverImage from '../components/cover-image';

class Album extends React.Component {
  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string.isRequired,
      srcSet: PropTypes.arrayOf(PropTypes.string),
    })),
  };

  static defaultProps = {
    images: [],
  };

  state = {
    currentImage: 0,
    isLightboxOpen: false,
  };

  handleGalleryClick = (event, obj) => {
    this.setState({
      currentImage: obj.index,
      isLightboxOpen: true,
    });
  };

  handleLightboxClose = () => {
    this.setState({
      currentImage: 0,
      isLightboxOpen: false,
    });
  };

  handleLightboxClickPrev = () => {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  };

  handleLightboxClickNext = () => {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  };

  render() {
    const { images } = this.props;

    return (
      <div>
        <Gallery photos={images} onClick={this.handleGalleryClick} />
        <Lightbox
          images={images}
          onClose={this.handleLightboxClose}
          onClickPrev={this.handleLightboxClickPrev}
          onClickNext={this.handleLightboxClickNext}
          currentImage={this.state.currentImage}
          isOpen={this.state.isLightboxOpen}
        />
      </div>
    );
  }
}

const AlbumTemplate = ({ data }) => {
  const post = data.markdownRemark;
  const image = post.frontmatter.image && post.frontmatter.image.childImageSharp.sizes;
  const images =
    data.allImageSharp != null
      ? data.allImageSharp.edges.map(({ node }) => ({ ...node.original, ...node.sizes }))
      : [];

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
        <Paper>
          {/* eslint-disable react/no-danger */}
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
          {/* eslint-enable react/no-danger */}

          <Album
            images={images.map(({ srcSet, ...rest }) => ({
              srcSet: srcSet.split('\n'),
              ...rest,
            }))}
          />
        </Paper>
      </ArticleContainer>
    </div>
  );
};

AlbumTemplate.propTypes = {
  data: PropTypes.shape({}).isRequired,
};

export default AlbumTemplate;

export const query = graphql`
  query AlbumTemplateQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      excerpt
      frontmatter {
        title
        excerpt
        image {
          childImageSharp {
            sizes {
              src
              srcSet
            }
          }
        }
      }
    }
    allImageSharp(filter: { id: { regex: $slug } }, sort: { fields: [id] }) {
      edges {
        node {
          original {
            width
            height
          }
          sizes {
            src
            srcSet
          }
        }
      }
    }
  }
`;
