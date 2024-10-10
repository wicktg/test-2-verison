import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import avatar from "../assets/default.jpg"; // Adjust the path as needed
import LeaderboardIcon from "@mui/icons-material/Leaderboard"; // Import MUI Leaderboard icon

const Header = ({ telegramUser }) => {
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

      {/* Top Right Section with Button - Leaderboards */}
      <div className="absolute top-6 right-4 flex items-center gap-4 z-20">
        <Link to="/leaderboard" className="flex items-center">
          {/* Button styled similar to the original button, just color updated */}
          <button
            className="relative inline-flex items-center overflow-hidden px-4 font-secondary flex-centered w-45 py-1 sm:py-2 text-[12px] sm:text-sm font-bold text-white rounded-[13px] gap-2 bg-purple-600 button-shadow"
            type="button"
          >
            <LeaderboardIcon
              style={{ width: "20px", height: "20px", fill: "white" }}
            />
            Leaderboards
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
