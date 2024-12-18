"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null); // Reset any previous errors

    try {
      const { data } = await axios.post("/api/auth/login", formData);

      // Store the authentication state, token, and user details
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("token", data.token);
      localStorage.setItem("userDetails", JSON.stringify(data.user)); // Assuming the response contains the user object

      // Display success toast
      toast.success("Login successful!");

      // Redirect to profile page after successful login
      router.push("/"); // Redirect to profile page
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Error logging in. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage); // Show error toast
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

      {/* Display error message */}
      {error && (
        <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            type="text"
            className="w-full p-2 border rounded"
            placeholder="Enter your username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full p-2 border rounded"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
        </div>

        <button
          type="submit"
          className={`w-full py-2 px-4 rounded text-white ${
            isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="mt-4 text-center">
        <p>
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-blue-500 hover:text-blue-600 font-semibold"
          >
            Sign Up
          </a>
        </p>
      </div>

      {/* ToastContainer to display toasts */}
      <ToastContainer />
    </div>
  );
}