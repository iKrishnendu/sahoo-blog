// GoogleOAuthProvider.js
import React from "react";
import { GoogleOAuthProvider as BaseGoogleOAuthProvider } from "@react-oauth/google";

const GoogleOAuthProvider = ({ children }) => {
  const clientId =
    "417457836712-1e0fsjj6rh0q8pu85nrb4s4pvlho76hj.apps.googleusercontent.com"; // Replace with your actual Google API client ID

  return (
    <BaseGoogleOAuthProvider clientId={clientId}>
      {children}
    </BaseGoogleOAuthProvider>
  );
};

export default GoogleOAuthProvider;
