import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import Lightbox from 'react-images';
import Gallery from 'react-photo-gallery';
import ArticleContainer from '../components/article-container';
import CoverImage from '../components/cover-image';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      isLightboxOpen: false,
      currentImage: 0,
    };

    this.handleGalleryClick = this.handleGalleryClick.bind(this);
    this.closeLightbox = this.closeLightbox.bind(this);
    this.lightboxGoToPrev = this.lightboxGoToPrev.bind(this);
    this.lightboxGoToNext = this.lightboxGoToNext.bind(this);
    this.lightboxGoToIndex = this.lightboxGoToIndex.bind(this);
    this.handleClickThumbnail = this.handleClickThumbnail.bind(this);
    this.handleLightboxClickImage = this.handleLightboxClickImage.bind(this);
  }

  handleGalleryClick(event, obj) {
    this.setState({
      currentImage: obj.index,
      isLightboxOpen: true,
    });
  }

  closeLightbox() {
    this.setState({
      currentImage: 0,
      isLightboxOpen: false,
    });
  }

  lightboxGoToPrev() {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }

  lightboxGoToNext() {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }

  lightboxGoToIndex(index) {
    this.setState({
      currentImage: index,
    });
  }

  handleClickThumbnail(event) {
    event.preventDefault();
    this.setState({
      isLightboxOpen: true,
    });
  }

  handleLightboxClickImage() {
    if (this.state.currentImage < this.props.images.length - 1) {
      this.lightboxGoToNext();
    }
  }

  render() {
    const { images } = this.props;
    const { isLightboxOpen, currentImage } = this.state;

    return (
      <div>
        <Gallery photos={images} onClick={this.handleGalleryClick} />
        <Lightbox
          images={images}
          isOpen={isLightboxOpen}
          currentImage={currentImage}
          backdropClosesModal
          showImageCount={false}
          closeButtonTitle="Bezárás (Esc)"
          leftArrowTitle="Előző (Balra nyíl)"
          rightArrowTitle="Következő (Jobbra nyíl)"
          onClose={this.closeLightbox}
          onClickPrev={this.lightboxGoToPrev}
          onClickNext={this.lightboxGoToNext}
          onClickImage={this.handleLightboxClickImage}
        />
      </div>
    );
  }
}

Album.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const AlbumTemplate = ({ data }) => {
  const post = data.markdownRemark;
  const thumbnail = post.thumbnail && post.thumbnail.sizes;
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

      <CoverImage {...thumbnail} />

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
      }
      thumbnail: childImageSharp {
        sizes {
          src
          srcSet
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
