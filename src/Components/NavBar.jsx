import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext.jsx";

export default function NavBar() {
  const { user } = useContext(UserContext);

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-lg">
      <Link to="/" className="text-xl font-bold text-blue-400">
        CryptoTrack
      </Link>

      <div className="space-x-6">
        <Link to="/" className="hover:text-blue-400">Home</Link>
        <Link to="/news" className="hover:text-blue-400">News</Link>
        <Link to="/watchlist" className="hover:text-blue-400">Watchlist</Link>
        <Link to="/profile" className="hover:text-blue-400">Profile</Link>

        {user ? (
          <span className="text-green-400">Hi, {user.name}</span>
        ) : (
          <Link to="/login" className="hover:text-blue-400">Login</Link>
        )}
      </div>
    </nav>
  );
}
