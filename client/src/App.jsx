import "./App.css";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes";

const App = () => {
  return (
    <div className="app">
      <RouterProvider router={routes} />
    </div>
  );
};

export default App;
