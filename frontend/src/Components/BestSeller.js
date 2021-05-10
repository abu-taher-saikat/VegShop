import React from 'react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import DemoProduct from './DemoProduct';
// import {useDispatch, useSelector} from 'react-redux';
// import {} from '../'



SwiperCore.use([Navigation, Pagination ]);




const BestSeller = () => {
    return (
        <div className="bestSeller">
            <div className="heading">
                <h1>Best Seller Products</h1>
                <p>Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat.</p>
            </div>
            <div className="swaper__content">
            <Swiper
                spaceBetween={50}
                slidesPerView={4}
                navigation
                pagination={{ clickable: true }}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                >
                    {/* map... */}
                <SwiperSlide>
                    <DemoProduct></DemoProduct>
                </SwiperSlide>
                <SwiperSlide>
                    <DemoProduct></DemoProduct>
                </SwiperSlide>
                <SwiperSlide>
                    <DemoProduct></DemoProduct>
                </SwiperSlide>
                <SwiperSlide>
                    <DemoProduct></DemoProduct>
                </SwiperSlide>
                <SwiperSlide>
                    <DemoProduct></DemoProduct>
                </SwiperSlide>
                <SwiperSlide>
                    <DemoProduct></DemoProduct>
                </SwiperSlide>
            </Swiper>
            </div>
        </div>
    )
}

export default BestSeller
