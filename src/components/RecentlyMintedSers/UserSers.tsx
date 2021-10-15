import { FC } from 'react';
import { Container, Grid } from '@mui/material';
import SerCard from './SerCard';

const sers = [{ id: 1, address: '0xAFE0B5E1bF4b9230A53e4A4715074ABf5B45F5de' }];

const UserSers: FC = () => {
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
        {sers.map((ser: { id: number; address: string }) => (
          <SerCard key={ser.id} id={ser.id} address={ser.address} />
        ))}
      </Grid>
    </Container>
  );
};

export default UserSers;
