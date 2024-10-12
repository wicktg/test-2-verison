import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import avatar from "../assets/default.jpg"; // Adjust the path as needed

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
        <div className="font-medium text-xs text-white">
          <div>{displayName.trim()}</div> {/* Trim spaces if name missing */}
        </div>
      </div>

      {/* Top Right Section with Passive Income (replacing Leaderboards) */}
      <div className="absolute top-4 right-4 flex items-center gap-4 z-20">
        <div className="bg-[#111112] rounded-[13px] flex-col w-28 py-1 px-3 sm:py-5 sm:px-5 relative">
          <div className="text-[11px] sm:text-sm text-[#ffffff] font-semibold">
            Passive income
          </div>
          <div className="flex text-[#ffffff]">
            <span
              className="text-[#85C802] text-sm sm:text-base pt-1 font-semibold"
              style={{
                textShadow: "rgba(160, 255, 6, 0.4) 0px 2px 20px",
              }}
            >
              100.0K
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
