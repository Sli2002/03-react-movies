import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App/App";
import "modern-normalize/modern-normalize.css";
import "./index.css"; // якщо маєш базові стилі

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
