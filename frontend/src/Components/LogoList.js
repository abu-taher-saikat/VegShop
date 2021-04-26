import React from 'react';
import { Image } from 'react-bootstrap';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import img1 from '../assets/images/files/brand51.jpg';
import img2 from '../assets/images/files/brand52.jpg';
import img3 from '../assets/images/files/brand53.jpg';
import img4 from '../assets/images/files/brand54.jpg';
import img5 from '../assets/images/files/brand55.jpg';
import img6 from '../assets/images/files/brand56.jpg';


SwiperCore.use([Navigation, Pagination ]);


const LogoList = () => {
    return (
        <div className="logoList">
            <div className="logoContent">
            <Swiper
                spaceBetween={50}
                slidesPerView={5}
                navigation
                
                pagination={{ clickable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                >
                <SwiperSlide>
                    <Image src={img1}></Image>
                </SwiperSlide>
                <SwiperSlide>
                    <Image src={img2}></Image>
                </SwiperSlide>
                <SwiperSlide>
                    <Image src={img3}></Image>
                </SwiperSlide>
                <SwiperSlide>
                    <Image src={img4}></Image>
                </SwiperSlide>
                <SwiperSlide>
                    <Image src={img5}></Image>
                </SwiperSlide>
                <SwiperSlide>
                    <Image src={img6}></Image>
                </SwiperSlide>

            </Swiper>
            </div>
        </div>
    )
}

export default LogoList
