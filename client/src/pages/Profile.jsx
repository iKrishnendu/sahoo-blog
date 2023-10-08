import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { request } from "../utils/fetchApi";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/authSlice";
import Navbar from "../components/Navbar";

const Profile = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

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
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="grid place-content-center mt-10 p-2 ">
        <div className="sm:w-80 p-3 rounded-md">
          <h1 className="text-left text-2xl pb-2">
            <b>My Profile</b>
          </h1>
          <p>
            Go back to ? /{" "}
            <Link to="/">
              <b>Home</b>
            </Link>
          </p>
          <div className="flex flex-col text-lg py-5 my-10 gap-3">
            <div className="block truncate text-gray-800">
              Username : {user.username}
              <br />
              {/* <span className="text-gray-950 truncate text-lg font-medium"> */}
              Email : {user.email}
              {/* </span> */}
              <br />
              Password : ****
            </div>
            <Link
              to="/update-profile"
              className="bg-gray-800 p-1 rounded-sm text-center text-white"
            >
              Update Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
