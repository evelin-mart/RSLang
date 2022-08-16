import React from 'react';
import './index.scss';
import { withProviders } from './providers';
import { Routing } from 'pages';
import { Container } from '@mui/material';

function App() {
  return (
    <Container maxWidth="lg" className="app">
      <Routing />
    </Container>
  );
}

export default withProviders(App);
