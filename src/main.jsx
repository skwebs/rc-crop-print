import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromChildren,
} from "react-router-dom";
import Layout from "./Layout.jsx";
import { store } from "./app/store";
import { Provider } from "react-redux";
import CropAndGrid from "./pages/CropAndGrid/CropAndGrid";

const router = createBrowserRouter(
  createRoutesFromChildren(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<CropAndGrid />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

