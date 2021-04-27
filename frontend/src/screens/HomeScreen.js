import React from "react";
import BestSeller from "../Components/BestSeller";
import Footer from '../Components/Footer/Footer';
import ImageOffers from "../Components/ImageOffers";
import LatestBlogPost from '../Components/LatestBlogPost';
import LogoList from "../Components/LogoList";
import NewArraivle from "../Components/NewArraivle";
import WebsiteFeature from "./../Components/WebsiteFeature";

const HomeScreen = () => {
  return (
      <>
        <div className="container">
        <WebsiteFeature></WebsiteFeature>
        <BestSeller></BestSeller>
        <ImageOffers></ImageOffers>
        <NewArraivle></NewArraivle>
        <LogoList></LogoList>
        <LatestBlogPost></LatestBlogPost>
        </div>
        <Footer></Footer>
    </>
  );
};

export default HomeScreen;
