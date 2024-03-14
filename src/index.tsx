import React from "react";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const domain = process.env.REACT_APP_AUTH0_DOMAIN;      // Set in .env file
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID; // Set in .env file

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Auth0Provider
      // domain="dev-nf0smofc35eikj87.us.auth0.com" //{domain}
      // clientId="ATyBHlxJTF7oCLge5TzAhh8rCcm40rmR" //{clientId}
      domain={domain ?? ""}
      clientId={clientId ?? ""}
      authorizationParams={{
        redirect_uri: `${window.location.origin}/home`,
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
