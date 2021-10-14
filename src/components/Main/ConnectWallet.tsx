import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
import { Container, Fab } from '@mui/material';
import TEMPUS_SERS_ABI from '../../abi/TempusSersAbi.json';
import * as config from '../../config';

import './ConnectWallet.css';

// TODO: IMPORTANT replace with state whitelist;
const mockWhitelist: { [address: string]: any } = {
  ['0xAFE0B5E1bF4b9230A53e4A4715074ABf5B45F5de'.toLowerCase()]: [
    {
      ticketId: 1,
      batch: 0,
      sig: '0x1234567890abcdef',
    },
    {
      ticketId: 2,
      batch: 1,
      sig: '0x2234567890abcdef',
    },
  ],
};

const ConnectWallet = () => {
  const [provider, setProvider] = useState<Web3Provider | null>(null);
  const [connectedSigner, setConnectedSigner] = useState<JsonRpcSigner | null>(
    null
  );
  const [connectedAddress, setConnectedAddress] = useState<string>('');
  const [whitelist, setWhitelist] = useState<any>({});
  const [tickets, setTickets] = useState<number>(0);

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
    if (provider && connectedAddress) {
      const tempusSersContract = new ethers.Contract(
        config.tempusSersContractAddress,
        TEMPUS_SERS_ABI,
        provider.getSigner()
      );

      console.log('whitelist.get(connectedAddress!.toLowerCase()):');
      console.log(connectedAddress!.toLowerCase());
      console.log(whitelist.get(connectedAddress!.toLowerCase()));

      // TODO: IMPORTANT take latest by checking which were claimed
      // const nextTicket = mockWhiteList[connectedAddress.toLowerCase()][0];
      const nextTicket = whitelist[connectedAddress.toLowerCase()][0];

      const result = await tempusSersContract.redeemTicket(
        connectedAddress,
        nextTicket.batch,
        nextTicket.ticketId,
        nextTicket.sig
      );
      console.log('result', result);
    }
  }, [connectedAddress, provider, whitelist]);

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
    const populateWhiteList = async () => {
      const whitelistResponse = await axios.get(config.whitelistUri);
      if (whitelistResponse) {
        console.log('whitelistResponse.data', whitelistResponse.data);
        setWhitelist(whitelistResponse.data);
      }
    };

    if (!whitelist) {
      populateWhiteList();
    }
  }, [whitelist, setWhitelist]);

  useEffect(() => {
    if (connectedAddress && whitelist[connectedAddress.toLowerCase()]) {
      setTickets(whitelist[connectedAddress.toLowerCase()].length);
    } else {
      setTickets(0);
    }
  }, [connectedAddress, whitelist, setTickets]);

  // let shortConnectedAddress;
  // if (connectedAddress) {
  //   shortConnectedAddress = shortenAccount(connectedAddress);
  // }

  return connectedAddress ? (
    <div className="connectedWalletBox">
      <h4>Wallet</h4>
      <h4 className="connectedAddress" style={{ textAlign: 'center' }}>
        {connectedAddress}
      </h4>
      <h4>
        You have {tickets} {tickets === 1 ? 'ticket' : 'tickets'}
      </h4>
      <Fab
        onClick={onClaimSer}
        variant="extended"
        size="large"
        color="primary"
        aria-label="add"
      >
        <span className="connectWallet">Claim Ser</span>
      </Fab>
    </div>
  ) : (
    <div className="connectWalletButton">
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

// function shortenAccount(account: string) {
//   return `${account.substring(0, 6)}...${account.substring(
//     account.length - 5,
//     account.length
//   )}`;
// }
