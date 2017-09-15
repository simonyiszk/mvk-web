import { css } from 'glamor';
import PropTypes from 'prop-types';
import React from 'react';
import { ASPECT_RATIO_21_9_RELATIVE_HEIGHT, headerBackground } from '../utils/presets';

const CoverImage = ({ src, ...props }) => (
  <div
    {...css({
      background: headerBackground,
      height: `${ASPECT_RATIO_21_9_RELATIVE_HEIGHT}vw`,
      marginBottom: '-10rem',
    })}
  >
    {src != null && (
      <img
        alt="Borító"
        src={src}
        {...css({
          height: '100%',
          objectFit: 'cover',
          width: '100%',
        })}
        {...props}
      />
    )}
  </div>
);

CoverImage.propTypes = {
  src: PropTypes.string,
};

CoverImage.defaultProps = {
  src: null,
};

export default CoverImage;
