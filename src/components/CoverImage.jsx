import PropTypes from 'prop-types';
import React from 'react';
import styles from './CoverImage.module.scss';

const CoverImage = ({ src, className, style, ...props }) => (
  <div
    className={`${styles.root} ${className}`}
    style={{
      background: `
        linear-gradient(to bottom, transparent 61.8%, rgba(0, 0, 0, 0.618)),
        url(${src}) center / cover
      `,
      ...style,
    }}
    {...props}
  />
);

CoverImage.propTypes = {
  src: PropTypes.string.isRequired,
  className: PropTypes.string,
  style: PropTypes.shape,
};

CoverImage.defaultProps = {
  className: '',
  style: {},
};

export default CoverImage;
