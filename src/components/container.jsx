import { css } from 'glamor';
import React from 'react';

const Container = ({ ...props }) => (
  <div
    {...css({
      margin: '0 auto',
      maxWidth: '90vw',
      padding: '1.5rem 0',
      position: 'relative',
      width: '50rem',
    })}
    {...props}
  />
);

export default Container;
