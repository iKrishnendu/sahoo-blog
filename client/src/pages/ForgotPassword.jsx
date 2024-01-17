import React, { useState } from "react";
import { Link } from "react-router-dom";
import { request } from "../utils/fetchApi";
import Navbar from "../components/Navbar";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const options = { "Content-Type": "application/json" };

      const data = await request("/auth/forgot-password", "POST", options, {
        email,
      });

      setMessage(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white p-8 rounded-md shadow-md w-96">
          <h1 className="text-3xl font-semibold mb-4">Forgot Password</h1>
          <p>
            Remembered your password? /{" "}
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </p>
          <form className="mt-6" onSubmit={handleForgotPassword}>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded-md"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="w-full mt-6 bg-gray-800 text-white p-3 rounded-md hover:bg-gray-900 transition duration-300"
            >
              Send Reset Email
            </button>
          </form>
          {message && <p className="mt-4 text-green-500">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
