import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";

export default function Login() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ name: "", email: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      setUser(formData);
      navigate("/profile");
    }
  };

  return (
    <div className="p-6 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-white">Login</h1>

        <input
          type="text"
          placeholder="Enter your name"
          className="w-full p-3 mb-4 rounded-lg bg-gray-700 text-white"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-3 mb-4 rounded-lg bg-gray-700 text-white"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 p-3 rounded-lg text-white font-semibold"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
