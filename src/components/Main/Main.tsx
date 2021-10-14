import React from 'react';
import { Container, Grid, Fab } from '@mui/material';
import { ethers, Signer } from "ethers";
import axios from "axios";
import * as config from "../../config";
import './Main.css';

type State = {
  whitelist: any[],
  provider: ethers.providers.Web3Provider,
  connectedSigner?: Signer | null,
  connectedAddress?: string | null
};

const whitelist: Map<string, any> = new Map()// TODO: IMPORTANT replace with this.state.whitelist;
/// TODO: IMPORTANT must be lowerCased
whitelist.set("0xAFE0B5E1bF4b9230A53e4A4715074ABf5B45F5de".toLowerCase(), [
  {
    ticketId: 1,
    batch: 0,
    sig: "0x1234567890abcdef"
  },
  {
    ticketId: 2,
    batch: 1,
    sig: "0x2234567890abcdef"
  }
]);

const TEMPUS_SERS_ABI = [ { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "approved", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" } ], "name": "ApprovalForAll", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "string", "name": "_value", "type": "string" }, { "indexed": true, "internalType": "uint256", "name": "_id", "type": "uint256" } ], "name": "PermanentURI", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "Transfer", "type": "event" }, { "inputs": [], "name": "MAX_SUPPLY", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "batch", "type": "uint256" }, { "internalType": "bytes32", "name": "uriCommitment", "type": "bytes32" }, { "internalType": "uint256", "name": "supply", "type": "uint256" } ], "name": "addBatch", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "approve", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "owner", "type": "address" } ], "name": "balanceOf", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "baseTokenURI", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "baseTokenURICommitment", "outputs": [ { "internalType": "bytes32", "name": "", "type": "bytes32" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "batchSupply", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "claimedTickets", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "getApproved", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" } ], "name": "isApprovedForAll", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "name", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "nextBatch", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "originalMinter", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "ownerOf", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "batch", "type": "uint256" }, { "internalType": "uint256", "name": "ticketId", "type": "uint256" }, { "internalType": "bytes", "name": "signature", "type": "bytes" } ], "name": "redeemTicket", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "batch", "type": "uint256" }, { "internalType": "string", "name": "_baseTokenURI", "type": "string" } ], "name": "revealBatch", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "bytes", "name": "_data", "type": "bytes" } ], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" } ], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "batch", "type": "uint256" } ], "name": "setSeed", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "shuffleSeed", "outputs": [ { "internalType": "uint32", "name": "", "type": "uint32" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" } ], "name": "supportsInterface", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "batch", "type": "uint256" }, { "internalType": "uint256", "name": "ticketId", "type": "uint256" } ], "name": "ticketToTokenId", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "index", "type": "uint256" } ], "name": "tokenByIndex", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "index", "type": "uint256" } ], "name": "tokenOfOwnerByIndex", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "tokenURI", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "transferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" } ];

export default class Main extends React.Component<{}, State> {
    constructor(props: any) {
      super(props);
      this.state = {
        connectedSigner: null,
        connectedAddress: null,
        provider: new ethers.providers.Web3Provider((window as any).ethereum, "any"),
        whitelist: []
      };
    }
    async componentDidMount() {
      const whitelistResponse = await axios.get(config.whitelistUri);
      this.setState({ whitelist: whitelistResponse.data });
      console.log("whitelistResponse.data")
      console.log(whitelistResponse.data)
    }

    async onWalletConnect() {
      // Prompt user for account connections
      await this.state.provider.send("eth_requestAccounts", []);
      const connectedSigner = this.state.provider.getSigner();
      const connectedAddress = await connectedSigner.getAddress();
      this.setState({ connectedSigner, connectedAddress });
    }

    async onClaimSer() {
      const { connectedAddress } = this.state;
      const tempusSersContract = new ethers.Contract(config.tempusSersContractAddress, TEMPUS_SERS_ABI, this.state.provider.getSigner());
      
      console.log("whitelist.get(connectedAddress!.toLowerCase()):")
      console.log(connectedAddress!.toLowerCase())
      console.log(whitelist.get(connectedAddress!.toLowerCase()))
      const nextTicket = whitelist.get(connectedAddress!.toLowerCase())[0] /// TODO: IMPORTANT take latest by checking which were claimed
      const res = await tempusSersContract.redeemTicket(connectedAddress, nextTicket.batch, nextTicket.ticketId, nextTicket.sig)
      console.log("res")
      console.log(res)
    }
    
