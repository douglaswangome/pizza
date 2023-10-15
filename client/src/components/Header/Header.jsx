import "./Header.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaX, FaPizzaSlice } from "react-icons/fa6";
import Modal from "../Modal/Modal";
import About from "../Modals/About";

const Header = ({ category = "", page = "" }) => {
  const user = useSelector((state) => state.table.user) || null;

  const [showAbout, setShowAbout] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

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
      <Modal show={showAbout} setShow={setShowAbout}>
        <About />
      </Modal>
      <img
        onClick={() => console.log(user)}
        className="logo-img"
        src="/images/pizza-logo.png"
        alt="logo"
      />
      <div
        className={`links ${showMenu ? "show" : "hide"} ${
          category === "classic"
            ? "classic-dark"
            : category === "deluxe"
            ? "deluxe-dark"
            : category === "supreme"
            ? "supreme-dark"
            : ""
        }`}
      >
        <Link to="/" className="link">
          <span>Home</span>
          <hr className="h-line" />
        </Link>
        {page !== "order" && (
          <div className="link" onClick={() => setShowAbout(!showAbout)}>
            <span>About Us</span>
            <hr className="h-line" />
          </div>
        )}
        <Link to="/order_online" className="link">
          <span>Order Online</span>
          <hr className="h-line" />
        </Link>
        {user === null ? (
          <Link to="/authentication" className="link">
            <span>Sign In</span>
            <hr className="h-line" />
          </Link>
        ) : (
          <Link to={`/profile/${user._id}`} className="profile link">
            <span>Hi, {user.name.split(" ")[0]}</span>
          </Link>
        )}
      </div>
      <div
        className={`menu ${showMenu && "hide"}`}
        onClick={() => setShowMenu(!showMenu)}
      >
        <FaPizzaSlice className={`icon ${showMenu && "hide"}`} />
        <FaX className={`icon ${!showMenu && "hide"}`} />
      </div>
    </div>
  );
};

export default Header;
