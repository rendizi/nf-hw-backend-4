import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

export const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      toast("passwords do not match");
      return;
    }
    try {
      const response = await axios.post("http://localhost:4000/api/v5/users/register", {
        username,
        password
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      if (response.status === 200) {
                toast("success");
      } else {
        toast(`smthing went wrong: ${response.data.message}`);
      }
    } catch (error) {
      console.error("smthing went wrong:", error);
      toast("smthign went wrong, lease try again later.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
      <div className="w-full max-w-md mx-auto p-8 bg-gray-800 rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <img
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
            alt="Spotify Logo"
            className="w-32 mx-auto"
          />
          <h1 className="text-3xl font-bold mt-4">Sign Up</h1>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 mt-1 text-black rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter your username"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 mt-1 text-black rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Create a password"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-sm text-gray-600"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium">Confirm Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 mt-1 text-black rounded-lg border border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
                placeholder="Confirm your password"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-sm text-gray-600"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full p-3 mt-4 bg-green-600 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Already have an account?{" "}
            <Link to="/signin" className="text-green-400 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
