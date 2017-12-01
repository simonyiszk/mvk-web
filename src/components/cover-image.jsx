import { css } from 'glamor';
import PropTypes from 'prop-types';
import React from 'react';
import ConferenceImage from '../assets/conference.jpg';
import { ASPECT_RATIO_21_9_RELATIVE_HEIGHT, IMAGE_OVERLAY_TINT } from '../utils/presets';

const CoverImage = ({
  sizes, src, srcSet, ...props
}) => (
  <div
    {...css({
      background: IMAGE_OVERLAY_TINT,
      height: `${ASPECT_RATIO_21_9_RELATIVE_HEIGHT}vw`,
      marginBottom: '-10rem',
    })}
    {...props}
  >
    {src != null && (
      <div {...css({ height: '100%', position: 'relative' })}>
        <img
          alt=""
          sizes={sizes}
          src={src}
          srcSet={srcSet}
          {...css({
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
            width: '100%',
          })}
        />

        <div
          {...css({
            background: 'linear-gradient(transparent 62%, rgba(0, 0, 0, 0.62))',
            height: '100%',
            position: 'relative',
          })}
        />
      </div>
    )}
  </div>
);

CoverImage.propTypes = {
  sizes: PropTypes.string,
  src: PropTypes.string,
  srcSet: PropTypes.string,
};

CoverImage.defaultProps = {
  sizes: null,
  src: ConferenceImage,
  srcSet: null,
};

export default CoverImage;
