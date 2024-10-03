import React from "react";
import avatar from "../assets/avatar.jpg"; // Adjust the path as needed
import tickets from "../assets/tickets.png"; // Adjust the path as needed
import LeaderboardIcon from "@mui/icons-material/Leaderboard"; // Import MUI Leaderboard icon
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet"; // Import MUI Wallet icon

const Header = ({ randomAmount }) => {
  return (
    <div>
      {/* Top Left Profile Info */}
      <div className="absolute top-4 left-4 flex items-center gap-4 z-20">
        <img className="w-10 h-10 rounded-full" src={avatar} alt="Profile" />
        <div className="font-medium dark:text-white">
          <div>@testversion</div>
        </div>
      </div>

      {/* Top Right Section with Tickets, Leaderboards, and Wallet */}
      <div className="absolute top-6 right-4 flex items-center gap-4 z-20">
        {/* Tickets */}
        <div className="flex items-center gap-2">
          <img className="w-5 h-5" src={tickets} alt="Tickets" />
          <div className="text-white font-semibold">{randomAmount}</div>
        </div>

        {/* Leaderboards - Clickable */}
        <a
          href="/leaderboard" // Replace with the desired route or action
          className="flex items-center gap-2 cursor-pointer"
          title="Go to Leaderboard"
        >
          <LeaderboardIcon style={{ color: "white" }} />{" "}
        </a>

        {/* Wallet - Clickable */}
        <a
          href="/wallet" // Replace with the desired route or action
          className="flex items-center gap-2 cursor-pointer"
          title="Go to Wallet"
        >
          <AccountBalanceWalletIcon style={{ color: "white" }} />{" "}
        </a>
      </div>
    </div>
  );
};

export default Header;
