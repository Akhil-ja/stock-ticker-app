import { configureStore } from '@reduxjs/toolkit';
import stocksReducer from './slices/stocksSlice';

export const store = configureStore({
  reducer: {
    stocks: stocksReducer,
  },
});