    shortConnectedAddress() {
      const { connectedAddress } = this.state;
      return connectedAddress!.substr(0,6) + "..." + connectedAddress!.substr(connectedAddress!.length - 4);
    }

    render() {
      return (<Container className="main">
      <Grid justifyContent="space-between" alignItems="center" container spacing={0}>
        <Grid item xs={5}>
          <header className="hero">
            <p>Mint Your Tempus Sers Here</p>
          </header>
        </Grid>
        {/* { this.state.connectedSigner ? <span>{this.state.connectedAddress} is Connected</span> : <span>Not connected</span> } */}
        <Grid className="connectWalletBox" item xs={4}>
        <svg className="arrow" width="404" height="256" viewBox="0 0 404 256" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M234.393 135.65L232.924 134.292L234.393 135.65ZM397.887 96.2145C398.225 95.1631 397.648 94.0362 396.596 93.6974L379.464 88.1766C378.413 87.8378 377.286 88.4154 376.947 89.4668C376.608 90.5181 377.186 91.645 378.237 91.9838L393.466 96.8912L388.559 112.12C388.22 113.171 388.797 114.298 389.849 114.637C390.9 114.976 392.027 114.398 392.366 113.347L397.887 96.2145ZM160.606 116.873L158.676 117.398L160.606 116.873ZM240.712 127.894L239.094 126.718L240.712 127.894ZM345.302 121.579L346.215 123.359L345.302 121.579ZM186.279 165.629L185.537 163.772L186.279 165.629ZM4.63368 157.059C5.84538 157.505 7.05968 157.947 8.27645 158.385L9.63129 154.622C8.42394 154.187 7.21891 153.748 6.0163 153.305L4.63368 157.059ZM15.5966 160.957C18.0416 161.795 20.4955 162.613 22.9576 163.412L24.1912 159.607C21.7507 158.815 19.3176 158.004 16.8929 157.173L15.5966 160.957ZM30.362 165.741C32.8374 166.496 35.3201 167.228 37.8094 167.936L38.9039 164.089C36.4394 163.388 33.9806 162.662 31.5284 161.915L30.362 165.741ZM45.3003 169.988C47.8062 170.647 50.3178 171.28 52.8341 171.886L53.77 167.997C51.2818 167.398 48.7976 166.772 46.3181 166.119L45.3003 169.988ZM60.4092 173.62C62.9444 174.17 65.4835 174.691 68.0259 175.179L68.7809 171.251C66.2706 170.769 63.7626 170.255 61.2576 169.711L60.4092 173.62ZM75.6815 176.552C78.243 176.977 80.8068 177.369 83.372 177.725L83.9217 173.763C81.3928 173.412 78.8643 173.026 76.3371 172.606L75.6815 176.552ZM91.0957 178.686C93.6796 178.97 96.264 179.216 98.8481 179.422L99.1658 175.435C96.6226 175.232 94.078 174.99 91.5329 174.71L91.0957 178.686ZM106.621 179.919C109.219 180.043 111.816 180.125 114.411 180.162L114.468 176.163C111.919 176.126 109.367 176.046 106.812 175.923L106.621 179.919ZM122.208 180.139C124.809 180.085 127.407 179.985 130.001 179.835L129.771 175.842C127.227 175.988 124.678 176.087 122.125 176.14L122.208 180.139ZM137.782 179.237C140.372 178.987 142.957 178.686 145.535 178.332L144.992 174.369C142.467 174.716 139.935 175.01 137.398 175.255L137.782 179.237ZM153.249 177.11C155.809 176.649 158.361 176.133 160.905 175.561L160.027 171.659C157.54 172.218 155.044 172.722 152.54 173.173L153.249 177.11ZM168.489 173.678C170.998 172.996 173.497 172.256 175.986 171.456L174.763 167.648C172.331 168.429 169.89 169.152 167.44 169.819L168.489 173.678ZM183.369 168.896C184.589 168.442 185.806 167.972 187.02 167.487L185.537 163.772C184.351 164.246 183.163 164.704 181.972 165.148L183.369 168.896ZM187.02 167.487C188.136 167.041 189.248 166.587 190.355 166.125L188.815 162.434C187.727 162.888 186.634 163.334 185.537 163.772L187.02 167.487ZM196.962 163.239C199.162 162.233 201.333 161.191 203.469 160.114L201.667 156.542C199.58 157.596 197.454 158.615 195.298 159.601L196.962 163.239ZM209.853 156.719C211.978 155.527 214.057 154.294 216.08 153.02L213.948 149.635C211.987 150.871 209.966 152.069 207.896 153.231L209.853 156.719ZM222.109 148.973C224.108 147.541 226.035 146.061 227.879 144.53L225.326 141.452C223.559 142.918 221.707 144.341 219.779 145.722L222.109 148.973ZM233.309 139.638C234.186 138.776 235.038 137.899 235.862 137.007L232.924 134.292C232.145 135.135 231.338 135.966 230.505 136.785L233.309 139.638ZM235.862 137.007C236.439 136.382 237.01 135.743 237.573 135.091L234.546 132.476C234.011 133.096 233.47 133.702 232.924 134.292L235.862 137.007ZM240.803 131.116C241.318 130.444 241.827 129.762 242.33 129.07L239.094 126.718C238.61 127.384 238.122 128.039 237.628 128.683L240.803 131.116ZM242.33 129.07C243.139 127.956 243.877 126.832 244.546 125.701L241.103 123.665C240.5 124.685 239.831 125.704 239.094 126.718L242.33 129.07ZM247.908 118.348C248.786 115.685 249.311 113.016 249.51 110.373L245.521 110.073C245.346 112.39 244.886 114.739 244.109 117.097L247.908 118.348ZM249.104 102.239C248.633 99.5614 247.838 96.9587 246.758 94.4657L243.087 96.0563C244.049 98.274 244.75 100.576 245.164 102.932L249.104 102.239ZM242.765 87.4417C241.22 85.2825 239.446 83.2542 237.475 81.3856L234.723 84.2884C236.515 85.9878 238.121 87.8244 239.512 89.7693L242.765 87.4417ZM231.197 76.413C228.998 74.9633 226.65 73.6799 224.177 72.5876L222.561 76.2464C224.831 77.2492 226.983 78.426 228.995 79.7524L231.197 76.413ZM216.632 69.9642C214.094 69.3061 211.467 68.8396 208.775 68.5861L208.4 72.5685C210.878 72.8018 213.294 73.231 215.628 73.8362L216.632 69.9642ZM200.798 68.4673C199.482 68.5511 198.158 68.6864 196.826 68.8754L197.388 72.8357C198.617 72.6613 199.839 72.5365 201.052 72.4593L200.798 68.4673ZM196.826 68.8754C195.393 69.0787 193.975 69.3418 192.577 69.6618L193.469 73.561C194.759 73.2658 196.067 73.0231 197.388 72.8357L196.826 68.8754ZM184.352 72.2839C181.662 73.3974 179.09 74.7297 176.678 76.2563L178.818 79.6362C181.033 78.2338 183.4 77.0068 185.882 75.9799L184.352 72.2839ZM169.808 81.5353C167.657 83.534 165.726 85.7231 164.063 88.0747L167.329 90.3841C168.824 88.269 170.572 86.2862 172.531 84.4653L169.808 81.5353ZM159.863 95.759C158.778 98.4748 158.029 101.328 157.672 104.285L161.643 104.764C161.957 102.166 162.616 99.6498 163.577 97.2434L159.863 95.759ZM157.781 113.091C157.985 114.517 158.282 115.953 158.676 117.398L162.535 116.348C162.184 115.059 161.921 113.783 161.74 112.522L157.781 113.091ZM158.676 117.398C159 118.59 159.352 119.769 159.732 120.927L163.532 119.679C163.175 118.591 162.843 117.479 162.535 116.348L158.676 117.398ZM162.505 127.824C163.068 128.969 163.673 130.074 164.324 131.129L167.727 129.027C167.15 128.092 166.607 127.101 166.095 126.06L162.505 127.824ZM164.324 131.129C165.079 132.35 165.859 133.531 166.663 134.671L169.931 132.365C169.175 131.293 168.44 130.18 167.727 129.027L164.324 131.129ZM171.954 141.228C173.908 143.343 175.968 145.276 178.125 147.033L180.651 143.932C178.641 142.294 176.719 140.492 174.893 138.514L171.954 141.228ZM185.048 151.892C187.471 153.346 189.985 154.622 192.58 155.73L194.151 152.051C191.718 151.012 189.367 149.819 187.106 148.462L185.048 151.892ZM200.528 158.543C203.195 159.307 205.927 159.924 208.716 160.403L209.393 156.46C206.739 156.004 204.149 155.42 201.63 154.698L200.528 158.543ZM217.034 161.424C219.769 161.633 222.547 161.73 225.363 161.722L225.351 157.722C222.635 157.73 219.962 157.637 217.34 157.435L217.034 161.424ZM233.686 161.41C236.414 161.218 239.169 160.939 241.946 160.582L241.436 156.615C238.73 156.963 236.051 157.233 233.405 157.42L233.686 161.41ZM250.13 159.318C252.821 158.836 255.528 158.288 258.244 157.68L257.371 153.777C254.707 154.373 252.056 154.91 249.425 155.381L250.13 159.318ZM266.278 155.722C268.922 155.026 271.57 154.28 274.219 153.489L273.074 149.656C270.465 150.435 267.859 151.169 265.26 151.853L266.278 155.722ZM282.084 151.013C284.686 150.153 287.284 149.256 289.875 148.325L288.522 144.56C285.962 145.48 283.397 146.367 280.829 147.215L282.084 151.013ZM297.592 145.448C300.154 144.459 302.705 143.443 305.239 142.404L303.722 138.703C301.212 139.732 298.687 140.738 296.152 141.716L297.592 145.448ZM312.823 139.209C315.353 138.116 317.861 137.004 320.344 135.88L318.694 132.237C316.231 133.352 313.744 134.454 311.236 135.538L312.823 139.209ZM327.803 132.432C330.304 131.252 332.772 130.065 335.204 128.876L333.446 125.283C331.031 126.464 328.58 127.643 326.097 128.814L327.803 132.432ZM342.571 125.213C343.797 124.594 345.012 123.975 346.215 123.359L344.39 119.799C343.194 120.412 341.986 121.027 340.767 121.643L342.571 125.213ZM346.215 123.359L349.382 121.735L347.558 118.176L344.39 119.799L346.215 123.359ZM355.717 118.488L362.052 115.241L360.228 111.681L353.893 114.928L355.717 118.488ZM368.387 111.993L374.723 108.746L372.898 105.187L366.563 108.434L368.387 111.993ZM381.058 105.499L387.393 102.252L385.568 98.6921L379.233 101.939L381.058 105.499ZM393.728 99.0045L396.895 97.3808L395.071 93.8212L391.903 95.4449L393.728 99.0045Z" fill="black"/>
        </svg>
        
        {
          this.state.connectedAddress ?
          <Container>
            <div className="connectedWalletBox">
              <h4>Wallet</h4>
              <h4 className="connectedAddress">{ this.shortConnectedAddress() }</h4>
              <h4>You have { whitelist.has(this.state.connectedAddress.toLowerCase()) ? whitelist.get(this.state.connectedAddress.toLowerCase()).length : 0  } tickets</h4>
              <Fab onClick={() => this.onClaimSer()} variant="extended" size="large" color="primary" aria-label="add">
                <span className="connectWallet">Claim Ser</span>
              </Fab>
            </div>
          </Container>
          : 
          <div>
            <Fab onClick={() => this.onWalletConnect()} variant="extended" size="large" color="primary" aria-label="add">
              <span className="connectWallet">Connect Wallet</span>
            </Fab>
          </div>
        }
        
        </Grid>
      </Grid>
    </Container>);
    }
}
