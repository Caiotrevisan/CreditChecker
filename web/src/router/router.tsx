import Login from "@/pages/Login";
import { Register } from "@/pages/Register";
import { createBrowserRouter } from "react-router-dom";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    children: [],
  },
  {
    path: "/register",
    element: <Register />,
    children: [],
  },
]);
