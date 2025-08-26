import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSearchResults = createAsyncThunk(
  "stocks/fetchSearchResults",
  async (keyword, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://portal.tradebrains.in/api/assignment/search?keyword=${keyword}&length=10`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchStockDetails = createAsyncThunk(
  "stocks/fetchStockDetails",
  async (symbol, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://portal.tradebrains.in/api/assignment/stock/${symbol}/prices?days=30&type=INTRADAY&limit=30`
      );
      if (response.data && response.data.length === 0) {
        return null;
      }
      return { symbol, data: response.data };
    } catch (error) {
      if (
        axios.isAxiosError(error) &&
        error.response &&
        error.response.status === 404
      ) {
        return null;
      }
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCompanyName = createAsyncThunk(
  "stocks/fetchCompanyName",
  async (symbol, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://portal.tradebrains.in/api/assignment/search?keyword=${symbol}&limit=1`
      );
      if (response.data && response.data.length > 0) {
        return { symbol, name: response.data[0].company };
      }
      return { symbol, name: symbol };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
