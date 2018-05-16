import Typography from '@material-ui/core/Typography';
import React from 'react';
import Container from '../components/Container';
import Layout from '../components/Layout';

const NotFoundPage = () => (
  <Layout>
    <Container>
      <Typography variant="headline" gutterBottom>
        Az oldal nem található
      </Typography>

      <p>A kért oldal nem érhető el.</p>
    </Container>
  </Layout>
);

export default NotFoundPage;
