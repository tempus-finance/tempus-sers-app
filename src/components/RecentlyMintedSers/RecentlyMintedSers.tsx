import React from 'react';
import {
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
} from '@mui/material';

import './RecentlyMintedSers.css';

const sers = [
  { id: 1, name: 'Ser Cumberbatch Lolzalot' },
  { id: 2, name: 'Ser Cumberbatch Lolzalot' },
  { id: 3, name: 'Ser Cumberbatch Lolzalot' },
  { id: 4, name: 'Ser Cumberbatch Lolzalot' },
  { id: 5, name: 'Ser Cumberbatch Lolzalot' },
  { id: 6, name: 'Ser Cumberbatch Lolzalot' },
  { id: 7, name: 'Ser Cumberbatch Lolzalot' },
  { id: 8, name: 'Ser Cumberbatch Lolzalot' },
  { id: 9, name: 'Ser Cumberbatch Lolzalot' },
  { id: 10, name: 'Ser Cumberbatch Lolzalot' },
];

const serCard = (serData: { id: number; name: string }) => (
  <Grid item xs={3}>
    <Card key={serData.id}>
      <CardMedia
        component="img"
        image={`/TempSerz/${serData.id}.png`}
        alt={serData.name}
      />
      <CardContent>
        <Typography variant="subtitle1" component="div">
          {serData.name}
        </Typography>
      </CardContent>
    </Card>
  </Grid>
);

export default class RecentlyMintedSers extends React.Component {
  render() {
    return (
      <Container maxWidth="lg" className="RecentlyMintedSers">
        <h2>Recently Born Serz</h2>
        <Grid
          justifyContent="flex-start"
          alignItems="center"
          container
          spacing={8}
        >
          {sers.map(serCard)}
        </Grid>
      </Container>
    );
  }
}
