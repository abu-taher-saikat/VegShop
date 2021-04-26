import React from "react";
import BestSeller from "../Components/BestSeller";
import ImageOffers from "../Components/ImageOffers";
import NewArraivle from "../Components/NewArraivle";
import WebsiteFeature from "./../Components/WebsiteFeature";

const HomeScreen = () => {
  return (
    <div className="container">
      <WebsiteFeature></WebsiteFeature>
      <BestSeller></BestSeller>
      <ImageOffers></ImageOffers>
      <NewArraivle></NewArraivle>
    </div>
  );
};

export default HomeScreen;
