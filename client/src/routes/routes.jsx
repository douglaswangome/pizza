import axios from "axios";
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Order from "../pages/Order";
import Auth from "../pages/Auth";

export const api = axios.create({ baseURL: "http://localhost:5000/" });

const routes = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/order_online", element: <Order /> },
  { path: "/authentication", element: <Auth /> },
]);

export default routes;
