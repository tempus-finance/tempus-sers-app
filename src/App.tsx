import React from 'react';
import { Container, Grid, Fab } from '@mui/material';
// import logo from './logo.svg';
import './App.css';
import Main from './components/Main/Main';
import RecentlyMintedSers from './components/RecentlyMintedSers/RecentlyMintedSers';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      {/* <Card className="hero" sx={{ minWidth: 275 }}>
        <CardHeader className="App-header" title="Mint Your Tempus Sers Here" />
      </Card> */}

        <Main />
        <RecentlyMintedSers />
      
    </div>
  );
}

export default App;
