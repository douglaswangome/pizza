import { useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Modal from "../components/Modal/Modal";
import About from "../components/Modals/About";
import Carousel from "../components/Carousel/Carousel";

const Home = () => {
  const [category, setCategory] = useState("classic");
  const [showAbout, setShowAbout] = useState(false);

  return (
    <div>
      <Modal show={showAbout} setShow={setShowAbout}>
        <About />
      </Modal>
      <Header
        category={category}
        handleAbout={() => setShowAbout(true)}
        handleOrderOnline={() => setShowOrderOnline(true)}
      />
      <div className="main">
        <Carousel category={category} setCategory={setCategory} />
      </div>
      <Footer category={category} />
    </div>
  );
};

export default Home;
