import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import web3 from 'web3';
import Error from './Views/Error';
import VotingList from './Views/VotingList';
import VotingStatus from './Views/VotingStatus';
import Drawer from './Components/Drawer';
import RecoilAlert from './Components/Alert';
import { RecoilRoot } from 'recoil';
import { useWeb3React, Web3ReactProvider } from '@web3-react/core';
import { ExternalProvider, Web3Provider } from '@ethersproject/providers';
import ConnectWallet from './Views/ConnectWallet';
import { InjectedConnector } from '@web3-react/injected-connector';
import { injected } from './modules/connector';
import 'events';

declare global {
  interface Window {
    ethereum: any;
  }
}

const App = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const {
    connector,
    library,
    account,
    chainId,
    active,
    error,
    activate,
    deactivate,
  } = useWeb3React();

  const checkLocalStorage = () => {
    const isConnected = window.localStorage.getItem(
      'WEB3_CONNECT_CACHED_PROVIDER'
    );
    if (isConnected) {
      activate(injected);
    }
  };

  const connect = async () => {
    try {
      await activate(injected);
      window.localStorage.setItem('WEB3_CONNECT_CACHED_PROVIDER', 'injected');
    } catch (error) {
      console.log('error', error);
    }
  };

  const disconnect = () => {
    deactivate();
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  useEffect(() => {
    checkLocalStorage();
  }, []);

  return (
    <>
      <Drawer
        active={active}
        account={account ?? ''}
        connect={connect}
        disconnect={disconnect}
      />
      {!active ? (
        <ConnectWallet />
      ) : (
        <Routes>
          <Route index element={<VotingList />} />
          <Route path='/list' element={<VotingList />} />
          <Route path='/status:placeId' element={<VotingStatus />} />
          <Route path='*' element={<Error />} />
        </Routes>
      )}
      {/* <RecoilAlert /> */}
    </>
  );
};

export default App;
