import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Development = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div
        className="flex flex-col justify-center items-center"
        style={{
          margin: 0, // Ensure no margin is applied
          padding: 0, // Ensure no padding is applied
          border: "none", // Remove any potential borders
          outline: "none", // Remove any possible outlines
        }}
      >
        {/* Loader */}
        <ClipLoader size={35} speedMultiplier={0.5} color="#FFFFFF" />

        {/* Text below the loader */}
        <p className="text-white text-lg mt-4">Under Development</p>
      </div>
    </div>
  );
};

export default Development;
