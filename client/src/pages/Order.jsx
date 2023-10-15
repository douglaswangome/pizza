import "./Order.css";
import { useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Modal from "../components/Modal/Modal";
import { extras, pizzas } from "../utils/json/offline.json";
import Item from "../components/Item/Item";
import Row from "../components/Row/Row";
import { useSelector } from "react-redux";
import Place from "../components/Modals/Place";
import { notify } from "../utils/notify";

const Order = () => {
  const [count, setCount] = useState(1);
  const [showConfirm, setShowConfirm] = useState(false);

  const orders = useSelector((state) => state.table.table) || [];
  const total = useSelector((state) => state.table.total);
  const user = useSelector((state) => state.table.user);

  const handleConfirm = () => {
    if (orders.length === 0) {
      notify(500, "Cannot place an empty order");
    } else if (user._id === "" || user === null) {
      notify(500, "Sign in to place an order");
    } else {
      setCount(count + 1);
      if (count < 2) {
        notify("", "Confirm your order and click the button again to order");
      } else {
        setShowConfirm(true);
        setCount(1);
      }
    }
  };

  return (
    <div className="order">
      {showConfirm && (
        <Modal show={showConfirm} setShow={setShowConfirm}>
          <Place
            orders={orders}
            total={total}
            hideModal={() => setShowConfirm(false)}
          />
        </Modal>
      )}
      <Header page="order" />
      <div className="content">
        <div className="menu">
          <div>
            <span>Classic</span>
            <div>
              {pizzas.map((pizza, index) => {
                if (pizza.category === "classic") {
                  if (orders.find((order) => order.title === pizza.title)) {
                    return <Row key={index} pizza={pizza} included={true} />;
                  }
                  return <Row key={index} pizza={pizza} />;
                }
              })}
            </div>
          </div>
          <div>
            <span>Deluxe</span>
            <div>
              {pizzas.map((pizza, index) => {
                if (pizza.category === "deluxe") {
                  if (orders.find((order) => order.title === pizza.title)) {
                    return <Row key={index} pizza={pizza} included={true} />;
                  }
                  return <Row key={index} pizza={pizza} />;
                }
              })}
            </div>
          </div>
          <div>
            <span>Supreme</span>
            <div>
              {pizzas.map((pizza, index) => {
                if (pizza.category === "supreme") {
                  if (orders.find((order) => order.title === pizza.title)) {
                    return <Row key={index} pizza={pizza} included={true} />;
                  }
                  return <Row key={index} pizza={pizza} />;
                }
              })}
            </div>
          </div>
          <div>
            <span>Extras & Drinks</span>
            <div>
              {extras.map((extra, index) => {
                if (orders.find((order) => order.title === extra.title)) {
                  return <Row key={index} extra={extra} included={true} />;
                }
                return <Row key={index} extra={extra} />;
              })}
            </div>
          </div>
        </div>
        <div className="details">
          <span>Your Order</span>
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <Item
                key={index}
                category={order.category}
                title={order.title}
                size={order.size}
                quantity={order.quantity}
              />
            ))
          ) : (
            <div className="empty">Your order is empty</div>
          )}
          <div className="total">
            <div>
              <span>Total: Ksh.</span>
              <span>{total.toLocaleString()}</span>
            </div>
            <div className="confirm">
              <button onClick={handleConfirm}>
                <span>Place Order</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer page="order" />
    </div>
  );
};

export default Order;
