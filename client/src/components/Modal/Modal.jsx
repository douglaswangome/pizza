import "./Modal.css";
import { BsX } from "react-icons/bs";

const Modal = ({ show, setShow, children }) => {
  return (
    <div className={`modal ${!show ? "hide" : ""}`}>
      <div className="exit" onClick={() => setShow(!show)}>
        <BsX />
      </div>
      <div className="children">{children}</div>
    </div>
  );
};

export default Modal;
