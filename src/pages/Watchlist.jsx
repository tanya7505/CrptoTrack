import { useContext, useState } from "react";
import { WatchlistContext } from "../context/WatchlistContext.jsx";
import { FaTrash, FaPlus } from "react-icons/fa";

export default function Watchlist() {
  const { watchlist, setWatchlist } = useContext(WatchlistContext);
  const [input, setInput] = useState("");

  const addToWatchlist = (e) => {
    e.preventDefault();
    if (input.trim() && !watchlist.includes(input.trim().toUpperCase())) {
      setWatchlist([...watchlist, input.trim().toUpperCase()]);
      setInput("");
    }
  };

  const removeFromWatchlist = (item) => {
    setWatchlist(watchlist.filter((i) => i !== item));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Your Watchlist</h1>

      {/* Add new item */}
      <form onSubmit={addToWatchlist} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter Stock/Crypto symbol (e.g. AAPL, BTC)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 rounded-lg bg-gray-800 text-white"
        />
        <button
          type="submit"
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-white"
        >
          <FaPlus /> Add
        </button>
      </form>

      {/* Watchlist display */}
      {watchlist.length === 0 ? (
        <p className="text-gray-400">No items in your watchlist yet.</p>
      ) : (
        <ul className="space-y-3">
          {watchlist.map((item, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-800 p-3 rounded-lg shadow"
            >
              <span className="text-white font-semibold">{item}</span>
              <button
                onClick={() => removeFromWatchlist(item)}
                className="text-red-400 hover:text-red-600"
              >
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
