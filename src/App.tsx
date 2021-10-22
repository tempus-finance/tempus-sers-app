import { FC, useMemo } from 'react';
import { Container } from '@mui/material';
import './App.css';
import Main from './components/Main/Main';
import RecentlyMintedSers from './components/RecentlyMintedSers/RecentlyMintedSers';
import Header from './components/Header/Header';
import UserSers from './components/RecentlyMintedSers/UserSers';

const App: FC = () => {
  const isProviderAvailable = useMemo(() => (window as any).ethereum, []);

  return (
    <Container maxWidth="sm" className="main">
      <Header />
      <Main />
      <UserSers />
      {isProviderAvailable && <RecentlyMintedSers />}
    </Container>
  );
};

export default App;
