import React, { useEffect, useState } from "react";
import App from "./App";
import { HashRouter } from "react-router-dom";
import Landing from "./Views/Landing";
import { ExternalProvider, Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";

declare global {
  interface Window {
    klaytn: any;
  }
}

const setVH = () => {
  document.documentElement.style.setProperty(
    "--vh",
    `${window.innerHeight * 0.01}px`
  );
};

window.addEventListener("resize", setVH);

setVH();

function Root() {
  const isApp = (): boolean => {
    return window.location.host.includes("app");
  };

  const getLibrary = (provider: ExternalProvider) => {
    const library = new Web3Provider(provider, "any");
    return library;
  };

  useEffect(() => {
    isApp();
  }, []);

  useEffect(() => {
    if (!isApp()) {
      document.body.style.overflow = "auto";
    }
  }, [isApp]);

  return isApp() ? (
    <Web3ReactProvider getLibrary={getLibrary}>
      <App />
    </Web3ReactProvider>
  ) : (
    <Landing />
  );
}

export default Root;
