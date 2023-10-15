import { useDispatch } from "react-redux";
import "./Item.css";
import { BsDash, BsPlus, BsTrash } from "react-icons/bs";
import { updateQuantity, updateSize, deleteFromTable } from "../../table/slice";
import { prices } from "../../utils/json/offline.json";

const Item = ({ category, title, size = "", quantity }) => {
  const dispatch = useDispatch();

  const handleAddQuantity = () => {
    dispatch(updateQuantity({ title, newQuantity: quantity + 1 }));
  };

  const handleSubtractQuantity = () => {
    dispatch(updateQuantity({ title, newQuantity: quantity - 1 }));
  };

  const handleUpdateSize = (newSize) => {
    const item = prices.find((price) => {
      if (price.category === category && price.size === newSize) {
        return price;
      }
    });
    dispatch(updateSize({ title, newSize, price: item.price }));
  };

  const handleDeleteFromTable = () => {
    dispatch(deleteFromTable({ title }));
  };

  return (
    <div className="item">
      <div className="meal">
        <span>
          {quantity} {title}
        </span>
        {size !== "" && (
          <div className="sizes">
            <span
              className={`${size === "regular" && "active"}`}
              onClick={() => handleUpdateSize("regular")}
            >
              Regular
            </span>
            <span
              className={`${size === "medium" && "active"}`}
              onClick={() => handleUpdateSize("medium")}
            >
              Medium
            </span>
            <span
              className={`${size === "large" && "active"}`}
              onClick={() => handleUpdateSize("large")}
            >
              Large
            </span>
            <span
              className={`${size === "mega" && "active"}`}
              onClick={() => handleUpdateSize("mega")}
            >
              Mega
            </span>
          </div>
        )}
      </div>
      <div className="quantity">
        <div className="icon" onClick={handleSubtractQuantity}>
          <BsDash />
        </div>
        <div className="icon" onClick={handleAddQuantity}>
          <BsPlus />
        </div>
        <div className="icon" onClick={handleDeleteFromTable}>
          <BsTrash />
        </div>
      </div>
    </div>
  );
};

export default Item;
