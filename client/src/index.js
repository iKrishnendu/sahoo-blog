// index.js or App.js
import React from "react";
// import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import { Provider } from "react-redux";
// import GoogleOAuthProvider from "./components/GoogleOAuthProvider";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        {/* <GoogleOAuthProvider> */}
        <BrowserRouter>
          <App />
        </BrowserRouter>
        {/* </GoogleOAuthProvider> */}
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
