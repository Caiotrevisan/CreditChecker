import { HomeAdmin } from "@/pages/Home/HomeAdmin";
import { HomeUser } from "@/pages/Home/HomeUser";
import Login from "@/pages/Login";
import { Register } from "@/pages/Register";
import { RegisterUpdate } from "@/pages/RegisterUpdate";
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
    path: "/registerUpdate",
    element: <RegisterUpdate />,
    children: [],
  },
  {
    path: "/HomeAdmin",
    element: (
      <HomeAdmin />
    ),
    children: [],
  },
  {
    path: "/HomeUser",
    element: (
      <HomeUser />
    ),
    children: [],
  },
]);
