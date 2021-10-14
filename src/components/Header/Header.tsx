import { useCallback } from 'react';
import { Fab, Grid } from '@mui/material';
import TempusLogo from './tempusLogo';
import './Header.css';

const Header = () => {
  const onCtaClick = useCallback(() => {
    // do something
  }, []);

  return (
    <Grid
      justifyContent="space-between"
      alignItems="center"
      container
      spacing={0}
      className="header"
    >
      <Grid item xs={9}>
        <TempusLogo fillColor="black" />
      </Grid>
      <Grid item xs={3}>
        <div className="header-cta">
          <Fab
            onClick={onCtaClick}
            variant="extended"
            size="large"
            color="secondary"
            aria-label="add"
          >
            Call to Action Text
          </Fab>
        </div>
      </Grid>
    </Grid>
  );
};

export default Header;
