import { FC } from 'react';
import { Grid } from '@mui/material';
import SerCard from './SerCard';

import './RecentlyMintedSers.css';

const sers = [
  { id: 1, address: '0xAFE0B5E1bF4b9230A53e4A4715074ABf5B45F5de' },
  { id: 2, address: '0xAFE0B5E1bF4b9230A53e4A4715074ABf5B45F5de' },
  { id: 3, address: '0xAFE0B5E1bF4b9230A53e4A4715074ABf5B45F5de' },
  { id: 4, address: '0xAFE0B5E1bF4b9230A53e4A4715074ABf5B45F5de' },
  { id: 5, address: '0xAFE0B5E1bF4b9230A53e4A4715074ABf5B45F5de' },
  { id: 6, address: '0xAFE0B5E1bF4b9230A53e4A4715074ABf5B45F5de' },
  { id: 7, address: '0xAFE0B5E1bF4b9230A53e4A4715074ABf5B45F5de' },
  { id: 8, address: '0xAFE0B5E1bF4b9230A53e4A4715074ABf5B45F5de' },
  { id: 9, address: '0xAFE0B5E1bF4b9230A53e4A4715074ABf5B45F5de' },
  { id: 10, address: '0xAFE0B5E1bF4b9230A53e4A4715074ABf5B45F5de' },
];

const RecentlyMintedSers: FC = () => {
  return (
    <div className="recently-minted-sers">
      <h2>Recently Born Serz</h2>
      <Grid
        justifyContent="flex-start"
        alignItems="center"
        container
        spacing={8}
      >
        {sers.map((ser: { id: number; address: string }) => (
          <Grid item xs={3} key={ser.id}>
            <SerCard id={ser.id} address={ser.address} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default RecentlyMintedSers;
