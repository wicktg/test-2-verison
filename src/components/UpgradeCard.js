import React from "react";

const UpgradeCard = ({
  balance,
  setBalance,
  setTotalPointsToFarm,
  level,
  setLevel,
  onUpgradeComplete,
  pointsPerLevel,
  setShowUpgradeAlert, // Receive the alert setter as a prop
}) => {
  const upgradeCosts = [
    0, 100, 200, 400, 800, 1600, 3200, 6400, 12800, 25600, 51200,
  ]; // Costs per level

  // Handle the upgrade logic
  const handleUpgrade = () => {
    const nextLevel = level + 1;
    const cost = upgradeCosts[nextLevel]; // Get the cost for upgrading to next level

    // If user has enough balance and next level is within bounds
    if (balance >= cost && nextLevel <= 11) {
      // Deduct the upgrade cost from the balance
      setBalance(balance - cost);

      // Increment the level
      setLevel(nextLevel);

      // Update the mining limit for the next level
      setTotalPointsToFarm(pointsPerLevel[nextLevel]);

      // Show the upgrade success alert
      setShowUpgradeAlert(true);

      // Hide the alert after 3 seconds
      setTimeout(() => {
        setShowUpgradeAlert(false);
      }, 3000);

      // Call onUpgradeComplete to close the upgrade card
      onUpgradeComplete();
    }
  };

  const nextLevel = level + 1; // Get the next level
  const nextMiningLimit = pointsPerLevel[nextLevel]; // Mining limit after upgrading to next level
  const currentMiningLimit = pointsPerLevel[level]; // Current mining limit for current level

  return (
    <div className="max-w-sm p-6 bg-gray-900 bg-opacity-70 rounded-xl shadow-lg text-white border border-gray-700 relative">
      <div className="flex justify-between items-center mb-6">
        <div className="text-xl font-semibold text-white">
          Upgrade Mining Limit
        </div>
        <div className="text-sm text-purple-400">• Level {nextLevel}</div>
      </div>
      <div className="text-gray-400 mb-6">
        Leveling up increases the total number of points you can mine. Costs
        rise with each level.
      </div>
      <div className="text-yellow-400 mb-6">
        Upgrade Cost: {upgradeCosts[nextLevel]} Points {/* Display cost */}
      </div>
      <div className="text-green-400 mb-6">
        Current Limit: {currentMiningLimit} → New Limit: {nextMiningLimit}{" "}
        {/* Show old -> new limit */}
      </div>

      <div className="flex justify-between items-center">
        <button
          className={`${
            balance >= upgradeCosts[nextLevel]
              ? "bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800"
              : "bg-gray-700 cursor-not-allowed"
          } px-5 py-2 rounded-lg transition duration-300 text-white font-semibold`}
          onClick={handleUpgrade}
          disabled={balance < upgradeCosts[nextLevel]} // Disable button if not enough balance
        >
          Buy for {upgradeCosts[nextLevel]} Points
        </button>
        <button
          className="text-red-500 hover:text-red-700 transition duration-300"
          onClick={onUpgradeComplete}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UpgradeCard;
