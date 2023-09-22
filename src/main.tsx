import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { ThemeProvider } from "@emotion/react";
import Theme from "./Theme";
import { CssBaseline } from "@mui/material";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={Theme()}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
