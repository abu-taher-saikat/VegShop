import React from "react";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";

import "./SliderReview.css";

// images
const slideImages = [
  {
    comment:
      "This is the minimum amount of context you need to provide. However, to make your writing even stronger, you could add more to your contextualization, such as:",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    user: "Mregel-smith, Data Science",
  },
  {
    comment:
      "This is the minimum amount of context you need to provide. However, to make your writing even stronger, you could add more to your contextualization, such as:",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    user: "NErabel-smith, Data Science",
  },
  {
    comment:
      "This is the minimum amount of context you need to provide. However, to make your writing even stronger, you could add more to your contextualization, such as:",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    user: "rocifa-smith, Data Science",
  },
  {
    comment:
      "This is the minimum amount of context you need to provide. However, to make your writing even stronger, you could add more to your contextualization, such as:",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fHVzZXIlMjBwcm9maWxlfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    user: "jordan -smith, Data Science",
  },
];

function SliderReview({ title, reviewsHead, reviews }) {
  return (
    <div className="slider container">
      <div className="text-center mt-5 header">
        <p>{title ? title : "KIND WORDS"}</p>
        <h3>{reviewsHead ? reviewsHead : "TESTIMONIAL"}</h3>
        <span className="underlineSlider"></span>
      </div>
      <section className="slider text-center">
        <div>
          <Slide easing="ease">
            {reviews
              ? reviews
              : slideImages.map((user) => (
                  <div
                    style={{
                      border: "1px solid #e9e9e9",
                      padding: "10px",
                      width: "60%",
                      margin: "0 auto",
                    }}
                    className="each-slide"
                  >
                    <div
                      className="image"
                      style={{
                        borderRadious: "50px",
                      }}
                    >
                      <img
                        style={{
                          width: "15%",
                          height: "100px",
                          objectFit: "cover",
                        }}
                        src={user.image}
                        alt=""
                      />
                    </div>
                    <h5 className="slider-comment">{user.comment}</h5>
                    <h6 className="slider-user">
                      <i> -{user.user}</i>
                    </h6>
                  </div>
                ))}
          </Slide>
        </div>
      </section>
    </div>
  );
}

export default SliderReview;
