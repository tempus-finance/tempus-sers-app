import { FC, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import SerCard from './SerCard';

import './RecentlyMintedSers.css';
import getSersDataProvider from '../../services/getSersDataProvider';
import { ethers } from 'ethers';

// const sers = [
//   { id: 1, address: '0xAFE0B5E1bF4b9230A53e4A4715074ABf5B45F5de' },
//   { id: 2, address: '0xAFE0B5E1bF4b9230A53e4A4715074ABf5B45F5de' },
//   { id: 3, address: '0xAFE0B5E1bF4b9230A53e4A4715074ABf5B45F5de' },
//   { id: 4, address: '0xAFE0B5E1bF4b9230A53e4A4715074ABf5B45F5de' },
//   { id: 5, address: '0xAFE0B5E1bF4b9230A53e4A4715074ABf5B45F5de' },
//   { id: 6, address: '0xAFE0B5E1bF4b9230A53e4A4715074ABf5B45F5de' },
//   { id: 7, address: '0xAFE0B5E1bF4b9230A53e4A4715074ABf5B45F5de' },
//   { id: 8, address: '0xAFE0B5E1bF4b9230A53e4A4715074ABf5B45F5de' },
//   { id: 9, address: '0xAFE0B5E1bF4b9230A53e4A4715074ABf5B45F5de' },
//   { id: 10, address: '0xAFE0B5E1bF4b9230A53e4A4715074ABf5B45F5de' },
// ];

const RecentlyMintedSers: FC = () => {
  const [recentlyMintedSers, setRecentlyMintedSers] = useState<any[]>([]);

  useEffect(() => {
    async function fetchRecentlyMintedSers() {
      const response = await getSersDataProvider(
        new ethers.providers.Web3Provider((window as any).ethereum, 'any')
      ).getRecentlyMintedSers();
      setRecentlyMintedSers(response);
    }
    if (recentlyMintedSers.length === 0) {
      fetchRecentlyMintedSers();
    }
  }, [recentlyMintedSers, setRecentlyMintedSers]);

  return (
    <div className="recently-minted-sers">
      <h2>Recently Born Sers </h2>
      <h3>Total number of Sers minted</h3>
      <h3>{recentlyMintedSers.length} out of 3333</h3>
      <Grid
        justifyContent="flex-start"
        alignItems="center"
        container
        spacing={8}
      >
        {/* {sers.map((ser: { id: number; address: string }) => (
          <Grid item xs={3} key={ser.id}>
            <SerCard id={ser.id} address={ser.address} />
          </Grid>
        ))} */}
        {recentlyMintedSers.map(
          (ser: { tokenId: number; tokenUri: string; mintedTo: string }) => (
            <Grid item xs={3} key={ser.tokenId}>
              <SerCard
                id={ser.tokenId}
                address={ser.mintedTo}
                imageUri={ser.tokenUri}
              />
            </Grid>
          )
        )}
      </Grid>
    </div>
  );
};

export default RecentlyMintedSers;
