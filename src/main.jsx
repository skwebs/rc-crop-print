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
import { store } from "./store/store";
import { Provider } from "react-redux";
import CropAndGrid from "./pages/CropAndGrid/CropAndGrid";
import PageNotFound from "./components/PageNotFound/PageNotFound";

const router = createBrowserRouter(
  createRoutesFromChildren(
    <>
      <Route path="/" element={<Layout />} errorElement={<PageNotFound />}>
        <Route index element={<CropAndGrid />} />
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

