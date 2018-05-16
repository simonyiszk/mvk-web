import PropTypes from 'prop-types';
import React from 'react';

const ExternalLink = ({ to, children, ...props }) => (
  <a {...props} href={to} target="_blank" rel="noopener noreferrer">
    {children}
  </a>
);

ExternalLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default ExternalLink;
