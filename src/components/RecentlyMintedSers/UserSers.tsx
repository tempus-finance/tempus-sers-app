import React from 'react';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from '@mui/material';

const sers = [{ id: 1, name: '0xAbcdsdsaafsadasdasdas' }];

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

const UserSers = () => {
  return (
    <Container
      maxWidth="lg"
      className="RecentlyMintedSers"
      style={{ backgroundColor: 'yellow', paddingBottom: '10px' }}
    >
      <h2>User Serz</h2>
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
};

export default UserSers;
