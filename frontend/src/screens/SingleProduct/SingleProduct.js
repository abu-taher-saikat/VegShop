import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productDetails } from "../../actions/productActions";
import BreadCrumbCustome from "../../Components/BreadCrumb";
import CustomeTab from "../../Components/CustomeTab";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

import SliderReview from "../../Components/SliderReview";
import "./SingleProduct.css";

const image2 =
  "https://images.unsplash.com/photo-1618482166868-2843cfc9092a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60";

const image3 =
  "https://images.unsplash.com/photo-1618418392642-7c1f428488fc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8OXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60";

function SingleProduct({ match }) {
  const dispatch = useDispatch();
  const singleProduct = useSelector((state) => state.singleProduct);
  const { product } = singleProduct;
  const { image } = product;
  const [count, setCount] = useState(1);
  console.log(product);

  useEffect(() => {
    dispatch(productDetails(match.params.id));
  }, [dispatch, match.params.id]);

  return (
    <div className="container-fluid">
      {/* breadcrumbs */}
      <BreadCrumbCustome />

      <section className="container-c">
        <div className="row" style={{ margin: "6rem 0px" }}>
          <div className="col-6">
            <div
              style={{ padding: "0px 3px", width: "100%" }}
              className="border  img"
            >
              <Carousel>
                <div style={{ width: "500px" }}>
                  <img
                    style={{
                      height: "100vh",
                      width: "600px",
                      objectFit: "cover",
                    }}
                    className="img-fluid"
                    src={image}
                    alt="vegitable "
                  />
                </div>
                <div>
                  <img
                    style={{
                      height: "100vh",
                      width: "90vh",
                      objectFit: "cover",
                    }}
                    className="img-fluid"
                    src={image2}
                    alt="vegitable "
                  />
                </div>
                <div>
                  <img
                    style={{
                      height: "100vh",
                      width: "90vh",
                      objectFit: "cover",
                    }}
                    className="img-fluid"
                    src={image3}
                    alt="vegitable "
                  />
                </div>
              </Carousel>
            </div>
          </div>
          <div className="border p-3 col-6">
            <h4 className="title pb-4">{product.title}</h4>
            <p className="modalPrimary">
              Availability: <span className="stock">In stock</span>
            </p>

            <p className="modalPrimary">
              Category:<span className="category">{product.category}</span>
            </p>
            <p className="modalPrimary">SKU:</p>
            <br />
            <p className="description">{product.description}</p>
            <h3 className="price">
              ${product.price}{" "}
              <small style={{ fontSize: "12px" }} className="text-success">
                {product.discount}%
              </small>
            </h3>
            <div className="row">
              <div className="col-md-8">
                <div className="d-flex button">
                  <button
                    className="modalBtn"
                    onClick={() => setCount(count + 1)}
                  >
                    +
                  </button>
                  <h1 className="modalBtn CountBtn">
                    {count < 1 ? setCount(1) : count}
                  </h1>
                  <button
                    className="modalBtn"
                    onClick={() => setCount(count - 1)}
                  >
                    -
                  </button>
                </div>
              </div>
              <div className="col-md-4"></div>
            </div>
            <button className="m-2 mt-5 btn-cust">Add To Cart</button>
          </div>
        </div>
      </section>
      {/* )} */}

      {/* product page design */}

      <div className="container">
        <CustomeTab />
        <SliderReview reviewsHead="Reviews" title="Customers Openion" />
      </div>
    </div>
  );
}

export default SingleProduct;
