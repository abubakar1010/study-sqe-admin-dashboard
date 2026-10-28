import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { route } from "./router/Router.tsx";
import AuthProvider from "./context/AuthProvider";
createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <RouterProvider router={route}></RouterProvider>
  </AuthProvider>
);
