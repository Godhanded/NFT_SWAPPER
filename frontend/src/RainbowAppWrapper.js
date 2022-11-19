import React from 'react';
import App from './App';
import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider, getDefaultWallets, darkTheme } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider, webSocketProvider } = configureChains(
    /**@notice you can add or remove more chains as you see fit*/
    [chain.polygon, chain.polygonMumbai],
    /**@notice This is Alchemy's default API key.
      You can get your own at https://dashboard.alchemyapi.io */
    [alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY_API_KEY }), publicProvider()]
);

const { connectors } = getDefaultWallets({
    appName: 'Token Swapper',
    chains,
});

const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
    webSocketProvider,
});

const RainbowAppWrapper = () => {

    return (
        <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider chains={chains} theme={darkTheme({
                accentColor: 'black',
                accentColorForeground: 'white',
                borderRadius: 'medium',
                fontStack: 'system',
                overlayBlur: 'small',
            })}>
                <App />
            </RainbowKitProvider>
        </WagmiConfig>
    );
};

export default RainbowAppWrapper;