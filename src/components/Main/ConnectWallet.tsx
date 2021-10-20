import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
import { Fab } from '@mui/material';
import TEMPUS_SERS_ABI from '../../abi/TempusSersAbi.json';
import shortenAccount from '../../utils/shortenAddress';
import * as config from '../../config';
import Spinner from '../Spinner';

import './Main.css';
import getSersDataProvider from '../../services/getSersDataProvider';


const Loader = () => {
  const onClickReadTempus = useCallback(() => {
    window.open('???', '_blank');
  }, []);

  return (
    <div className="connected-wallet-box loader">
      <div className="loader-title">
        Ser birth is in progress...
      </div>
      <div className="loader-svg">
        <Spinner />
      </div>
      <div>
        <Fab
          onClick={onClickReadTempus}
          variant="extended"
          size="large"
          color="primary"
          aria-label="add"
        >
          <span className="connectWallet">Read About Tempus</span>
        </Fab>
      </div>
    </div>
  );
};

const ConnectWallet = () => {
  const [provider, setProvider] = useState<Web3Provider | null>(null);
  const [connectedSigner, setConnectedSigner] = useState<JsonRpcSigner | null>(
    null
  );
  const [connectedAddress, setConnectedAddress] = useState<string>('');
  const [whitelists, setWhitelists] = useState<any>([]);
  const [availableTickets, setAvailableTickets] = useState<any>([]);
  const [showLoading, setShowLoading] = useState<boolean>(false);

  const onWalletConnect = useCallback(async () => {
    if (provider) {
      await provider.send('eth_requestAccounts', []);
      const connectedSigner = provider.getSigner();
      const connectedAddress = await connectedSigner.getAddress();
      if (connectedSigner) {
        setConnectedSigner(connectedSigner);
      }

      if (connectedAddress) {
        setConnectedAddress(connectedAddress);
      }
    }
  }, [provider]);

  const onClaimSer = useCallback(async () => {
    if (provider && connectedAddress && availableTickets.length > 0) {
      setShowLoading(true);

      const [ticket] = availableTickets; /// use ticket at index 0
      await getSersDataProvider(provider).claimSer(connectedAddress, whitelists.find((w: any) => w.batch === ticket.batch), ticket.ticketId);
      setShowLoading(false);
    }
  }, [provider, availableTickets, connectedAddress, setShowLoading]);

  useEffect(() => {
    if (!provider) {
      try {
        const newProvider = new ethers.providers.Web3Provider(
          (window as any).ethereum,
          'any'
        );
        setProvider(newProvider);
      } catch (error: any) {
        console.error('ConnectWallet', error);
      }
    }
  }, [provider]);

  useEffect(() => {
    const populateWhiteLists = async () => {
      const whitelistResponses = await Promise.all(config.whitelistUris.map(uri => axios.get(uri)));
      setWhitelists(whitelistResponses.map(res => res.data));
    };

    if (whitelists.length === 0) {
      populateWhiteLists();
    }
  }, [whitelists, setWhitelists]);

  useEffect(() => {
    async function fetchAvailableTickets() {
      const tickets = whitelists
        .map((whitelist: any) => whitelist.whitelist.map((address: string, idx: number) => ({ ticketId: idx + 1, address, batch: whitelist.batch, supply: whitelist.supply })))
        .flat();
      
      const userAddress = connectedAddress.toLowerCase();
      const sersDataProvider = getSersDataProvider(provider as Web3Provider);
      const availableTickets: any[] = [];
      for (const ticket of tickets) {
        
        if (ticket.address.toLowerCase() === userAddress && !(await sersDataProvider.isTicketClaimed(ticket.batch, ticket.ticketId))) {
          availableTickets.push(ticket);
        }
      }

      console.log("availableTickets");
      console.log(availableTickets);
      setAvailableTickets(availableTickets);
    }

    if (connectedAddress && whitelists.length) {
      fetchAvailableTickets();
    }
  }, [connectedAddress, whitelists, setAvailableTickets]);

  if (showLoading) {
    return <Loader />;
  }

  return connectedAddress ? (
    <div className="connected-wallet-box">
      <div className="connectedAddress">{shortenAccount(connectedAddress)}</div>
      <div>Available tickets: {availableTickets.length}</div>
      <Fab
        onClick={onClaimSer}
        variant="extended"
        size="large"
        color="primary"
        aria-label="add"
      >
        <span className="connectWallet">Claim your Ser</span>
      </Fab>
    </div>
  ) : (
    <div className="connected-wallet-button">
      <Fab
        onClick={onWalletConnect}
        variant="extended"
        size="large"
        color="primary"
        aria-label="add"
      >
        <span className="connectWallet">Connect Wallet</span>
      </Fab>
    </div>
  );
};

export default ConnectWallet;
