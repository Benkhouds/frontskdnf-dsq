import React, { useEffect } from "react";
import "../App.css";
import Banner from "../components/Banner/Banner";
import Blogs from "../components/Blogs/Blogs";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import AppointmentBanner from "../components/AppointmentBanner/AppointmentBanner";

const Reviews = () => {
  return (
    <div className="heder-content">
      <Header />
      <Banner />
      <AppointmentBanner />
      <Blogs />
      <Footer />
    </div>
  );
};

export default Reviews;
