import axios from 'axios';
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { Link } from "react-router-dom";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function DashBoard() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1); // Track page number

  useEffect(() => {
    axios
      .get('https://api.coingecko.com/api/v3/coins/markets', {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: 12,   // 12 per page
          page: page,     // Dynamic page
          sparkline: false,
          x_cg_demo_api_key: 'CG-YbBsoD5XGi5PiJ7thxS8pHRK'
        }
      })
      .then(response => {
        setCoins(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [page]); // Fetch again when page changes

  // Filter coins based on search
  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="w-full min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">📊 Crypto Dashboard</h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search for a coin..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/2 p-3 rounded-lg text-black outline-none"
        />
      </div>

      {/* Swiper Pagination */}
      <Swiper
        modules={[Pagination, Navigation]}
        spaceBetween={20}
        slidesPerView={5}
        pagination={{ clickable: true }}
        navigation
      >
       
        {filteredCoins.map((coin) => (
          <SwiperSlide key={coin.id}>
             <Link  key={coin.id}
            to={`/coins/${coin.id}`}
            className="p-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
          >
            <div className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 max-w-sm mx-auto">
              {/* Coin Header */}
              <div className="flex items-center space-x-3 mb-4">
                <img src={coin.image} alt={coin.name} className="w-10 h-10" />
                <h2 className="text-lg font-semibold">
                  {coin.name} <span className="text-gray-400">({coin.symbol.toUpperCase()})</span>
                </h2>
              </div>

              {/* Price */}
              <p className="text-xl font-bold">${coin.current_price.toLocaleString()}</p>

              {/* Change */}
              <p
                className={`mt-2 font-semibold ${
                  coin.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {coin.price_change_percentage_24h.toFixed(2)}%
              </p>

              {/* Market Cap */}
              <p className="mt-2 text-gray-300 text-sm">
                Market Cap: ${coin.market_cap.toLocaleString()}
              </p>
            </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Page Controls (Optional) */}
      <div className="flex justify-center mt-6 space-x-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          Previous Page
        </button>
        <span className="text-lg font-semibold">Page {page}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          Next Page
        </button>
      </div>
    </section>
  );
}
