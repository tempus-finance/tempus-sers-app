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
  { id: 1, name: '0xAbcdsdsaafsadasdasdas' },
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
    <a
      href="https://kovan.etherscan.io/token/0xf0d0eb522cfa50b716b3b1604c4f0fa6f04376ad"
      target="_blank"
      rel="noreferrer"
    >
      <Card key={serData.id}>
        <CardMedia
          component="img"
          image={`/TempSerz/${serData.id}.png`}
          alt={serData.name}
        />
        <CardContent>
          <Typography variant="subtitle1" component="div">
            ID: {serData.id}
          </Typography>
          <Typography variant="subtitle2" component="div">
            Owner: {serData.name}
          </Typography>
        </CardContent>
      </Card>
    </a>
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
