import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { request } from "../utils/fetchApi";
import { register } from "../redux/authSlice";
import { useDispatch } from "react-redux";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
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
      dispatch(register(data));
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="grid place-content-center mt-10 p-2 ">
        <div className="sm:w-80 p-3 rounded-md">
          <h1 className="text-left text-2xl pb-2">
            <b>Hello Guest</b>
          </h1>
          <p>
            Already have an account? /{" "}
            <Link to="/login">
              <b>Login</b>
            </Link>
          </p>
          <form className="flex flex-col py-2 gap-3" onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Username..."
              className="border-2 border-black-500 rounded-lg p-1"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email..."
              className="border-2 border-black-500 rounded-lg p-1"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password..."
              className="border-2 border-black-500 rounded-lg p-1"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="bg-gray-800 p-1 rounded-sm text-white"
              type="submit"
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
