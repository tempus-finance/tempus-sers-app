import { ethers } from 'ethers';
import { JsonRpcProvider } from '@ethersproject/providers';
import TEMPUS_SERS_ABI from '../abi/TempusSersAbi.json';
import * as config from '../config';
import { MerkleTree } from "merkletreejs";
import * as keccak256 from "keccak256";

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

  async claimSer(connectedAddress: string, whitelist: any, ticketId: number): Promise<boolean> {
    if (this.provider && connectedAddress) {
      const tempusSersContract = new ethers.Contract(
        config.tempusSersContractAddress,
        TEMPUS_SERS_ABI,
        this.provider.getSigner()
      );
      
      const whitelistTree = encodeBatchWhitelist(whitelist.whitelist, whitelist.batch, whitelist.supply, whitelist.baseTokenURI)
      const proof = whitelistTree.getHexProof(encodeLeaf(connectedAddress, whitelist.batch, whitelist.supply, ticketId));
      await tempusSersContract.proveTicket(connectedAddress, whitelist.batch, ticketId, proof);

      // TODO what's the type of result?
      return true;
    }

    return false;
  }

  async getRecentlyMintedSers() {
    const tempusSersContract = new ethers.Contract(
      config.tempusSersContractAddress,
      TEMPUS_SERS_ABI,
      this.provider!
    );

    const filter = tempusSersContract.filters.Transfer(ethers.constants.AddressZero, null, null);
    const serMintEvents = await tempusSersContract.queryFilter(filter);
    
    return serMintEvents.map( e => {
      const { to: mintedTo, tokenId } = (e as any).args;
      const baseUri = config.sersBaseUri.endsWith('/') ? config.sersBaseUri : `${config.sersBaseUri}/`;
      return { tokenUri: `${baseUri}${tokenId.toString()}.png`, mintedTo, tokenId: parseInt(tokenId.toString()) };
    });
  }

  async getUserOwnedTokens(connectedAddress: string) : Promise<any[]> {
    const tempusSersContract = new ethers.Contract(
      config.tempusSersContractAddress,
      TEMPUS_SERS_ABI,
      this.provider!
    );

    const ownedTokens = [];
    while (true) {
      try {
        const token: any = await tempusSersContract.tokenOfOwnerByIndex(connectedAddress, ownedTokens.length);
        const baseUri = config.sersBaseUri.endsWith('/') ? config.sersBaseUri : `${config.sersBaseUri}/`;
        const tokenId = parseInt(token.toString());
        ownedTokens.push({ id: tokenId, tokenUri: `${baseUri}${tokenId.toString()}.png` });
      }
      catch (e: any) {
        if (e.data && e.data.message && e.data.message.includes("owner index out of bounds")) {
          return ownedTokens
        }
        throw e;
      }

    }
  }

  async isTicketClaimed(batchId: number, ticketId: number) {
    const tempusSersContract = new ethers.Contract(
      config.tempusSersContractAddress,
      TEMPUS_SERS_ABI,
      this.provider!
    );

    return tempusSersContract.claimedTickets(batchId, ticketId);
  }
}

function encodeLeaf(recipient:string, batch:number, supply:number, ticketId: any) {
  return ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode([ "address", "uint256", "uint256", "uint256" ], [ recipient, batch, supply, ticketId ]));
}

function encodeBatchWhitelist(whitelist: string[], batch: number, supply: number, baseTokenURI: string) {
  const leaves = whitelist.map((a, idx) => encodeLeaf(a, batch, supply, idx + 1));
  
  const uriHash = ethers.utils.keccak256(ethers.utils.defaultAbiCoder.encode([ "string" ], [ baseTokenURI ]));
  leaves.push(encodeLeaf(ethers.constants.AddressZero, batch, supply, uriHash));

  return new MerkleTree(leaves, keccak256, { hashLeaves: false, sortPairs: true });
}

export default SersDataProvider;
