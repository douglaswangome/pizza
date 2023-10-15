import axios from "axios";
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Order from "../pages/Order";
import Auth from "../pages/Auth";
import Profile from "../pages/Profile";
import About from "../components/Modals/About";

export const api = axios.create({ baseURL: "https://localhost:5000/" });

const routes = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/about_us", element: <About /> },
  { path: "/order_online", element: <Order /> },
  { path: "/authentication", element: <Auth /> },
  { path: "/profile/:id", element: <Profile /> },
]);

export default routes;
