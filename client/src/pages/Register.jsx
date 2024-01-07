import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { request } from "../utils/fetchApi";
import Navbar from "../components/Navbar";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (username === "" || email === "" || password === "") return;

    try {
      const options = { "Content-Type": "application/json" };

      const data = await request("/auth/register", "POST", options, {
        username,
        email,
        password,
      });

      // Check if the registration was successful
      if (data.user && data.token) {
        console.log("Registration successful! Verify your email to log in.");
        // Navigate only if the registration is successful
        // navigate("/");
      } else {
        // Handle registration failure (display an error message, etc.)
        console.error("Registration failed:", data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white p-8 rounded-md shadow-md w-96">
          <h1 className="text-3xl font-semibold mb-4">Hello Guest</h1>
          <p>
            Already have an account? /{" "}
            <Link to="/login" className="text-blue-500">
              Login
            </Link>
          </p>
          <form className="mt-6" onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Username"
              className="w-full p-3 border rounded-md"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full mt-4 p-3 border rounded-md"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full mt-4 p-3 border rounded-md"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="w-full mt-6 bg-gray-800 text-white p-3 rounded-md hover:bg-gray-900 transition duration-300"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
