import React, { useEffect, useState } from "react";
import { register } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// const BASE_URL = "http://localhost:5000"; // Update this to your actual backend URL

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3); // Initial countdown value
  const [welcomeUser, setWelcomeUser] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    // let isMounted = true;
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      verifyEmail(token);
    } else {
      console.error("Verification token not found in the URL");
      // Handle the case where the token is missing
    }
    // Cleanup function
    // return () => {
    //   isMounted = false;
    // };
  }, []);

  const verifyEmail = async (token) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/auth/verify?token=${token}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Verification failed");
      }

      const data = await response.json();
      console.log(response.status);

      if (response.ok) {
        dispatch(register(data));
        setWelcomeUser(data.username);
        setIsVerified(true);

        // Redirect the user after 3 seconds
        setTimeout(() => {
          navigate("/");
          // Add your redirection logic here
        }, 3000);
      }
      console.log(data); // Handle the response data as needed
    } catch (error) {
      console.error(error);
      // Handle the error as needed
    }
  };

  return (
    <div className="text-center">
      {isVerified ? (
        <div>
          <h1 className="text-3xl mb-4">Congratulations, {welcomeUser}!</h1>
          <p className="text-xl">You are verified. Redirecting...</p>
        </div>
      ) : (
        <div>
          <h1 className="text-3xl mb-4">Verifying {welcomeUser}...</h1>
          <p className="text-xl">{countdown} seconds remaining</p>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
