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

const Loader = () => {
  const onClickReadTempus = useCallback(() => {
    window.open('???', '_blank');
  }, []);

  return (
    <div className="connected-wallet-box loader">
      <div className="loader-title">
        We are hard work minting your very own Ser
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
  const [whitelist, setWhitelist] = useState<any>({});
  const [tickets, setTickets] = useState<number>(0);
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
    if (provider && connectedAddress) {
      setShowLoading(true);

      setTimeout(() => {
        setShowLoading(false);
      }, 20 * 1000);

      // ACTUAL IMPLEMENTATION
      // const tempusSersContract = new ethers.Contract(
      //   config.tempusSersContractAddress,
      //   TEMPUS_SERS_ABI,
      //   provider.getSigner()
      // );

      // console.log('whitelist.get(connectedAddress!.toLowerCase()):');
      // console.log(connectedAddress!.toLowerCase());
      // console.log(whitelist.get(connectedAddress!.toLowerCase()));

      // // TODO: IMPORTANT take latest by checking which were claimed
      // // const nextTicket = mockWhiteList[connectedAddress.toLowerCase()][0];
      // const nextTicket = whitelist[connectedAddress.toLowerCase()][0];

      // const result = await tempusSersContract.redeemTicket(
      //   connectedAddress,
      //   nextTicket.batch,
      //   nextTicket.ticketId,
      //   nextTicket.sig
      // );
      // console.log('result', result);
    }
  }, [provider, connectedAddress, setShowLoading]);

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

  if (showLoading) {
    return <Loader />;
  }

  return connectedAddress ? (
    <div className="connected-wallet-box">
      <div className="connectedAddress">{shortenAccount(connectedAddress)}</div>
      <div>tickets remaining: {tickets}</div>
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
