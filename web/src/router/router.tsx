import { ProtectedRoute } from "@/components/ProtectedRoute";
import { HomeAdmin } from "@/pages/Home/HomeAdmin";
import { HomeUser } from "@/pages/Home/HomeUser";
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
  {
    path: "/HomeAdmin",
    element: (
      //<ProtectedRoute>
      <HomeAdmin />
      //</ProtectedRoute>
    ),
    children: [],
  },
  {
    path: "/HomeUser",
    element: (
      //<ProtectedRoute>
      <HomeUser />
      // </ProtectedRoute>
    ),
    children: [],
  },
]);
