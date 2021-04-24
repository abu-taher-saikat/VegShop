import React from 'react';
import { Image } from 'react-bootstrap';
import img1 from '../assets/images/files/banner57_540x.jpg';
import img4 from '../assets/images/files/banner58_540x.jpg';
import img2 from '../assets/images/files/banner59_540x.jpg';
import img3 from '../assets/images/files/banner60_540x.jpg';
import img5 from '../assets/images/files/banner61_540x.jpg';

const ImageOffers = () => {
    return (
        <div className="imageOffers container mb-4">
            <div className="img img1">
                <Image src={img1} fluid></Image>
            </div>
            <div className="img img2">
                <Image src={img2} fluid></Image>
            </div>
            <div className="img img3">
                <Image src={img3} fluid></Image>
            </div>
            <div className="img img4">
                <Image src={img4} fluid></Image>
            </div>
            <div className="img img5">
                <Image src={img5} fluid></Image>
            </div>
        </div>
    )
}

export default ImageOffers
