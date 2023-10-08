import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { request } from "../utils/fetchApi";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import Navbar from "../components/Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      console.log(data);
      dispatch(login(data));
      toast.success("Login Success!");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="grid place-content-center mt-10 p-2 ">
        <div className="sm:w-80 p-3 rounded-md">
          <h1 className="text-left text-2xl pb-2">
            <b>Hello User</b>
          </h1>
          <p>
            Don't have an account? /{" "}
            <Link to="/register">
              <b>Register</b>
            </Link>
          </p>
          <form className="flex flex-col py-2 gap-3" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email..."
              className="border-2 border-black-500 rounded-lg p-1"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password..."
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 border-black-500 rounded-lg p-1"
            />
            <button
              className="bg-gray-800 p-1 rounded-sm text-white"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
