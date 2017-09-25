import { css } from 'glamor';
import PropTypes from 'prop-types';
import React from 'react';
import MVKLogoImage from '../assets/mvk-logo.svg';

const MVKLogo = ({ white, ...props }) => (
  <img
    alt="MVK logó"
    src={MVKLogoImage}
    {...css({
      filter: white && 'brightness(0) invert(1)',
      userSelect: 'none',
    })}
    {...props}
  />
);

MVKLogo.propTypes = {
  white: PropTypes.bool,
};

MVKLogo.defaultProps = {
  white: false,
};

export default MVKLogo;
