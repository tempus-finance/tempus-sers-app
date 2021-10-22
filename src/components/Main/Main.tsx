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
    window.open('https://tempus.finance/', '_blank');
  }, []);

  return (
    <Grid
      justifyContent="space-between"
      alignItems="center"
      container
      spacing={0}
    >
      <Grid item xs={12} sm={6} md={6} lg={6}>
        <header className="hero">
          <p className="title">Mint Your Ser Here</p>
        </header>
      </Grid>
      <Grid className="connect-wallet" item xs={12} sm={6} md={6} lg={5}>
        <ConnectWallet />
      </Grid>
      <Grid item xs={12}>
        <p className="limited-640">
          Find out what Tempus is all about and check out how you can gain your
          own Ser
        </p>
      </Grid>
      <Grid item xs={12} sm={12} md={6} lg={6}>
        <div className="cta-buttons">
          <Fab
            onClick={onDiscordClick}
            variant="extended"
            size="large"
            color="primary"
            aria-label="add"
            className="cta-button-discord"
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
            className="cta-button-tempus"
          >
            <TempusLogo /> tempus
          </Fab>
        </div>
      </Grid>
    </Grid>
  );
};

export default Main;
