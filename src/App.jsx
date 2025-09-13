import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashBoard from "./DashBoard";
import CoinCharts from "./CoinCharts";
import Navbar from "./Components/NavBar";
import Home from "./pages/Home";
import News from "./pages/News";
import Watchlist from "./pages/Watchlist";
import Profile from "./pages/Profile";
import CoinCharts from "./components/CoinCharts";

function App() {
  return (
    <Router>
       <Navbar />
      <div className="p-6">
      <Routes>
         <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<DashBoard />} />
        <Route path="/coin/:id" element={<CoinCharts />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
