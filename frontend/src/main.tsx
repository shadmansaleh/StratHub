import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthProvider.tsx";
import { GlobalProvider } from "./contexts/GlobalProvider";
// import { SocketIOProvider } from "./contexts/SocketIoProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GlobalProvider>
      {/* <SocketIOProvider> */}
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
      {/* </SocketIOProvider> */}
    </GlobalProvider>
  </React.StrictMode>
);
