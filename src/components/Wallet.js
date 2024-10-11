"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useTonConnectUI } from "@tonconnect/ui-react";
import CloseIcon from "@mui/icons-material/Close"; // Import MUI Close (cross) icon
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

  // UI rendering
  return (
    <div className="bg-[#141414] rounded-xl p-4 w-96 h-auto mx-auto flex flex-col justify-between items-center space-y-4 md:w-full md:max-w-lg">
      <img src={tonwalletIcon} alt="Ton Wallet" className="mx-auto w-68 h-52" />
      <h2 className="text-center text-white text-xl font-bold py-2">
        WE &#10084; TON
      </h2>

      {/* Show the airdrop message, always visible */}
      <p className="text-center text-white items-center px-2 text-sm">
        <b>Connecting your TON wallet</b> ensures you get more of the Airdrop
        rewards
      </p>

      {tonWalletAddress ? (
        <div className="grid grid-cols-[80%_auto] gap-3 mt-6">
          {/* Connected wallet address and image */}
          <div className="flex items-center rounded-2xl px-3 py-2 h-14 border border-gray-700">
            <img
              src="https://wallet.tg/images/logo-288.png"
              alt="Ton Wallet"
              className="w-7 rounded-xl max-w-xs mr-2"
            />
            <p className="bg-transparent text-white w-full outline-none ml-4">
              {formatAddress(tonWalletAddress)}
            </p>
          </div>

          {/* Disconnect button using MUI CloseIcon (red cross) */}
          <button
            onClick={handleWalletAction}
            type="button"
            className="flex items-center justify-center rounded-2xl w-full"
          >
            <CloseIcon style={{ color: "red", fontSize: "24px" }} />{" "}
            {/* Red cross icon */}
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
