"use client";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { TonConnectUIProvider } from "@tonconnect/ui-react"; // Import the TonConnectUIProvider

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <TonConnectUIProvider manifestUrl="https://lime-written-dove-103.mypinata.cloud/ipfs/QmSHeH555DJ9oBnBEtnUEbJFYv4c3HGXGPLEyRb487CUoE">
      <App />
    </TonConnectUIProvider>
  </React.StrictMode>
);

// For performance measurement
reportWebVitals();
