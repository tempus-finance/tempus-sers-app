import { FC, useCallback } from 'react';
import { Typography, Card, CardMedia, CardContent } from '@mui/material';
import shortenAccount from '../../utils/shortenAddress';

import './RecentlyMintedSers.css';

type SerCardInProps = {
  id: number;
  address: string;
  additionalClasses?: string[];
};

const SerCard: FC<SerCardInProps> = (props: SerCardInProps) => {
  const { id, address, additionalClasses = [] } = props;

  const handleClick = useCallback(() => {
    const url = `https://kovan.etherscan.io/token/${address}`; // TODO check this address
    const target = '_blank';
    const features = 'rel="noreferrer"';
    window.open(url, target, features)?.focus();
  }, [address]);

  const classNames = ['ser-card', ...additionalClasses].join(' ');

  return (
    <div className="ser-item">
      <Card key={id} onClick={handleClick} className={classNames}>
        <CardMedia
          component="img"
          image={`/TempSerz/${id}.png`}
          alt={address}
          title={address}
        />
        <CardContent className="ser-item-description">
          <Typography variant="subtitle1" component="div">
            #{id}
          </Typography>
          <Typography variant="subtitle1" component="div">
            Minted to
          </Typography>
          <Typography variant="subtitle2" component="div">
            {shortenAccount(address)}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default SerCard;
