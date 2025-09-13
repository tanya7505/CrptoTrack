import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

export default function CoinCharts() {
  const { id } = useParams(); // coinId from URL
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios
      .get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart`, {
        params: {
          vs_currency: "usd",
          days: 30, // last 30 days
          apikey : import.meta.env.VITE_CG_API_KEY,
        },
      })
      .then((res) => {
        const formatted = res.data.prices.map((p) => ({
          time: new Date(p[0]).toLocaleDateString(),
          price: p[1],
        }));
        setData(formatted);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load chart data. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 capitalize">{id} Chart</h1>

      <div className="bg-gray-800 rounded-xl p-6 shadow-lg min-h-[350px] flex items-center justify-center">
        {loading ? (
          <p className="text-gray-400 animate-pulse">Loading chart...</p>
        ) : error ? (
          <p className="text-red-400">{error}</p>
        ) : data.length === 0 ? (
          <p className="text-gray-400">No chart data available.</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="time" hide />
              <YAxis domain={["auto", "auto"]} />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
