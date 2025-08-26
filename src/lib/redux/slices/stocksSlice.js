import { createSlice } from '@reduxjs/toolkit';
import {
  fetchSearchResults,
  fetchStockDetails,
  fetchCompanyName,
} from '../thunks/stocksThunks';

const initialState = {
  searchResults: [],
  searchLoading: false,
  searchError: null,
  stockDetails: {},
  stockLoading: false,
  stockError: null,
  companyNames: {},
};

const stocksSlice = createSlice({
  name: 'stocks',
  initialState,
  reducers: {
    clearSearchResults: (state) => {
      state.searchResults = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.searchLoading = true;
        state.searchError = null;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchResults = action.payload;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.searchLoading = false;
        state.searchError = action.payload;
      })
      .addCase(fetchStockDetails.pending, (state) => {
        state.stockLoading = true;
        state.stockError = null;
      })
      .addCase(fetchStockDetails.fulfilled, (state, action) => {
        state.stockLoading = false;
        state.stockDetails[action.payload.symbol] = action.payload.data;
      })
      .addCase(fetchStockDetails.rejected, (state, action) => {
        state.stockLoading = false;
        state.stockError = action.payload;
      })
      .addCase(fetchCompanyName.fulfilled, (state, action) => {
        state.companyNames[action.payload.symbol] = action.payload.name;
      });
  },
});

export const { clearSearchResults } = stocksSlice.actions;

export default stocksSlice.reducer;
