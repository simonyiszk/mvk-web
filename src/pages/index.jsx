import Typography from '@material-ui/core/Typography';
import React from 'react';
import Container from '../components/Container';
import Layout from '../components/Layout';
import MVKLogoURL from '../data/assets/mvk-logo.svg';
import styles from './index.module.scss';

const IndexPage = () => (
  <Layout>
    {/* TODO: Query hero image from GraphQL */}
    <div className={styles.hero}>
      <img src={MVKLogoURL} alt="" className={styles.logo} />
    </div>

    <Container>
      <Typography variant="headline" gutterBottom align="center">
        Hírek
      </Typography>
    </Container>
  </Layout>
);

export default IndexPage;
