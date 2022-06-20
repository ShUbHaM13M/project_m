import React from "react";
import ReactDOM from "react-dom";
import "react-toastify/dist/ReactToastify.min.css";
import "./index.css";
import App from "./App";
import FirebaseProvider from "./components/firebase/context";

ReactDOM.render(
  // <React.StrictMode>
  <FirebaseProvider>
    <App />
  </FirebaseProvider>,
  // </React.StrictMode>,
  document.getElementById("root")
);
