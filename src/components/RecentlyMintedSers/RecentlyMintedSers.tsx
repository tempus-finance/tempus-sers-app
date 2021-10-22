import { FC, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { ethers } from 'ethers';

import SerCard from './SerCard';
import './RecentlyMintedSers.css';
import getSersDataProvider from '../../services/getSersDataProvider';
import * as config from '../../config';


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
        {recentlyMintedSers
        .map((item,idx) => recentlyMintedSers[recentlyMintedSers.length-1-idx])
        .slice(0, config.recentlyBornSersElementsNum)
        .map(
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
