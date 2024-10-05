import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import avatar from "../assets/default.jpg"; // Adjust the path as needed
import tickets from "../assets/tickets.png"; // Adjust the path as needed
import LeaderboardIcon from "@mui/icons-material/Leaderboard"; // Import MUI Leaderboard icon
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet"; // Import MUI Wallet icon

const Header = ({ randomAmount, telegramUser }) => {
  // Display the user's username if available, otherwise, display first and last name
  const displayName = telegramUser?.username
    ? `@${telegramUser.username}`
    : `${telegramUser?.first_name || ""} ${telegramUser?.last_name || ""}`; // Ensure correct Telegram naming conventions

  // Use the user's photo if available, otherwise, use the default avatar
  const userAvatar = telegramUser?.photo_url || avatar;

  return (
    <div>
      {/* Top Left Profile Info */}
      <div className="absolute top-4 left-4 flex items-center gap-4 z-20">
        {/* Avatar */}
        <img
          className="w-10 h-10 rounded-full"
          src={userAvatar}
          alt="Profile"
        />

        {/* Username/Name */}
        <div className="font-medium text-white">
          <div>{displayName.trim()}</div> {/* Trim spaces if name missing */}
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
        <Link
          to="/leaderboard" // Use Link instead of a tag for routing
          className="flex items-center gap-2 cursor-pointer"
          title="Go to Leaderboard"
        >
          <LeaderboardIcon style={{ color: "white" }} />{" "}
        </Link>

        {/* Wallet - Clickable */}
        <Link
          to="/wallet" // Use Link instead of a tag for routing
          className="flex items-center gap-2 cursor-pointer"
          title="Go to Wallet"
        >
          <AccountBalanceWalletIcon style={{ color: "white" }} />{" "}
        </Link>
      </div>
    </div>
  );
};

export default Header;
