import { createContext, useState, useEffect } from "react";

// Create context
export const WatchlistContext = createContext();

// Provider component
export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState([]);

  // Load from localStorage when app starts
  useEffect(() => {
    const stored = localStorage.getItem("watchlist");
    if (stored) {
      try {
        setWatchlist(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse watchlist from localStorage", e);
      }
    }
  }, []);

  // Save to localStorage when watchlist changes
  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  return (
    <WatchlistContext.Provider value={{ watchlist, setWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
}
