import React from 'react';
import BestSeller from '../Components/BestSeller';
import ImageOffers from '../Components/ImageOffers';
import WebsiteFeature from './../Components/WebsiteFeature';


const HomeScreen = () => {
    return (
        <div>
            <WebsiteFeature></WebsiteFeature>
            <BestSeller></BestSeller>
            <ImageOffers></ImageOffers>
        </div>
    )
}

export default HomeScreen
