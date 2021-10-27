import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import App from "./App";
import { AuthProvider } from "./state/AuthContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
