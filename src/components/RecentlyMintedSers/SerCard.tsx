import { FC, useCallback } from 'react';
import { Grid, Typography, Card, CardMedia, CardContent } from '@mui/material';
import shortenAccount from '../../utils/shortenAddress';

import './RecentlyMintedSers.css';

type SerCardInProps = {
  id: number;
  address: string;
};

const SerCard: FC<SerCardInProps> = (props: SerCardInProps) => {
  const { id, address } = props;

  const handleClick = useCallback(() => {
    const url = `https://kovan.etherscan.io/token/${address}`; // TODO check this address
    const target = '_blank';
    const features = 'rel="noreferrer"';
    window.open(url, target, features)?.focus();
  }, [address]);

  return (
    <Grid item xs={3}>
      <Card key={id} onClick={handleClick} className="ser-card">
        <CardMedia
          component="img"
          image={`/TempSerz/${id}.png`}
          alt={address}
          title={address}
        />
        <CardContent>
          <Typography variant="subtitle1" component="div">
            ID: {id}
          </Typography>
          <Typography variant="subtitle2" component="div">
            {shortenAccount(address)}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default SerCard;
