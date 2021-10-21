import { FC, useCallback } from 'react';
import { Typography, Card, CardMedia, CardContent } from '@mui/material';
import shortenAccount from '../../utils/shortenAddress';

import './RecentlyMintedSers.css';

type SerCardInProps = {
  id: number;
  imageUri: string;
  address?: string;
  additionalClasses?: string[];
};

const SerCard: FC<SerCardInProps> = (props: SerCardInProps) => {
  const { id, address, imageUri, additionalClasses = [] } = props;

  const handleClick = useCallback(() => {
    const url = `https://opensea.io/assets/0x2e5ac807ed31c33db08d53c0b1b90547d5104e66/${address}`; // TODO: IMPORTANT check this address
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
          image={imageUri}
          alt={address}
          title={address}
        />
        <CardContent className="ser-item-description">
          <Typography variant="subtitle1" component="div">
            #{id}
          </Typography>
          { address ? <div><Typography variant="subtitle1" component="div">
            Minted to
          </Typography>
          <Typography variant="subtitle2" component="div">
            {shortenAccount(address)}
          </Typography></div> : null }
          
        </CardContent>
      </Card>
    </div>
  );
};

export default SerCard;
