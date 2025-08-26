"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import StockChart from "@/components/StockChart";
import {
  fetchStockDetails,
  fetchCompanyName,
} from "@/lib/redux/thunks/stocksThunks";

const StockDetails = ({ initialStockData, initialCompanyName, symbol }) => {
  const dispatch = useDispatch();

  const { stockDetails, stockLoading, stockError, companyNames } = useSelector(
    (state) => state.stocks
  );

  const stockData = initialStockData || stockDetails[symbol];
  const companyName = initialCompanyName || companyNames[symbol];

  useEffect(() => {
    if (symbol) {
      dispatch(fetchCompanyName(symbol));
      dispatch(fetchStockDetails(symbol));
    }
  }, [dispatch, symbol]);

  if (stockLoading && !stockData) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  if (stockError && !stockData) {
    return <div className="container mx-auto p-4">Error: {stockError}</div>;
  }

  if (!stockData || stockData.length === 0) {
    return <div className="container mx-auto p-4">Stock data not found.</div>;
  }

  const latestStock = stockData[stockData.length - 1];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">
        {companyName || symbol} ({symbol})
      </h1>
      <p className="text-xl mb-4">Latest Price: Rs. {latestStock.close}</p>

      <h2 className="text-2xl font-semibold mb-4">Price History</h2>
      <StockChart prices={stockData} />
    </div>
  );
};

export default StockDetails;
