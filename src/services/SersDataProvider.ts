import { ethers } from 'ethers';
import { JsonRpcProvider } from '@ethersproject/providers';
import TEMPUS_SERS_ABI from '../abi/TempusSersAbi.json';
import * as config from '../config';

type SersDataProviderParameters = {
  provider: JsonRpcProvider;
};

class SersDataProvider {
  private provider: JsonRpcProvider | null = null;

  init({ provider }: SersDataProviderParameters) {
    this.provider = provider;
  }

  async getTicketsLeft(): Promise<number> {
    return 5;
  }

  async claimSer(connectedAddress: string, whitelist: any): Promise<boolean> {
    if (this.provider && connectedAddress) {
      const tempusSersContract = new ethers.Contract(
        config.tempusSersContractAddress,
        TEMPUS_SERS_ABI,
        this.provider.getSigner()
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

      // TODO what's the type of result?
      return true;
    }

    return false;
  }
}

export default SersDataProvider;
