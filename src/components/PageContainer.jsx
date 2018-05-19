import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import Container from './Container';
import CoverImage from './CoverImage';
import styles from './PageContainer.module.scss';

const PageContainer = ({ title, coverImageSrc, children, ...props }) => (
  <React.Fragment>
    <CoverImage
      // TODO: Query default cover image from GraphQL
      src={coverImageSrc || '/assets/uploads/default-cover.jpg'}
      className={styles.cover}
    >
      <Container className={styles.titleContainer}>
        <Typography variant="headline" gutterBottom className={styles.title}>
          {title}
        </Typography>
      </Container>
    </CoverImage>

    <Container {...props}>{children}</Container>
  </React.Fragment>
);

PageContainer.propTypes = {
  title: PropTypes.string.isRequired,
  coverImageSrc: PropTypes.string,
  children: PropTypes.node.isRequired,
};

PageContainer.defaultProps = {
  coverImageSrc: '',
};

export default PageContainer;
