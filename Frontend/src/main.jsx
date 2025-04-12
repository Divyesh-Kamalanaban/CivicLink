import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthContextProvider } from "./context/authContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { PostContextProvider } from "./context/postContext.jsx";
import { WorkContextProvider } from "./context/workContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthContextProvider>
      <PostContextProvider>
        <WorkContextProvider>
          <App />
        </WorkContextProvider>
      </PostContextProvider>
    </AuthContextProvider>
    <Toaster />
  </BrowserRouter>
);
