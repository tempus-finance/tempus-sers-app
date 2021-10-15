import { Grid } from '@mui/material';
import TheSersLogo from './TheSersLogo';
import './Header.css';

const Header = () => {
  return (
    <Grid
      justifyContent="space-between"
      alignItems="center"
      container
      spacing={0}
      className="header"
    >
      <Grid item xs={9}>
        <TheSersLogo />
      </Grid>
    </Grid>
  );
};

export default Header;
