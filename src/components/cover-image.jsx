import { css } from 'glamor';
import PropTypes from 'prop-types';
import React from 'react';
import { ASPECT_RATIO_21_9_RELATIVE_HEIGHT } from '../utils/presets';

const CoverImage = ({ src, ...props }) => (
  <div
    {...css({
      background: 'linear-gradient(137.51deg, rgba(39, 170, 225, 0.7), rgba(227, 210, 0, 0.6))',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      height: `${ASPECT_RATIO_21_9_RELATIVE_HEIGHT}vw`,
      marginBottom: '-10rem',
      position: 'relative',
    })}
  >
    {src != null && (
      <img
        alt="Borító"
        src={src}
        {...css({
          height: '100%',
          objectFit: 'cover',
          position: 'absolute',
          width: '100%',
        })}
        {...props}
      />
    )}

    <div
      {...css({
        background: 'linear-gradient(transparent 62%, rgba(0, 0, 0, 0.62))',
        height: '100%',
        position: 'relative',
      })}
    />
  </div>
);

CoverImage.propTypes = {
  src: PropTypes.string,
};

CoverImage.defaultProps = {
  src: null,
};

export default CoverImage;
