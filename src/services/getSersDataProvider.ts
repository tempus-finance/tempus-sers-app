import { JsonRpcProvider } from '@ethersproject/providers';
import SersDataProvider from './SersDataProvider';

let sersDataProvider: SersDataProvider;
let actualProvider: JsonRpcProvider;

const getSersDataProvider = (provider?: JsonRpcProvider): SersDataProvider => {
  if (!sersDataProvider) {
    sersDataProvider = new SersDataProvider();
  }

  if (provider !== undefined && provider !== actualProvider) {
    actualProvider = provider;
    sersDataProvider.init({ provider });
  }

  return sersDataProvider;
};

export default getSersDataProvider;
