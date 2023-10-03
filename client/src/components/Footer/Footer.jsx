import "./Footer.css";
import {
  BsInstagram,
  BsTwitter,
  BsWhatsapp,
  BsApple,
  BsGooglePlay,
} from "react-icons/bs";

const Footer = ({ category }) => {
  return (
    <div
      className={`footer ${
        category === "classic"
          ? "classic-dark"
          : category === "deluxe"
          ? "deluxe-dark"
          : category === "supreme"
          ? "supreme-dark"
          : ""
      }`}
    >
      <div className="socials">
        <div className="apps">
          <div>
            <BsGooglePlay />
          </div>
          <div>
            <BsApple />
          </div>
        </div>
        <div className="media">
          <div
            className={`${
              category === "classic"
                ? "classic-neutral"
                : category === "deluxe"
                ? "deluxe-neutral"
                : category === "supreme"
                ? "supreme-neutral"
                : "main-dark"
            }`}
          >
            <BsWhatsapp />
          </div>
          <div
            className={`${
              category === "classic"
                ? "classic-neutral"
                : category === "deluxe"
                ? "deluxe-neutral"
                : category === "supreme"
                ? "supreme-neutral"
                : "main-dark"
            }`}
          >
            <BsInstagram />
          </div>
          <div
            className={`${
              category === "classic"
                ? "classic-neutral"
                : category === "deluxe"
                ? "deluxe-neutral"
                : category === "supreme"
                ? "supreme-neutral"
                : "main-dark"
            }`}
          >
            <BsTwitter />
          </div>
        </div>
      </div>
      <hr className="h-line" />
      <div className="copyright">
        <span>Copyright &copy; 2023</span>
        {/* Link to Simbisa Page */}
        <span>Simbisa Brands Kenya</span>
      </div>
    </div>
  );
};

export default Footer;
