import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import FirebaseSetup from "./FirebaseSetup";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <FirebaseSetup />
  </StrictMode>
);
