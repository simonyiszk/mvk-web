import { css } from 'glamor';
import PropTypes from 'prop-types';
import React from 'react';

const Container = ({ children, ...props }) => (
  <div
    {...css({ margin: '0 auto', maxWidth: '90vw', padding: '1.5rem 0', width: '50rem' })}
    {...props}
  >
    {children}
  </div>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
