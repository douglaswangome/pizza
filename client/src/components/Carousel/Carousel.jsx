import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, A11y, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/bundle";

import "./Carousel.css";
import { useEffect, useState } from "react";
import { pizzas, prices } from "../../utils/json/offline.json";
import { MdTableRestaurant } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addToTable } from "../../table/slice";
import { notify } from "../../utils/notify";

const Carousel = ({ category, setCategory }) => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.table.table) || [];

  const handleAddToTable = (pizza) => {
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
  };

  const [index, setIndex] = useState(0);
  const [summary, setSummary] = useState({ pizza: 0, drinks: 0, extras: 0 });

  const tableSummary = () => {
    if (orders.length > 0) {
      let pizza = 0,
        drinks = 0,
        extras = 0;

      for (let i = 0; i < orders.length; i++) {
        if (orders[i].category === "drink") {
          drinks++;
        } else if (orders[i].category === "extra") {
          extras++;
        } else {
          pizza++;
        }
      }
      setSummary((prevSummary) => {
        return {
          ...prevSummary,
          pizza,
          drinks,
          extras,
        };
      });
    }
  };

  const handleCategoryColor = (index) => {
    setCategory(pizzas[index].category);
  };

  useEffect(() => {
    tableSummary();
  }, [orders]);

  return (
    <Swiper
      className={`${
        category === "classic"
          ? "classic-dark"
          : category === "deluxe"
          ? "deluxe-dark"
          : "supreme-dark"
      }`}
      modules={[Pagination, A11y, Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      // autoplay={{
      //   delay: 3000,
      //   disableOnInteraction: false,
      //   pauseOnMouseEnter: true,
      // }}
      pagination={{ clickable: true }}
      onSlideChange={(swiper) => {
        handleCategoryColor(swiper.activeIndex);
        setIndex(swiper.activeIndex);
      }}
    >
      {pizzas.map((pizza, index) => (
        <SwiperSlide key={index}>
          <div
            className={`carousel ${
              pizza.category === "classic"
                ? "classic-dark"
                : pizza.category === "deluxe"
                ? "deluxe-dark"
                : "supreme-dark"
            }`}
            key={index}
          >
            <div className="body">
              <div className="img">
                <img
                  className="base-img"
                  src="/images/base.png"
                  alt="base pizza"
                />
              </div>
              <div className="contents">
                <div className="pizza">
                  <span className="title">{pizza.title}</span>
                  <div>
                    {pizza.ingredients.map((ingredient, index) => (
                      <span key={index}>{ingredient}</span>
                    ))}
                  </div>
                </div>
                <div className="table">
                  <div className="title table-title">
                    <MdTableRestaurant />
                    <span>Your Table</span>
                  </div>
                  <div className="table-content">
                    <span>{summary.pizza} Pizzas</span>
                    <span>{summary.drinks} Drinks</span>
                    <span>{summary.extras} Extras</span>
                  </div>
                </div>
                <div className="price">
                  <span className="title">prices (Ksh.)</span>
                  <div>
                    {prices.map((price, index) => {
                      if (price.category === pizza.category) {
                        return (
                          <span key={index}>
                            {price.size}: {price.price}
                          </span>
                        );
                      }
                    })}
                  </div>
                </div>
                <div className="button">
                  <button onClick={() => handleAddToTable(pizza)}>
                    <span>Add To Table</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Carousel;
