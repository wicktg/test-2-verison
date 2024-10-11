"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useTonConnectUI } from "@tonconnect/ui-react";
import tonwalletIcon from "../assets/ton-wallet.png";

const Wallet = () => {
  const [tonConnectUI] = useTonConnectUI();
  const [tonWalletAddress, setTonWalletAddress] = useState(null); // Handle wallet address state

  // Handle wallet connection
  const handleWalletConnection = useCallback((address) => {
    setTonWalletAddress(address);
  }, []);

  // Handle wallet disconnection
  const handleWalletDisconnection = useCallback(() => {
    setTonWalletAddress(null);
  }, []);

  // Function to trigger wallet connection or disconnection
  const handleWalletAction = async () => {
    if (tonConnectUI.connected) {
      await tonConnectUI.disconnect();
      handleWalletDisconnection();
    } else {
      await tonConnectUI.openModal(); // Open wallet popup when user clicks
    }
  };

  // Handle status changes for wallet connection
  useEffect(() => {
    const unsubscribe = tonConnectUI.onStatusChange((wallet) => {
      if (wallet) {
        handleWalletConnection(wallet.account.address);
      } else {
        handleWalletDisconnection();
      }
    });

    return () => unsubscribe();
  }, [tonConnectUI, handleWalletConnection, handleWalletDisconnection]);

  // Format wallet address for display
  const formatAddress = (address) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  // Determine dynamic class for container size based on connection status
  const containerClass = tonWalletAddress
    ? "w-80" // Smaller size when connected
    : "w-96"; // Larger size when not connected

  // UI rendering
  return (
    <div
      className={`bg-[#141414] rounded-xl p-4 h-auto mx-auto flex flex-col justify-between items-center space-y-4 md:w-full md:max-w-lg ${containerClass}`}
    >
      <img src={tonwalletIcon} alt="Ton Wallet" className="mx-auto" />
      <h2 className="text-center text-white text-xl font-bold py-2">
        WE &#10084; TON
      </h2>

      {/* Conditionally render the airdrop message only if wallet is not connected */}
      {!tonWalletAddress && (
        <p className="text-center text-white items-center px-2 text-sm">
          <b>Connect your TON wallet</b> to get more of the Airdrop rewards
        </p>
      )}

      {tonWalletAddress ? (
        <div className="text-center text-white">
          <p>Connected: {formatAddress(tonWalletAddress)}</p>
          <button
            onClick={handleWalletAction}
            className="bg-red-500 font-semibold rounded-xl text-white px-4 py-2 text-sm w-full mt-4 button-shadow active:opacity-50 transition-opacity duration-100"
            type="button"
          >
            Disconnect Wallet
          </button>
        </div>
      ) : (
        <button
          onClick={handleWalletAction} // Connect wallet on button click
          className="bg-[#a168ff] font-semibold rounded-xl text-black px-4 py-2 text-sm w-full mt-4 button-shadow active:opacity-50 transition-opacity duration-100"
          type="button"
        >
          Connect Your Wallet
        </button>
      )}
    </div>
  );
};

export default Wallet;
