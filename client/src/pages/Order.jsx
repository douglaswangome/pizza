import "./Order.css";
import { useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Modal from "../components/Modal/Modal";
import { extras, pizzas } from "../utils/offline";
import Item from "../components/Item/Item";
import Row from "../components/Row/Row";
import { useSelector } from "react-redux";
import Place from "../components/Modals/Place";

const Order = () => {
  const [confirm, setConfirm] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const orders = useSelector((state) => state.table.table) || [];
  const total = useSelector((state) => state.table.total);

  return (
    <div className="order">
      <Modal show={showConfirm} setShow={setShowConfirm}>
        <Place orders={orders} total={total} />
      </Modal>
      <Header category="" page="order" />
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
              <div className="check" onClick={() => setConfirm(!confirm)}>
                <div className={`full ${confirm ? "active" : ""}`}></div>
              </div>
              <button onClick={() => setShowConfirm(!showConfirm)}>
                <span>Place Order</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer category="" page="order" />
    </div>
  );
};

export default Order;
