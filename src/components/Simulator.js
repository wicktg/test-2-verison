import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import cryptoMeme from "../assets/crypto-meme.png";
import Tether from "../assets/Tether.webp";
import AssetTable from "./HandleSimulator"; // Import AssetTable component

// Material-UI Components
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  TextField,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// CoinPopup Component
const CoinPopup = ({
  selectedCoin,
  open,
  handleClose,
  handlePurchase,
  balance,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) setQuantity(1); // Reset quantity when modal opens
  }, [open]);

  const totalSpent = selectedCoin?.current_price
    ? selectedCoin.current_price * quantity
    : 0;

  const formatPrice = (price) => {
    return price >= 0.0001 ? price.toFixed(4) : price.toFixed(9);
  };

  const handleBuy = () => {
    if (totalSpent > balance) {
      setError("Insufficient USDT balance.");
    } else {
      handlePurchase(quantity, totalSpent);
      handleClose();
      setError(""); // Reset error
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        style: {
          backgroundColor: "#111112",
          borderRadius: "10px",
          padding: "1.5rem",
          color: "white",
        },
      }}
    >
      <div className="relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-white">
            Selected Memecoin
          </h2>
          <IconButton onClick={handleClose} className="text-white">
            <CloseIcon style={{ color: "white" }} />
          </IconButton>
        </div>

        <div className="flex flex-col items-center text-center space-y-4">
          <img
            src={selectedCoin?.image}
            alt={selectedCoin?.name}
            className="w-16 h-16 rounded-full"
          />
          <h3 className="text-2xl font-bold">{selectedCoin?.name}</h3>
          <p className="text-lg text-gray-400">
            {selectedCoin?.symbol.toUpperCase()}
          </p>
          <p className="text-xl font-semibold text-[#85C802]">
            $
            {selectedCoin?.current_price
              ? formatPrice(selectedCoin.current_price)
              : "Fetching..."}
          </p>
        </div>

        <div className="mt-4">
          <TextField
            label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            InputLabelProps={{ style: { color: "#85C802" } }}
            InputProps={{ style: { color: "white" } }}
            fullWidth
          />
        </div>

        <div className="mt-4">
          <p className="text-lg font-semibold text-[#85C802]">
            Total Spent: ${totalSpent.toFixed(4)}
          </p>
        </div>

        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

        <div className="mt-6">
          <button
            onClick={handleBuy}
            className="w-full bg-lime-500 hover:bg-lime-600 text-gray-900 font-semibold py-3 rounded-full"
          >
            Buy
          </button>
        </div>
      </div>
    </Dialog>
  );
};

