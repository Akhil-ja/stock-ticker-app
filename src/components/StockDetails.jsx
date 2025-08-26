"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StockChart from "@/components/StockChart";
import {
  fetchStockDetails,
  fetchCompanyName,
} from "@/lib/redux/thunks/stocksThunks";

const StockDetails = ({ initialStockData, initialCompanyName, symbol }) => {
  const dispatch = useDispatch();
  const [timeRange, setTimeRange] = useState(30);

  const { stockDetails, stockLoading, stockError, companyNames } = useSelector(
    (state) => state.stocks
  );

  const stockData = stockDetails[symbol];
  const companyName = companyNames[symbol];

  useEffect(() => {
    if (symbol) {
      dispatch(fetchCompanyName(symbol));
      dispatch(fetchStockDetails({ symbol, days: timeRange }));
    }
  }, [dispatch, symbol, timeRange]);

  const displayStockData =
    initialStockData && timeRange === 30 ? initialStockData : stockData;
  const displayCompanyName = initialCompanyName || companyName;

  if (stockLoading && !displayStockData) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  if (stockError && !displayStockData) {
    return <div className="container mx-auto p-4">Error: {stockError}</div>;
  }

  if (!displayStockData || displayStockData.length === 0) {
    return <div className="container mx-auto p-4">Stock data not found.</div>;
  }

  const latestStock = (initialStockData || stockData)[
    (initialStockData || stockData).length - 1
  ];

  const timeRanges = [
    { label: "1M", days: 30 },
    { label: "3M", days: 90 },
    { label: "6M", days: 180 },
    { label: "1Y", days: 365 },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">
        {displayCompanyName || symbol} ({symbol})
      </h1>
      <p className="text-xl mb-4">Latest Price: Rs. {latestStock.close}</p>

      <div className="flex flex-wrap justify-center sm:justify-start space-x-2 sm:space-x-4 mb-4">
        {timeRanges.map((range) => (
          <button
            key={range.label}
            onClick={() => setTimeRange(range.days)}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              timeRange === range.days
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {range.label}
          </button>
        ))}
      </div>

      <h2 className="text-2xl font-semibold mb-4">Price History</h2>
      <StockChart prices={displayStockData} />
    </div>
  );
};

export default StockDetails;
