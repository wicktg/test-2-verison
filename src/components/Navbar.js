import React, { useEffect, useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import CurrencyBitcoin from "@mui/icons-material/CurrencyBitcoin"; // Earn (Stacked Coin Icon)
import PeopleIcon from "@mui/icons-material/People"; // Referrals
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet"; // Wallet Icon
import { useLocation, Link } from "react-router-dom"; // Import useLocation and Link to navigate

const Navbar = () => {
  const [activeButton, setActiveButton] = useState(null);

  // Get the current location from react-router
  const location = useLocation();

  // Set the active button based on the current path
  useEffect(() => {
    if (location.pathname === "/") {
      setActiveButton("home");
    } else if (location.pathname === "/earn") {
      setActiveButton("earn");
    } else if (location.pathname === "/referrals") {
      setActiveButton("referrals");
    } else if (location.pathname === "/wallet") {
      setActiveButton("wallet");
    }
  }, [location.pathname]); // Re-run when the route changes

  return (
    <footer className="flex justify-around items-center bg-[#111112] bg-opacity-90 py-1.5 fixed bottom-0 w-full h-20 text-white shadow-lg shadow-slate-800/40 z-10">
      {/* Home Button */}
      <Link to="/" className="group flex flex-col items-center">
        <button
          className={`transition-colors duration-200 ${
            activeButton === "home" ? "text-[#a168ff]" : "text-gray-400"
          }`}
        >
          <div className="p-1.5">
            <HomeIcon fontSize="medium" /> {/* Home Icon */}
          </div>
          <div className="text-center text-[10px] font-medium">Home</div>
        </button>
      </Link>

      {/* Earn Button */}
      <Link to="/earn" className="group flex flex-col items-center">
        <button
          className={`transition-colors duration-200 ${
            activeButton === "earn" ? "text-[#a168ff]" : "text-gray-400"
          }`}
        >
          <div className="p-1.5">
            <CurrencyBitcoin fontSize="medium" /> {/* Earn Icon */}
          </div>
          <div className="text-center text-[10px] font-medium">Earn</div>
        </button>
      </Link>

      {/* Referrals Button */}
      <Link to="/referrals" className="group flex flex-col items-center">
        <button
          className={`transition-colors duration-200 ${
            activeButton === "referrals" ? "text-[#a168ff]" : "text-gray-400"
          }`}
        >
          <div className="p-1.5">
            <PeopleIcon fontSize="medium" /> {/* Referrals Icon */}
          </div>
          <div className="text-center text-[10px] font-medium">Referrals</div>
        </button>
      </Link>

      {/* Wallet Button */}
      <Link to="/wallet" className="group flex flex-col items-center">
        <button
          className={`transition-colors duration-200 ${
            activeButton === "wallet" ? "text-[#a168ff]" : "text-gray-400"
          }`}
        >
          <div className="p-1.5">
            <AccountBalanceWalletIcon fontSize="medium" /> {/* Wallet Icon */}
          </div>
          <div className="text-center text-[10px] font-medium">Wallet</div>
        </button>
      </Link>
    </footer>
  );
};

export default Navbar;
