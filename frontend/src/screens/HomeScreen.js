import React from 'react';
import BestSeller from '../Components/BestSeller';
import Footer from '../Components/Footer/Footer';
import ImageOffers from '../Components/ImageOffers';
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
            </div>
                <Footer></Footer>
        </>
    )
}

export default HomeScreen
