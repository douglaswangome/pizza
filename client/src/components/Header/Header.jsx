import "./Header.css";
import { Link } from "react-router-dom";

const Header = ({ category, handleAbout, page }) => {
  return (
    <div
      className={`header ${
        category === "classic"
          ? "classic-dark"
          : category === "deluxe"
          ? "deluxe-dark"
          : category === "supreme"
          ? "supreme-dark"
          : ""
      }`}
    >
      <img className="logo-img" src="/images/pizza-logo.png" alt="logo" />
      <div className="links">
        {page === "order" ? (
          <Link to="/" className="link">
            <span>Home</span>
            <hr className="h-line" />
          </Link>
        ) : (
          <div className="link" onClick={handleAbout}>
            <span>About Us</span>
            <hr className="h-line" />
          </div>
        )}
        <Link to="/order_online" className="link">
          <span>Order Online</span>
          <hr className="h-line" />
        </Link>
        <Link to="/authentication" className="link">
          <span>Sign In</span>
          <hr className="h-line" />
        </Link>
      </div>
    </div>
  );
};

export default Header;
