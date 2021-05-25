import React from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import img1 from "../assets/images/Blog/1_900x.jpg";
import img2 from "../assets/images/Blog/2_3a11db6e-97ac-49ff-ac7a-ee5a21411ae2_900x.jpg";
import img3 from "../assets/images/Blog/3_900x.jpg";
import img4 from "../assets/images/Blog/5_900x.jpg";
import img5 from "../assets/images/Blog/6_900x.jpg";

const LatestBlogPost = () => {
  return (
    <div className="latestBlogPost">
      <div className="text__section py-4">
        <h1>Latest Blog Posts</h1>
        <p>
          Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse
          molestie consequat.
        </p>
      </div>
      <div className="slider__section">
        <Swiper
          spaceBetween={20}
          slidesPerView={3}
          navigation
          onSwiper={(swiper) => console.log(swiper)}
        >
          <SwiperSlide>
            <Image src={img1} fluid></Image>
            <div className="blog-post__content text-center">
              <div className="blog__title pt-3">
                <p>Summer garden tips</p>
              </div>
              <div class="articleMeta d-flex flexJustifyCenter">
                <span className="articleAuthor">
                  <span>By</span> Mr Admin
                </span>
                <span>/</span>
                <span className="articlePublish pull-left">
                  <i class="fa fa-calendar-o" aria-hidden="true"></i>June 18,
                  2019
                </span>
              </div>
              <div className="articleDesc">
                Diga, Koma and Torus are three kitchen utensils designed for
                Ommo, a new design-oriented brand introduced at the Ambiente
                show in February...
              </div>
              <Link
                className="btnReadMore"
                href="/blogs/news/summer-garden-tips-7"
                title="Read More"
              >
                + Read More
              </Link>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <Image src={img2} fluid></Image>
            <div className="blog-post__content text-center">
              <div className="blog__title pt-3">
                <p>Summer garden tips</p>
              </div>
              <div class="articleMeta d-flex flexJustifyCenter">
                <span className="articleAuthor">
                  <span>By</span> Mr Admin
                </span>
                <span>/</span>
                <span className="articlePublish pull-left">
                  <i class="fa fa-calendar-o" aria-hidden="true"></i>June 18,
                  2019
                </span>
              </div>
              <div className="articleDesc">
                Diga, Koma and Torus are three kitchen utensils designed for
                Ommo, a new design-oriented brand introduced at the Ambiente
                show in February...
              </div>
              <Link
                className="btnReadMore"
                href="/blogs/news/summer-garden-tips-7"
                title="Read More"
              >
                + Read More
              </Link>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <Image src={img3} fluid></Image>
            <div className="blog-post__content text-center">
              <div className="blog__title pt-3">
                <p>Summer garden tips</p>
              </div>
              <div class="articleMeta d-flex flexJustifyCenter">
                <span className="articleAuthor">
                  <span>By</span> Mr Admin
                </span>
                <span>/</span>
                <span className="articlePublish pull-left">
                  <i class="fa fa-calendar-o" aria-hidden="true"></i>June 18,
                  2019
                </span>
              </div>
              <div className="articleDesc">
                Diga, Koma and Torus are three kitchen utensils designed for
                Ommo, a new design-oriented brand introduced at the Ambiente
                show in February...
              </div>
              <Link
                className="btnReadMore"
                href="/blogs/news/summer-garden-tips-7"
                title="Read More"
              >
                + Read More
              </Link>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <Image src={img4} fluid></Image>
            <div className="blog-post__content text-center">
              <div className="blog__title pt-3">
                <p>Summer garden tips</p>
              </div>
              <div class="articleMeta d-flex flexJustifyCenter">
                <span className="articleAuthor">
                  <span>By</span> Mr Admin
                </span>
                <span>/</span>
                <span className="articlePublish pull-left">
                  <i class="fa fa-calendar-o" aria-hidden="true"></i>June 18,
                  2019
                </span>
              </div>
              <div className="articleDesc">
                Diga, Koma and Torus are three kitchen utensils designed for
                Ommo, a new design-oriented brand introduced at the Ambiente
                show in February...
              </div>
              <Link
                className="btnReadMore"
                href="/blogs/news/summer-garden-tips-7"
                title="Read More"
              >
                + Read More
              </Link>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <Image src={img5} fluid></Image>
            <div className="blog-post__content text-center">
              <div className="blog__title pt-3">
                <p>Summer garden tips</p>
              </div>
              <div class="articleMeta d-flex flexJustifyCenter">
                <span className="articleAuthor">
                  <span>By</span> Mr Admin
                </span>
                <span>/</span>
                <span className="articlePublish pull-left">
                  <i class="fa fa-calendar-o" aria-hidden="true"></i>June 18,
                  2019
                </span>
              </div>
              <div className="articleDesc">
                Diga, Koma and Torus are three kitchen utensils designed for
                Ommo, a new design-oriented brand introduced at the Ambiente
                show in February...
              </div>
              <Link
                className="btnReadMore"
                href="/blogs/news/summer-garden-tips-7"
                title="Read More"
              >
                + Read More
              </Link>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="text-center">
        <Link to="/blogs">
          <button className="btn-custome">More</button>
        </Link>
      </div>
    </div>
  );
};

export default LatestBlogPost;
