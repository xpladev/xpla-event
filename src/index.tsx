import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AppVerify from './AppVerify';
import reportWebVitals from './reportWebVitals';
import {
  getChainOptions,
  WalletProvider,
} from "@xpla/wallet-provider";
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Privacy from './Privacy';
import Cookie from './Cookie';

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
getChainOptions().then((chainOptions) => {
  root.render(
    <WalletProvider {...chainOptions}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/verify" element={<AppVerify />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/cookie" element={<Cookie />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </WalletProvider>
  );
});
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
