import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { UserProvider } from "./state/UserProvider";
import { AuthProvider } from "./state/AuthContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
