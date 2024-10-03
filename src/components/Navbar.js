import React, { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import CurrencyBitcoin from "@mui/icons-material/CurrencyBitcoin"; // Earn (Stacked Coin Icon)
import PeopleIcon from "@mui/icons-material/People"; // Referrals
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet"; // Wallet

const Navbar = () => {
  // State to track which icon is clicked
  const [activeButton, setActiveButton] = useState(null);

  // Function to handle click
  const handleIconClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <footer className="flex justify-around items-center bg-[#111112] bg-opacity-90 py-1.5 fixed bottom-0 w-full h-20 text-white shadow-lg shadow-slate-800/40 z-10 isolation-isolate">
      {/* Home Button */}
      <button
        className={`group flex flex-col items-center transition-colors duration-200 ${
          activeButton === "home" ? "text-[#a168ff]" : "text-gray-400"
        }`}
        onClick={() => handleIconClick("home")}
      >
        <div className="p-1.5">
          <HomeIcon fontSize="medium" /> {/* Home Icon */}
        </div>
        <div className="text-center text-[10px] font-medium">Home</div>
      </button>

      {/* Earn Button */}
      <button
        className={`group flex flex-col items-center transition-colors duration-200 ${
          activeButton === "earn" ? "text-[#a168ff]" : "text-gray-400"
        }`}
        onClick={() => handleIconClick("earn")}
      >
        <div className="p-1.5">
          <CurrencyBitcoin fontSize="medium" /> {/* Earn Icon */}
        </div>
        <div className="text-center text-[10px] font-medium">Earn</div>
      </button>

      {/* Referrals Button */}
      <button
        className={`group flex flex-col items-center transition-colors duration-200 ${
          activeButton === "referrals" ? "text-[#a168ff]" : "text-gray-400"
        }`}
        onClick={() => handleIconClick("referrals")}
      >
        <div className="p-1.5">
          <PeopleIcon fontSize="medium" /> {/* Referrals Icon */}
        </div>
        <div className="text-center text-[10px] font-medium">Referrals</div>
      </button>

      {/* Wallet Button */}
      <button
        className={`group flex flex-col items-center transition-colors duration-200 ${
          activeButton === "wallet" ? "text-[#a168ff]" : "text-gray-400"
        }`}
        onClick={() => handleIconClick("wallet")}
      >
        <div className="p-1.5">
          <AccountBalanceWalletIcon fontSize="medium" /> {/* Wallet Icon */}
        </div>
        <div className="text-center text-[10px] font-medium">Wallet</div>
      </button>
    </footer>
  );
};

export default Navbar;
