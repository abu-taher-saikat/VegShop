import React from "react";
import BestSeller from "../Components/BestSeller";

import ImageOffers from "../Components/ImageOffers";
import LatestBlogPost from "../Components/LatestBlogPost";
import LogoList from "../Components/LogoList";
import NewArraivle from "../Components/NewArraivle";
import WebsiteFeature from "./../Components/WebsiteFeature";

const HomeScreen = () => {
  return (
    <>
      <div className="container">
        {/* deleted part  */}
        {/* <ul>
          <Link to="products">
            <li>product</li>
          </Link>
          <Link to="collection">
            <li>Collection</li>
          </Link>
        </ul> */}
        {/* deleted part  */}
        <WebsiteFeature></WebsiteFeature>
        <BestSeller></BestSeller>
        <ImageOffers></ImageOffers>
        <NewArraivle></NewArraivle>
        <LogoList></LogoList>
        <LatestBlogPost></LatestBlogPost>
      </div>
    </>
  );
};

export default HomeScreen;
