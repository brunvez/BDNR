import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import './Cache.css';
import AddCache from './AddCache';
import FetchCache from './FetchCache';

export default function Cache() {

  return (
    <Container maxWidth="md">
      <Grid container spacing={4}>
        <Grid item sm={6}>
          <AddCache/>
        </Grid>
        <Grid item sm={6}>
          <FetchCache/>
        </Grid>
      </Grid>
    </Container>
  )
}
