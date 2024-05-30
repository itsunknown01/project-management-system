import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { Toaster } from "react-hot-toast";
import ModalProvider from "./components/providers/modal-provider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ModalProvider />
      <Toaster />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
