import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import Navbar from "../components/Navbar";
import { request } from "../utils/fetchApi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      dispatch(login({ token }));
      navigate("/"); // Redirect to the desired page after login
    }
  }, [dispatch, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") return;

    try {
      const options = {
        "Content-Type": "application/json",
      };

      const data = await request("/auth/login", "POST", options, {
        email,
        password,
      });

      dispatch(login(data));
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white p-8 rounded-md shadow-md w-96">
          <h1 className="text-3xl font-semibold mb-4">Hello User</h1>
          <p>
            Don't have an account? /{" "}
            <Link to="/register" className="text-blue-500">
              Register
            </Link>
          </p>
          <form className="mt-6" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border rounded-md"
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
              className="w-full mt-6 bg-gray-800 text-white p-3 rounded-md  hover:bg-gray-900 transition duration-300"
            >
              Login
            </button>
          </form>
          {/* Add the Google login button or any other social login options here */}
        </div>
      </div>
    </div>
  );
};

export default Login;
