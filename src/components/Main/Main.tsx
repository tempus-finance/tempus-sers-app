import { FC, useCallback } from 'react';
import { Grid, Fab } from '@mui/material';
import './Main.css';
import ConnectWallet from './ConnectWallet';
import DiscordIcon from './DiscordIcon';
import TempusLogo from './tempusLogo';

const Main: FC = () => {
  const onDiscordClick = useCallback(() => {
    window.open('https://discord.com/invite/6gauHECShr', '_blank');
  }, []);

  const onTempusClick = useCallback(() => {
    window.open('https://testnet.tempus.finance/', '_blank');
  }, []);

  return (
    <Grid
      justifyContent="space-between"
      alignItems="center"
      container
      spacing={0}
    >
      <Grid item xs={7}>
        <header className="hero">
          <p className="title">Mint Your Ser Here</p>
          <p>
            Find out what Tempus is all about and check out how you can gain
            your own Ser
          </p>
          <div className="cta-container">
            <Fab
              onClick={onDiscordClick}
              variant="extended"
              size="large"
              color="primary"
              aria-label="add"
            >
              <DiscordIcon />
              Discord
            </Fab>
            <Fab
              onClick={onTempusClick}
              variant="extended"
              size="large"
              color="primary"
              aria-label="add"
            >
              <TempusLogo /> tempus
            </Fab>
          </div>
        </header>
      </Grid>
      <Grid className="connectWalletBox" item xs={5}>
        <ConnectWallet />
      </Grid>
    </Grid>
  );
};

export default Main;
