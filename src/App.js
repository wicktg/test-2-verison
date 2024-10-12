"use client";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Simulator from "./components/Simulator";
import LoadingImage from "./assets/loading.png";
import Development from "./components/Development"; // Import the Development loading screen component
import PlayArrowIcon from "@mui/icons-material/PlayArrow"; // Importing resume/play icon
import "./App.css"; // Import global CSS

// Reusable loading screen component
const renderLoadingScreen = () => (
  <div className="fixed inset-0 bg-black bg-opacity-100 flex flex-col justify-center items-center space-y-4 h-screen z-50">
    <img
      src={LoadingImage}
      alt="Loading..."
      className="w-20 h-20 animate-spin-slow"
    />
    <span className="text-white text-lg">Loading</span>
  </div>
);

const AppContent = () => {
  const [balance, setBalance] = useState(1000);
  const [telegramUser, setTelegramUser] = useState(null);
  const [playButtonLoading, setPlayButtonLoading] = useState(false); // Tracks Play button loading
  const navigate = useNavigate(); // Initialize navigate hook

  // PlayButton component: Handles the Play button click event
  const PlayButton = () => {
    const handlePlayClick = () => {
      setPlayButtonLoading(true); // Show loading when the button is clicked

      // Simulate loading for 2 seconds, then navigate to /simulator
      setTimeout(() => {
        setPlayButtonLoading(false); // Stop showing the loading screen
        navigate("/simulator"); // Navigate to the /simulator page
      }, 5000); // 2 seconds delay
    };

    return (
      <button
        type="button"
        className="flex justify-center items-center w-32 h-32 text-white rounded-full border-none focus:outline-none appearance-none active:opacity-70 transition duration-200 ease-in-out"
        style={{ backgroundColor: "#85C802" }} // Updated color
        onClick={handlePlayClick}
      >
        <PlayArrowIcon style={{ fontSize: 60 }} />
      </button>
    );
  };

  if (playButtonLoading) {
    return renderLoadingScreen();
  }

  // Main app content
  return (
    <div className="flex-grow flex justify-center items-center mb-72 z-10">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header telegramUser={telegramUser} />
              <div className="flex flex-col items-center gap-4">
                <div className="flex justify-center items-center mt-11">
                  <img
                    className="w-14 h-14"
                    src={LoadingImage}
                    alt="Teser Icon"
                  />
                </div>

                {/* Display balance */}
                <div className="text-white font-bold text-5xl">
                  {Number(balance).toFixed(2)}
                </div>

                {/* Leaderboard link */}
                <div className="flex justify-center items-center text-white text-lg font-normal cursor-pointer active:text-[#85C802] transition duration-200 ease-in-out opacity-65 mt-6">
                  Leaderboard &gt;
                </div>

                <div className="fixed justify-center items-center bottom-44 space-x-4">
                  {/* Render PlayButton component */}
                  <PlayButton />
                </div>
              </div>
            </>
          }
        />
        <Route path="/earn" element={<Development />} />
        <Route path="/referrals" element={<Development />} />
        <Route path="/simulator" element={<Simulator />} />
        <Route path="/wallet" element={<Development />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

const App = () => {
  const [loading, setLoading] = useState(true); // Tracks initial load

  // Simulate initial loading screen for 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Stop initial loading after 3 seconds
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // If initial loading, show the full-screen loader that covers everything, including Navbar
  if (loading) {
    return renderLoadingScreen();
  }

  // Main app content after loading
  return (
    <NextUIProvider>
      <Router>
        <div className="relative min-h-screen flex flex-col">
          <div className="absolute inset-0 theme-background z-0">
            <div className="theme-circle-center"></div>
          </div>

          <AppContent />

          <Navbar className="z-20" />
        </div>
      </Router>
    </NextUIProvider>
  );
};

export default App;
