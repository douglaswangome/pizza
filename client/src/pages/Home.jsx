import { useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Carousel from "../components/Carousel/Carousel";

const Home = () => {
  const [category, setCategory] = useState("classic");

  return (
    <div>
      <Header category={category} />
      <div className="main">
        <Carousel category={category} setCategory={setCategory} />
      </div>
      <Footer category={category} />
    </div>
  );
};

export default Home;