// Main Simulator Component
const Simulator = () => {
  const [open, setOpen] = useState(false);
  const [cryptoData, setCryptoData] = useState([]);
  const [error, setError] = useState(null);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [isCoinPopupOpen, setIsCoinPopupOpen] = useState(false);
  const [purchasedCoins, setPurchasedCoins] = useState([]); // Track purchased coins
  const [balance, setBalance] = useState(100000); // Initialize balance in USDT (100,000 USDT)
  const [investMoreOpen, setInvestMoreOpen] = useState(false); // Track "Invest More?" popup
  const [showAlert, setShowAlert] = useState(false);
  const [isMaxHoldingsOpen, setIsMaxHoldingsOpen] = useState(false); // New dialog state for max holdings
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handlePurchase = (quantity, totalSpent) => {
    if (selectedCoin) {
      const existingCoin = purchasedCoins.find(
        (coin) => coin.symbol === selectedCoin.symbol.toUpperCase()
      );

      if (existingCoin) {
        const updatedCoins = purchasedCoins.map((coin) =>
          coin.symbol === existingCoin.symbol
            ? { ...coin, holdings: coin.holdings + quantity }
            : coin
        );
        setPurchasedCoins(updatedCoins);
      } else if (purchasedCoins.length < 3) {
        const newCoin = {
          name: selectedCoin.name,
          symbol: selectedCoin.symbol.toUpperCase(),
          price: selectedCoin.current_price,
          holdings: quantity,
          image: selectedCoin.image,
        };
        setPurchasedCoins([...purchasedCoins, newCoin]);
      } else {
        // Dialog to show maximum holdings limit reached
        setIsMaxHoldingsOpen(true); // Open the dialog

        return (
          <Dialog
            open={isMaxHoldingsOpen}
            onClose={() => setIsMaxHoldingsOpen(false)} // Close dialog on OK click
            fullWidth
            maxWidth="xs"
            PaperProps={{
              style: {
                backgroundColor: "#111112",
                borderRadius: "10px",
                padding: "1.5rem",
                color: "white",
              },
            }}
          >
            <DialogTitle style={{ color: "#fff" }}>
              Maximum Holdings Reached
            </DialogTitle>
            <DialogContent>
              <DialogContentText style={{ color: "#85C802" }}>
                You can only purchase a maximum of 3 assets.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setIsMaxHoldingsOpen(false)} // Close dialog on click
                style={{
                  backgroundColor: "#85C802",
                  color: "#111112",
                  fontWeight: "bold",
                  borderRadius: "20px",
                  padding: "8px 16px",
                }}
              >
                OK
              </Button>
            </DialogActions>
          </Dialog>
        );
      }

      // Deduct balance
      setBalance((prevBalance) => prevBalance - totalSpent);

      // Show the alert
      setShowAlert(true);

      // Visibility change listener
      const handleVisibilityChange = () => {
        if (document.visibilityState === "visible") {
          // Re-show alert if coming back to tab
          setShowAlert(true);
        }
      };

      document.addEventListener("visibilitychange", handleVisibilityChange);

      // Hide the alert after 3 seconds when the tab is visible
      setTimeout(() => {
        if (document.visibilityState === "visible") {
          setShowAlert(false);
        }
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange
        ); // Clean up
      }, 3000);
    }
  };

  const goToHome = () => navigate("/");

  const fetchCryptoData = async () => {
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: "usd",
            ids: "notcoin,dogs-2,catizen,popcat,hamster-kombat",
          },
          headers: { accept: "application/json" },
        }
      );
      setCryptoData(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching crypto data:", err);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchCryptoData();
    const intervalId = setInterval(fetchCryptoData, 60000);
    return () => clearInterval(intervalId);
  }, []);

  const handleCoinClick = (coin) => {
    setSelectedCoin(coin);
    setIsCoinPopupOpen(true);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen relative">
      <button
        onClick={goToHome}
        className="fixed top-4 left-2 text-white py-2 px-4 rounded-full z-30"
        style={{ zIndex: 100 }}
      >
        ← Back
      </button>

      {!purchasedCoins.length && (
        <>
          {/* Image Container */}
          <div className="mb-6">
            <img
              src={cryptoMeme}
              alt="Gecko Rocket"
              className="w-48 md:w-64 lg:w-72"
            />
          </div>

          {/* "Let's Invest" Button */}
          <button
            onClick={handleOpen}
            className="bg-lime-500 hover:bg-lime-600 active:bg-lime-600 text-gray-900 font-semibold py-3 px-8 rounded-full"
          >
            Let's Invest
          </button>
        </>
      )}

      {/* Show AssetTable after purchase */}
      {purchasedCoins.length > 0 && (
        <div
          className="fixed flex top-8 " // Example of controlled positioning
          style={{ zIndex: 50 }}
        >
          <AssetTable purchasedCoins={purchasedCoins} />{" "}
          {/* Pass purchasedCoins to AssetTable */}
        </div>
      )}

      <div className="fixed top-4 right-2 flex items-center gap-4 z-20">
        <div className="bg-[#111112] rounded-[13px] flex flex-row items-center justify-between w-28 py-2 px-4 sm:py-4 sm:px-6 relative">
          <div className="flex items-center">
            <img
              src={Tether}
              alt="Tether"
              className="w-5 h-5 sm:w-6 sm:h-6 mr-2"
            />
            <span
              className="text-[#85C802] text-base sm:text-lg font-semibold pb-1"
              style={{ textShadow: "rgba(160, 255, 6, 0.4) 0px 2px 20px" }}
            >
              {balance.toFixed(0).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Invest More? Dialog */}
      {investMoreOpen && (
        <Dialog
          open={investMoreOpen}
          onClose={() => setInvestMoreOpen(false)}
          fullWidth
          maxWidth="sm"
          PaperProps={{
            style: {
              backgroundColor: "#111112",
              borderRadius: "10px",
              padding: "1.5rem",
              color: "white",
            },
          }}
        >
          <div className="relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-white">
                Select a Memecoin
              </h2>
              <IconButton
                onClick={() => setInvestMoreOpen(false)}
                className="text-white"
              >
                <CloseIcon style={{ color: "white" }} />
              </IconButton>
            </div>

            <List>
              {cryptoData.length > 0 ? (
                cryptoData.map((coin) => (
                  <ListItem
                    button
                    key={coin.id}
                    onClick={() => handleCoinClick(coin)}
                  >
                    <ListItemIcon>
                      <img
                        src={coin.image}
                        alt={coin.name}
                        className="w-8 h-8 rounded-full"
                      />
                    </ListItemIcon>
                    <ListItemText primary={coin.name} className="text-white" />
                  </ListItem>
                ))
              ) : (
                <ListItem>
                  <ListItemText primary="Loading coins..." />
                </ListItem>
              )}
            </List>
          </div>
        </Dialog>
      )}

      {/* Invest More button */}
      {purchasedCoins.length > 0 && (
        <div className="fixed top-40 right-4 z-50">
          <button
            onClick={() => setInvestMoreOpen(true)} // Open Invest More popup
            className="bg-lime-500 text-3x active:bg-lime-600 text-gray-900 font-semibold py-1 px-3 rounded-full"
          >
            + Invest
          </button>
        </div>
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          style: {
            backgroundColor: "#111112",
            borderRadius: "10px",
            padding: "1.5rem",
            color: "white",
          },
        }}
      >
        <div className="relative">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-white">
              Select a Memecoin
            </h2>
            <IconButton onClick={handleClose} className="text-white">
              <CloseIcon style={{ color: "white" }} />
            </IconButton>
          </div>

          <List>
            {cryptoData.length > 0 ? (
              cryptoData.map((coin) => (
                <ListItem
                  button
                  key={coin.id}
                  onClick={() => handleCoinClick(coin)}
                >
                  <ListItemIcon>
                    <img
                      src={coin.image}
                      alt={coin.name}
                      className="w-8 h-8 rounded-full"
                    />
                  </ListItemIcon>
                  <ListItemText primary={coin.name} className="text-white" />
                </ListItem>
              ))
            ) : (
              <ListItem>
                <ListItemText primary="Loading coins..." />
              </ListItem>
            )}
          </List>
        </div>
      </Dialog>

      {selectedCoin && (
        <CoinPopup
          selectedCoin={selectedCoin}
          open={isCoinPopupOpen}
          handleClose={() => setIsCoinPopupOpen(false)}
          handlePurchase={handlePurchase} // Pass handlePurchase to CoinPopup
          balance={balance} // Pass balance to CoinPopup
        />
      )}

      {showAlert && (
        <div
          className="fixed top-4 left-1/2 transform -translate-x-1/2 p-2 mb-4 text-sm border rounded-lg bg-green-50 dark:bg-gray-800 w-24 text-center"
          role="alert"
          style={{
            color: "#85C802",
            borderColor: "#85C802",
            backgroundColor: "rgba(133, 200, 2, 0.1)", // Slight green tint for the background
          }}
        >
          <span className="font-medium">Bought!</span>
        </div>
      )}
    </div>
  );
};

export default Simulator;
