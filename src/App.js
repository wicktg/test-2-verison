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
  const [randomAmount] = useState(Math.floor(Math.random() * 20) + 1); // Generate once when the component mounts
  const [telegramUser, setTelegramUser] = useState(null); // State to store Telegram user data

  const farmingSpeed = 0.1; // Farming speed (0.1 points per second)

  // Function to start mining
  const handleStartMiningClick = () => {
    if (!isMining) {
      setIsMining(true); // Start mining
    }
  };

  // Function to claim farmed points
  const handleClaimClick = () => {
    setBalance((prevBalance) => prevBalance + farmingProgress); // Update balance with farmed points
    setFarmingProgress(0); // Reset farming progress
    setIsMining(false); // Reset mining state
  };

  // Mining process logic
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

  // Fetch Telegram user data on component mount
  useEffect(() => {
    const loadTelegramScript = () => {
      const script = document.createElement("script");
      script.src = "https://telegram.org/js/telegram-web-app.js";
      script.async = true;
      script.onload = () => {
        if (window.Telegram?.WebApp) {
          window.Telegram.WebApp.ready();
          const user = window.Telegram.WebApp.initDataUnsafe?.user;

          if (user) {
            // Set the user data in state
            setTelegramUser({
              firstName: user.first_name,
              lastName: user.last_name,
              username: user.username,
              isPremium: user.is_premium,
              languageCode: user.language_code,
              photoUrl: user.photo_url, // Fetch the user's profile picture URL
            });
          }
        }
      };
      document.body.appendChild(script);
    };

    loadTelegramScript();
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background Theme */}
      <div className="absolute inset-0 theme-background z-0">
        <div className="theme-circle-center"></div>
      </div>

      {/* Header Component with Avatar and Tickets */}
      <Header randomAmount={randomAmount} telegramUser={telegramUser} />

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
