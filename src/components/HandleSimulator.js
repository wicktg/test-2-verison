import React from "react";

// Helper function to format the price
const formatPrice = (price) => {
  return price >= 0.0001 ? price.toFixed(4) : price.toFixed(9);
};

export default function AssetTable({ purchasedCoins }) {
  return (
    <div className="relative z-10 top-28">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-lime-400 mb-6">Assets</h1>
        <div className="overflow-x-auto shadow-lg rounded-lg mb-6">
          <table className="min-w-full bg-[#111112] text-gray-400 rounded-lg">
            <thead>
              <tr className="bg-[#1b1b1d]">
                <th className="py-3 px-6 text-left font-semibold text-lime-300">
                  Name
                </th>
                <th className="py-3 px-6 text-right font-semibold text-lime-300">
                  Price
                </th>
                <th className="py-3 px-6 text-right font-semibold text-lime-300">
                  Holdings
                </th>
              </tr>
            </thead>
            <tbody>
              {purchasedCoins.map((asset, index) => (
                <tr
                  key={index}
                  className="bg-[#1b1b1d] hover:bg-[#2a2a2d] transition-colors"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-4">
                      <span className="text-white">{asset.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right text-white">
                    ${formatPrice(asset.price)}
                  </td>
                  <td className="py-4 px-6 text-right text-white">
                    {asset.holdings.toFixed(2)} ${asset.symbol}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
