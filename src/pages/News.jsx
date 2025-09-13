import { useEffect, useState } from "react";
import axios from "axios";

export default function News() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    axios
      .get("https://newsapi.org/v2/everything", {
        params: {
          q: "crypto OR bitcoin OR ethereum OR stock market", 
          sortBy: "publishedAt",
          language: "en",
         apikey: import.meta.env.VITE_NEWS_API, 
        },
      })
      .then((res) => {
        setArticles(res.data.articles);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch news. Try again later.");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Latest News</h1>

      {loading && <p className="text-gray-400 animate-pulse">Loading news...</p>}
      {error && <p className="text-red-400">{error}</p>}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <div
            key={index}
            className="bg-gray-600 rounded-xl p-4 shadow-lg hover:shadow-xl transition"
          >
            {article.urlToImage && (
              <img
                src={article.urlToImage}
                alt={article.title}
                className="rounded-lg mb-4 w-full h-40 object-cover"
              />
            )}
            <h2 className="text-lg font-semibold mb-2">{article.title}</h2>
            <p className="text-sm text-gray-400 mb-3">
              {article.description?.slice(0, 100)}...
            </p>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              Read more →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

