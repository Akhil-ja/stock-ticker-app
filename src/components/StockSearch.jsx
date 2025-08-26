"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import useDebounce from "@/hooks/useDebounce";
import { fetchSearchResults } from "@/lib/redux/thunks/stocksThunks";
import { clearSearchResults } from "@/lib/redux/slices/stocksSlice";

const StockSearch = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const debouncedKeyword = useDebounce(keyword, 1000);

  const { searchResults, searchLoading, searchError } = useSelector(
    (state) => state.stocks
  );

  useEffect(() => {
    if (debouncedKeyword.length < 2) {
      dispatch(clearSearchResults());
      return;
    }
    dispatch(fetchSearchResults(debouncedKeyword));
  }, [debouncedKeyword, dispatch]);

  const handleSelect = (symbol) => {
    setKeyword("");
    router.push(`/stock/${symbol}`);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <input
        type="text"
        placeholder="Search for stocks..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {(searchResults.length > 0 ||
        searchLoading ||
        searchError ||
        (searchResults.length === 0 &&
          !searchLoading &&
          !searchError &&
          debouncedKeyword.length >= 2)) && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
          {searchLoading && <div className="p-2">Loading...</div>}
          {searchError && <div className="p-2 text-red-500">{searchError}</div>}
          {!searchLoading &&
            !searchError &&
            searchResults.length === 0 &&
            debouncedKeyword.length >= 2 && (
              <div className="p-2">No results found.</div>
            )}
          <ul>
            {searchResults.map((stock) => (
              <li
                key={stock.symbol}
                onClick={handleSelect.bind(null, stock.symbol)}
                className="p-2 cursor-pointer hover:bg-gray-100"
              >
                {stock.company} ({stock.symbol})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default StockSearch;
