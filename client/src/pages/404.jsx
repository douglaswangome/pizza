import "./404.css";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found">
      <img src="/images/base.png" alt="404" />
      <div className="text">
        <span>404 | Page not found</span>
        <span>Just a plain pizza</span>
        <span>
          Click{" "}
          <span className="link" onClick={() => navigate("/")}>
            {" "}
            here{" "}
          </span>
          to go to the home page{" "}
        </span>
      </div>
    </div>
  );
};

export default NotFound;
