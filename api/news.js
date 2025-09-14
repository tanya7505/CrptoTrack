import axios from "axios";

export default async function handler(req, res) {
  try {
    const response = await axios.get("https://newsapi.org/v2/everything", {
      params: {
        q: "crypto OR bitcoin OR ethereum OR stock market",
        sortBy: "publishedAt",
        language: "en",
        apiKey: process.env.VITE_NEWS_API, // use server env variable
      },
    });
    res.status(200).json(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch news" });
  }
}
