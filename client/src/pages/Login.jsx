import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { GoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import Navbar from "../components/Navbar";
import { request } from "../utils/fetchApi";
// import { jwtDecode } from "jwt-decode";

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

  // const handleGoogleLoginSuccess = async (response) => {
  //   try {
  //     // Use the Google token directly from the response
  //     const googleToken = jwtDecode(response.credential);
  //     console.log("Google token", googleToken);

  //     // Fetch the Google login endpoint directly
  //     const url = `http://localhost:5000/auth/google`;
  //     const fetchOptions = {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       credentials: "include",
  //     };

  //     const fetchResponse = await fetch(url, fetchOptions);
  //     if (!fetchResponse.ok) {
  //       throw new Error(`Failed to fetch. Status: ${fetchResponse.status}`);
  //     }
  //     const data = await fetchResponse.json();

  //     dispatch(login(data.token));
  //     navigate("/");
  //   } catch (error) {
  //     console.error("Google login error:", error);
  //   }
  // };

  // const handleGoogleLoginFailure = (error) => {
  //   console.error("Google login failure:", error);
  // };

  return (
    <div>
      <Navbar />
      <div className="grid place-content-center mt-10 p-2">
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
          <div>
            {/* <GoogleLogin
              // clientId="Your-Client-ID"
              buttonText="Login with Google"
              onSuccess={handleGoogleLoginSuccess}
              onFailure={handleGoogleLoginFailure}
              cookiePolicy={"single_host_origin"}
              fetchOptions={{
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: "include",
              }}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
