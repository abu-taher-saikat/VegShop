import React from 'react';
import { Image } from 'react-bootstrap';


const LogoTab = ({img, text}) => {
    return (
        <div className="logoTab">
            <Image src={img}></Image>
            <span>{text}</span>
        </div>
    )
}

export default LogoTab
