import { notFound } from "next/navigation";
import StockDetails from "@/components/StockDetails";
import axios from "axios";

async function getCompanyName(symbol) {
  try {
    const response = await axios.get(
      `https://portal.tradebrains.in/api/assignment/search?keyword=${symbol}&limit=1`
    );
    if (response.data && response.data.length > 0) {
      return response.data[0].company;
    }
    return symbol;
  } catch (error) {
    return symbol;
  }
}

async function getStockDetailsServer(symbol, limit = 30) {
  try {
    const res = await axios.get(
      `https://portal.tradebrains.in/api/assignment/stock/${symbol}/prices?days=${limit}&type=INTRADAY&limit=${limit}`
    );
    if (res.data && res.data.length === 0) {
      return null;
    }
    return res.data;
  } catch (error) {
    if (
      axios.isAxiosError(error) &&
      error.response &&
      error.response.status === 404
    ) {
      return null;
    }
    throw error;
  }
}

export async function generateMetadata({ params }) {
  const { symbol } = params;
  const companyName = await getCompanyName(symbol);

  return {
    title: `${companyName} (${symbol}) Stock Details`,
    description: `View the latest stock price and chart for ${companyName} (${symbol}).`,
    keywords: `${symbol}, ${companyName}, stock, share, market, prices, ${symbol.toLowerCase()}`,
  };
}

export default async function StockDetailsPage({ params }) {
  const { symbol } = params;

  const [companyName, stockData] = await Promise.all([
    getCompanyName(symbol),
    getStockDetailsServer(symbol, 30),
  ]);

  if (!stockData || stockData.length === 0) {
    notFound();
  }

  return (
    <StockDetails
      initialStockData={stockData}
      initialCompanyName={companyName}
      symbol={symbol}
    />
  );
}
