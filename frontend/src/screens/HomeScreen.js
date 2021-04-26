<<<<<<< HEAD
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
=======
import React from 'react';
import BestSeller from '../Components/BestSeller';
import Footer from '../Components/Footer/Footer';
import ImageOffers from '../Components/ImageOffers';
import LatestBlogPost from '../Components/LatestBlogPost';
import LogoList from '../Components/LogoList';
import WebsiteFeature from './../Components/WebsiteFeature';


const HomeScreen = () => {
    return (
        <>
            <div className="container">
                <WebsiteFeature></WebsiteFeature>
                <BestSeller></BestSeller>
                <ImageOffers></ImageOffers>
                {/* <NewArraivle></NewArraivle> */}
                <LogoList></LogoList>
                <LatestBlogPost></LatestBlogPost>
            </div>
                <Footer></Footer>
        </>
    )
}
>>>>>>> d9ec296104fad4acdbc94822cd8402a2fee09e5a

export default HomeScreen;
