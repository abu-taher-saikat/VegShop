import React from 'react';
import { Image } from 'react-bootstrap';
import veg1 from '../assets/images/products/15_5bb4edc7-c533-4dde-9dd4-f615330a87ef_360x.jpg';

const DemoProduct = () => {
    return (
        <div className="demoProduct">
            <Image className="image" src={veg1} fluid></Image>
            <div className="text__content">
                <h4 className="category"> Vegitable</h4>
                <h1 className="title"> Orage</h1>
                <h1 className="price"> $21.20</h1>
                <h6>Rating</h6>
            </div>
        </div>
    )
}

export default DemoProduct
