import { FC, useCallback, useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import SerCard from './SerCard';

const sers = [
  { id: 1, address: '0xAFE0B5E1bF4b9230A53e4A4715074ABf5B45F5de' },
  { id: 2, address: '0xAFE0B5E1bF4b9230A53e4A4715074ABf5B45F5de' },
  { id: 3, address: '0xAFE0B5E1bF4b9230A53e4A4715074ABf5B45F5de' },
  { id: 4, address: '0xAFE0B5E1bF4b9230A53e4A4715074ABf5B45F5de' },
  { id: 5, address: '0xAFE0B5E1bF4b9230A53e4A4715074ABf5B45F5de' },
  { id: 6, address: '0xAFE0B5E1bF4b9230A53e4A4715074ABf5B45F5de' },
  { id: 7, address: '0xAFE0B5E1bF4b9230A53e4A4715074ABf5B45F5de' },
];

const UserSers: FC = () => {
  const [localSers, setLocalSers] = useState<any[]>([]);
  const onClickLeft = useCallback(() => {
    setLocalSers((prevSers) => {
      const [first, ...rest] = prevSers;
      return [...rest, first];
    });
  }, [setLocalSers]);

  const onClickRight = useCallback(() => {
    setLocalSers((prevSers) => {
      const newSers = [...prevSers];
      const lastSer = newSers.pop();
      return [lastSer, ...newSers];
    });
  }, [setLocalSers]);

  useEffect(() => {
    if (localSers.length === 0) {
      setLocalSers(sers);
    }
  }, [localSers, setLocalSers]);

  return (
    <div className="user-sers" style={{ paddingBottom: '10px' }}>
      <h2>User Serz</h2>
      <Grid
        justifyContent="flex-start"
        alignItems="center"
        container
        spacing={8}
      >
        <div className="ser-card-carousel">
          <div
            className="carousel-controls carousel-controls-left"
            onClick={onClickLeft}
          >
            &#8612;
          </div>
          {localSers.map((ser: { id: number; address: string }) => (
            <SerCard
              key={ser.id}
              id={ser.id}
              address={ser.address}
              additionalClasses={['carousel']}
            />
          ))}
          <div
            className="carousel-controls carousel-controls-right"
            onClick={onClickRight}
          >
            &#8614;
          </div>
        </div>
      </Grid>
    </div>
  );
};

export default UserSers;
