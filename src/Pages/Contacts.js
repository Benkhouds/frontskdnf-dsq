import React, { useEffect } from "react";
import "../App.css";
import Banner from "../components/Banner/Banner";
import Services from "../components/Services/Services";
import Contact from "../components/Contact/Contact";
import FeaturedService from "../components/FeaturedService/FeaturedService";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Infos from "../components/Infos/Infos";
const Contacts = () => {
  return (
    <div className="heder-content">
      <Header />
      <Banner />
      <Services />
      <Infos />

      <FeaturedService />
      <Contact />
      <Footer />
    </div>
  );
};

export default Contacts;
