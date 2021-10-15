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
            <svg
              width="15"
              height="20"
              viewBox="0 0 15 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.462 0.114713C14.3005 0.0297793 14.1188 -0.00925627 13.9367 0.00185115C13.7545 0.0129586 13.5789 0.0737838 13.429 0.177713L0.428977 9.17771C0.296536 9.27014 0.188374 9.39319 0.113688 9.53639C0.0390014 9.67959 0 9.83871 0 10.0002C0 10.1617 0.0390014 10.3208 0.113688 10.464C0.188374 10.6072 0.296536 10.7303 0.428977 10.8227L13.429 19.8227C13.579 19.9265 13.7546 19.9873 13.9367 19.9985C14.1188 20.0097 14.3004 19.9708 14.462 19.8862C14.6237 19.8015 14.759 19.6742 14.8535 19.5182C14.9479 19.3621 14.9979 19.1832 14.998 19.0007V1.00071C14.998 0.818176 14.9481 0.639113 14.8536 0.482932C14.7591 0.326751 14.6237 0.199411 14.462 0.114713ZM12.998 17.0917L2.75498 10.0007L12.998 2.90971V17.0917Z"
                fill="black"
              />
            </svg>
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
            <svg
              width="15"
              height="20"
              viewBox="0 0 15 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.53607 19.8853C0.697562 19.9702 0.879248 20.0093 1.06137 19.9981C1.2435 19.987 1.4191 19.9262 1.56907 19.8223L14.5691 10.8223C14.7015 10.7299 14.8097 10.6068 14.8844 10.4636C14.959 10.3204 14.998 10.1613 14.998 9.99979C14.998 9.83828 14.959 9.67916 14.8844 9.53596C14.8097 9.39276 14.7015 9.26972 14.5691 9.17729L1.56907 0.177285C1.41905 0.0734776 1.24348 0.0126897 1.06139 0.00150368C0.879291 -0.00968233 0.697605 0.0291594 0.536001 0.113824C0.374398 0.198488 0.239035 0.325749 0.144569 0.481825C0.0501031 0.637902 0.000133819 0.816847 7.2233e-05 0.999285L7.06594e-05 18.9993C4.05625e-05 19.1818 0.0499746 19.3609 0.144459 19.5171C0.238943 19.6732 0.374372 19.8006 0.53607 19.8853ZM2.00007 2.90829L12.2431 9.99929L2.00007 17.0903L2.00007 2.90829Z"
                fill="black"
              />
            </svg>
          </div>
        </div>
      </Grid>
    </div>
  );
};

export default UserSers;
