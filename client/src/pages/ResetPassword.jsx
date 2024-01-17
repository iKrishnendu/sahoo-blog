import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token");

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const url = `${process.env.REACT_APP_SERVER_URL}/auth/reset-password`;
      const headers = { "Content-Type": "application/json" };
      const body = JSON.stringify({ token, newPassword });

      const response = await fetch(url, {
        method: "POST",
        headers,
        body,
      });
      console.log(response);

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = await response.json();
      setMessage(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white p-8 rounded-md shadow-md w-96">
          <h1 className="text-3xl font-semibold mb-4">Reset Password</h1>
          <p>
            Remembered your password? /{" "}
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </p>
          <form className="mt-6" onSubmit={handleResetPassword}>
            <input
              type="password"
              placeholder="New Password"
              className="w-full p-3 border rounded-md"
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              type="submit"
              className="w-full mt-6 bg-gray-800 text-white p-3 rounded-md hover:bg-gray-900 transition duration-300"
            >
              Reset Password
            </button>
          </form>
          {message && <p className="mt-4 text-green-500">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
