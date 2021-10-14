import { FC } from 'react';
import { Container } from '@mui/material';
import './App.css';
import Main from './components/Main/Main';
import RecentlyMintedSers from './components/RecentlyMintedSers/RecentlyMintedSers';
import Header from './components/Header/Header';

const App: FC = () => {
  return (
    <Container maxWidth="sm" className="main">
      <Header />
      <Main />
      <RecentlyMintedSers />
    </Container>
  );
};

export default App;
