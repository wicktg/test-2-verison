import React from "react";
import energyLimitImage from "../assets/energy-limit.png"; // Import the image

const Upgrade = ({ level, cost }) => {
  return (
    <div className="max-w-sm p-4 bg-gray-900 rounded-lg shadow-lg text-white mb-6 transition-transform hover:scale-105 transform duration-300 ease-in-out">
      <div className="flex items-center justify-between">
        {/* Mining Limit Section */}
        <div className="flex items-center">
          {/* Fixed-size background container */}
          <div
            className="mr-4 bg-gray-700 p-2 rounded-full flex items-center justify-center"
            style={{ width: "56px", height: "56px" }}
          >
            <img
              alt="energy limit"
              className="w-8 h-8" // Image size
              src={energyLimitImage} // Use the imported image
            />
          </div>

          {/* Content Container with minimal spacing and contrast text */}
          <div className="text-white">
            <div className="font-semibold text-lg">Mining Limit</div>
            <div className="flex items-center text-sm mt-1 text-gray-400">
              {/* Display the upgrade cost and current level */}
              <span className="font-semibold text-purple-400">
                {cost} points
              </span>
              <span className="mx-2 text-gray-500">•</span>
              <span>Level {level}</span>
            </div>
          </div>
        </div>

        {/* Status Section (icon or additional info) */}
        <div>
          <span className="text-2xl text-purple-400">⛏️</span>
        </div>
      </div>
    </div>
  );
};

export default Upgrade;
