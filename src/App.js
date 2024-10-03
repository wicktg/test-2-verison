import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Header from "./components/Header"; // Import Header component
import { NextUIProvider } from "@nextui-org/react";
import "./App.css";
import teser from "./assets/teser.png"; // Import the teser icon

const App = () => {
  const [isMining, setIsMining] = useState(false);
  const [farmingProgress, setFarmingProgress] = useState(0);
  const [balance, setBalance] = useState(1000); // Balance remains a number
  const [totalPointsToFarm, setTotalPointsToFarm] = useState(10);

  const farmingSpeed = 0.1; // Farming speed (0.1 points per second)
  const randomAmount = Math.floor(Math.random() * 20) + 1;

  const handleStartMiningClick = () => {
    if (!isMining) {
      setIsMining(true); // Start mining
    }
  };

  const handleClaimClick = () => {
    setBalance((prevBalance) => prevBalance + farmingProgress); // Update balance with farmed points
    setFarmingProgress(0); // Reset farming progress
    setIsMining(false); // Reset mining state
  };

  useEffect(() => {
    let farmingInterval;
    if (isMining && farmingProgress < totalPointsToFarm) {
      farmingInterval = setInterval(() => {
        setFarmingProgress((prevProgress) => {
          const newProgress = prevProgress + farmingSpeed;
          return newProgress.toFixed(2) >= totalPointsToFarm
            ? totalPointsToFarm
            : parseFloat(newProgress.toFixed(2));
        });
      }, 1000);
    }

    return () => clearInterval(farmingInterval);
  }, [isMining, farmingProgress, totalPointsToFarm]);

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background Theme */}
      <div className="absolute inset-0 theme-background z-0">
        <div className="theme-circle-center"></div>
      </div>

      {/* Header Component with Avatar and Tickets */}
      <Header randomAmount={randomAmount} />

      {/* Main Content - Centered Teser Icon and Balance */}
      <div className="flex-grow flex justify-center items-center mb-72 z-10">
        <div className="flex flex-col items-center gap-4">
          {/* Teser Icon with spinning animation during mining */}
          <div
            className={`${
              isMining ? "animate-spin-slow" : ""
            } flex justify-center items-center`}
          >
            <img className="w-14 h-14" src={teser} alt="Teser Icon" />
          </div>

          {/* Balance Display */}
          <div className="text-white font-bold text-5xl">
            {Number(balance).toFixed(2)}{" "}
          </div>

          {/* Dynamic Button Text */}
          <div className="flex flex-col items-center mt-6">
            {farmingProgress < totalPointsToFarm ? (
              <div
                className="text-1xl text-white opacity-50 cursor-pointer -tracking-wider ml-1"
                onClick={handleStartMiningClick}
              >
                {isMining
                  ? `Farming: ${farmingProgress.toFixed(
                      2
                    )} / ${totalPointsToFarm.toFixed(2)}`
                  : "Start Mining >"}
              </div>
            ) : (
              <div
                className="text-1xl ml-1 text-white opacity-50 cursor-pointer -tracking-wider"
                onClick={handleClaimClick}
              >
                {`Claim: ${farmingProgress.toFixed(
                  2
                )} / ${totalPointsToFarm.toFixed(2)}`}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navbar */}
      <Navbar className="z-20" />
    </div>
  );
};

export default App;
