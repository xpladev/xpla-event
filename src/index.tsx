import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { getChainOptions, WalletProvider } from "@xpla/wallet-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Route, Routes } from "react-router-dom";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
getChainOptions().then((chainOptions) => {
  root.render(
    <WalletProvider {...chainOptions}>
      <QueryClientProvider client={queryClient}>
        <HashRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route
              path="/privacy_policy"
              element={
                <div className="App">
                  <iframe
                    title="privacy_policy"
                    className="border-0 w-screen h-screen"
                    src="/PRIVACY_POLICY.pdf"
                  />
                </div>
              }
            />
            <Route
              path="/cookie_policy"
              element={
                <div className="App">
                  <iframe
                    title="cookie_policy"
                    className="border-0 w-screen h-screen"
                    src="/COOKIE_POLICY.pdf"
                  />
                </div>
              }
            />
            <Route
              path="/terms_of_use"
              element={
                <div className="App">
                  <iframe
                    title="terms_of_use"
                    className="border-0 w-screen h-screen"
                    src="/TERMS_OF_USE.pdf"
                  />
                </div>
              }
            />
          </Routes>
        </HashRouter>
      </QueryClientProvider>
    </WalletProvider>
  );
});
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
