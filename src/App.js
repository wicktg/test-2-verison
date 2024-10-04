import React, { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import "./App.css";
import teser from "./assets/teser.png";
import Upgrade from "./components/Upgrade";
import UpgradeCard from "./components/UpgradeCard";

const App = () => {
  const [isMining, setIsMining] = useState(false);
  const [farmingProgress, setFarmingProgress] = useState(0);
  const [balance, setBalance] = useState(1000);
  const [totalPointsToFarm, setTotalPointsToFarm] = useState(11); // Default mining limit
  const [miningSpeed, setMiningSpeed] = useState(0);
  const [telegramUser, setTelegramUser] = useState(null);
  const [level, setLevel] = useState(1);
  const [showUpgradeCard, setShowUpgradeCard] = useState(false);

  // New state to manage the "Upgraded!" alert visibility
  const [showUpgradeAlert, setShowUpgradeAlert] = useState(false);

  const upgradeCosts = [
    0, 100, 200, 400, 800, 1600, 3200, 6400, 12800, 25600, 51200,
  ];
  const pointsPerLevel = [10, 11, 14, 19, 26, 35, 46, 59, 74, 91, 110]; // Incremental mining limit per level

  const upgradeCardRef = useRef(null);
  const randomAmount = 10;

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

  const handleUpgradeClick = () => setShowUpgradeCard(true);

  const handleUpgradeComplete = () => setShowUpgradeCard(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        upgradeCardRef.current &&
        !upgradeCardRef.current.contains(event.target)
      ) {
        setShowUpgradeCard(false);
      }
    };
    if (showUpgradeCard)
      document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showUpgradeCard]);

  const nextLevelCost = upgradeCosts[level + 1];

  return (
    <NextUIProvider>
      <Router>
        <div className="relative min-h-screen flex flex-col">
          {/* Alert for the whole app */}
          {showUpgradeAlert && (
            <div
              className="absolute top-4 left-1/2 transform -translate-x-1/2 p-4 text-sm text-gray-200 rounded-lg bg-gray-900 bg-opacity-80 border border-gray-700 shadow-lg z-50 transition-opacity duration-300 opacity-100"
              role="alert"
            >
              <span className="font-semibold text-purple-400">Upgraded!</span>{" "}
              Mining limit increased.
            </div>
          )}
          <div className="absolute inset-0 theme-background z-0">
            <div className="theme-circle-center"></div>
          </div>

          <div className="flex-grow flex justify-center items-center mb-72 z-10">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Header
                      randomAmount={randomAmount}
                      telegramUser={telegramUser}
                    />
                    <div className="flex flex-col items-center gap-4">
                      <div
                        className={`${
                          isMining ? "animate-spin-slow" : ""
                        } flex justify-center items-center`}
                      >
                        <img
                          className="w-14 h-14"
                          src={teser}
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
                      </div>
                    </div>
                  </>
                }
              />

              <Route
                path="/upgrade"
                element={
                  <div className="flex items-center justify-center mt-24 h-full w-80">
                    <div className="flex flex-col gap-8">
                      <div onClick={handleUpgradeClick}>
                        <Upgrade level={level} cost={nextLevelCost} />
                      </div>

                      <div
                        ref={upgradeCardRef}
                        className={`transform transition-transform duration-500 ${
                          showUpgradeCard
                            ? "translate-y-0 opacity-100"
                            : "translate-y-full opacity-0"
                        } flex items-center justify-center mt-14`}
                      >
                        <UpgradeCard
                          balance={balance}
                          setBalance={setBalance}
                          setTotalPointsToFarm={setTotalPointsToFarm}
                          miningSpeed={miningSpeed}
                          setLevel={setLevel}
                          level={level}
                          onUpgradeComplete={handleUpgradeComplete}
                          pointsPerLevel={pointsPerLevel}
                          setShowUpgradeAlert={setShowUpgradeAlert} // Pass the alert setter
                        />
                      </div>
                    </div>
                  </div>
                }
              />

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
