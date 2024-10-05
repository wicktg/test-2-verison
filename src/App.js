import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import LoadingImage from "./assets/loading.png";
import Development from "./components/Development"; // Import the Development loading screen component
import "./App.css"; // Import global CSS

const App = () => {
  const [isMining, setIsMining] = useState(false);
  const [farmingProgress, setFarmingProgress] = useState(0);
  const [balance, setBalance] = useState(1000);
  const [totalPointsToFarm, setTotalPointsToFarm] = useState(11); // Default mining limit
  const [miningSpeed, setMiningSpeed] = useState(0);
  const [telegramUser, setTelegramUser] = useState(null); // Fetch Telegram user data
  const [loading, setLoading] = useState(true); // New loading state for loader screen

  const randomAmount = 10;

  // Simulate loading screen for 3 seconds (only on initial load)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // 3 seconds

    return () => clearTimeout(timer); // Clear timeout if the component unmounts
  }, []);

  // Dynamically load Telegram WebApp script
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
            setTelegramUser(user); // Set Telegram user data
          }
        }
      };
      document.body.appendChild(script);
    };
    loadTelegramScript();
  }, []);

  // Calculate mining speed based on total points to farm
  useEffect(() => {
    const calculatedMiningSpeed = totalPointsToFarm / 180;
    setMiningSpeed(calculatedMiningSpeed);
  }, [totalPointsToFarm]);

  const handleStartMiningClick = () => {
    if (!isMining) setIsMining(true);
  };

  const handleClaimClick = () => {
    setBalance((prevBalance) => prevBalance + farmingProgress);
    setFarmingProgress(0);
    setIsMining(false);
  };

  useEffect(() => {
    let farmingInterval;
    if (isMining && farmingProgress < totalPointsToFarm) {
      farmingInterval = setInterval(() => {
        setFarmingProgress((prevProgress) => {
          const newProgress = prevProgress + miningSpeed;
          return newProgress >= totalPointsToFarm
            ? totalPointsToFarm
            : newProgress;
        });
      }, 1000);
    }
    return () => clearInterval(farmingInterval);
  }, [isMining, farmingProgress, totalPointsToFarm, miningSpeed]);

  // If loading, show the loader only on initial load
  if (loading) {
    return (
      <div className="theme-background flex flex-col justify-center items-center space-y-4">
        {/* Replace HashLoader with your custom logo */}
        <img
          src={LoadingImage}
          alt="Loading..."
          className="w-20 h-20 animate-spin-slow"
        />
        <span className="text-white text-lg">Loading</span>
      </div>
    );
  }

  // Main app content after loading
  return (
    <NextUIProvider>
      <Router>
        <div className="relative min-h-screen flex flex-col">
          <div className="absolute inset-0 theme-background z-0">
            <div className="theme-circle-center"></div>
          </div>

          <div className="flex-grow flex justify-center items-center mb-72 z-10">
            <Routes>
              {/* Full header on the home page */}
              <Route
                path="/"
                element={
                  <>
                    <Header
                      randomAmount={randomAmount}
                      telegramUser={telegramUser} // Pass Telegram user to Header
                    />
                    <div className="flex flex-col items-center gap-4">
                      <div
                        className={`${
                          isMining ? "animate-spin-slow" : ""
                        } flex justify-center items-center`}
                      >
                        <img
                          className="w-14 h-14"
                          src={LoadingImage}
                          alt="Teser Icon"
                        />
                      </div>
                      <div className="text-white font-bold text-5xl">
                        {Number(balance).toFixed(2)}
                      </div>
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
                        <div className="fixed justify-center items-center bottom-56 space-x-4">
                          <button
                            type="button"
                            className="
                              py-2.5 px-5 
                              text-sm font-medium 
                              text-white
                              bg-purple-600 /* Purple background */
                              rounded-full /* Rounded shape */
                              border-none /* No border */
                              focus:outline-none 
                              appearance-none /* Remove any default browser styles */
                              active:opacity-70 /* Reduce opacity when clicked */
                              transition duration-200 ease-in-out /* Smooth transition for the effect */
                              animate-bounce /* Bounce animation */
                            "
                          >
                            PLAY GAME
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                }
              />

              <Route path="/upgrade" element={<Development />} />
              <Route path="/earn" element={<Development />} />
              <Route path="/referrals" element={<Development />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
          <Navbar className="z-20" />
        </div>
      </Router>
    </NextUIProvider>
  );
};

export default App;
