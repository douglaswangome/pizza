import "./Row.css";
import { extras, prices } from "../../utils/json/offline.json";
import { useDispatch } from "react-redux";
import { addToTable, deleteFromTable } from "../../table/slice";
import { notify } from "../../utils/notify";

const Row = ({ extra = null, included = false, pizza = null }) => {
  const dispatch = useDispatch();
  const handleTable = () => {
    if (pizza === null) {
      if (!included) {
        const item = extras.find((item) => {
          if (item.title === extra.title) {
            return item;
          }
        });

        dispatch(addToTable(item));
        const capitalizedTitle = item.title
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
        notify(200, `1 ${capitalizedTitle} added`);
      } else {
        dispatch(deleteFromTable({ title: extra.title }));
      }
    } else {
      if (!included) {
        const item = prices.find((price) => {
          if (price.category === pizza.category && price.size === "large") {
            return price;
          }
        });
        item.title = pizza.title;

        dispatch(addToTable(item));
        const capitalizedTitle = pizza.title
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
        notify(200, `1 Large ${capitalizedTitle} Pizza added`);
      } else {
        dispatch(deleteFromTable({ title: pizza.title }));
      }
    }
  };
  return (
    <div className="row">
      <span className={`${included && "included"}`} onClick={handleTable}>
        {pizza?.title || `${extra?.title} - ${extra?.price}`}
      </span>
    </div>
  );
};

export default Row;
