import React from "react";
import { ListGroup } from "react-bootstrap";
import { BsFillStarFill, BsStarHalf } from "react-icons/bs";
import { BiStar } from "react-icons/bi";
import { Link } from "react-router-dom";

import { FaCartPlus } from "react-icons/fa";
import { AiFillEye } from "react-icons/ai";

import image1 from "../assets/images/products/11_360x.jpg";
import CustomeModal from "./CustomeModal";
// import image from "../assets/images/products/16_9d5560cf-96ca-4f19-991f-bd9ad52b0669_180x.jpg";

function Single({ product }) {
  // modal related
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <div className="text-center signleProductComp pt-3 pb-5">
        <ListGroup variant="flush">
          <Link className="Link" to={`/product/${product._id}`}>
            <div
              className="img"
              style={{ height: "50%", marginBottom: "2rem" }}
            >
              <img
                className="img-fluid"
                // style={{ objectFit: "cover" }}
                style={{ height: "250px", borderRadious: "20px" }}
                src={product.image}
                alt=""
                onMouseOver={(e) => {
                  product.image && (e.currentTarget.src = image1);
                }}
                onMouseOut={(e) => {
                  image1 && (e.currentTarget.src = product.image || "");
                }}
              />
            </div>
          </Link>

          {/* image done  */}
          <div className="cart row">
            <div className="cart-section col-6">
              <h3>
                <FaCartPlus />
              </h3>
            </div>
            <div className="cart-section col-6">
              <h3
                // className="hoverCartButton"
                // style={{ display: "none" }}
                variant="primary"
                onClick={() => setModalShow(true)}
              >
                <AiFillEye />
              </h3>
            </div>
          </div>

          {/* modal  */}

          <CustomeModal
            product={product}
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
          {/* modal  */}

          <p className="title">{product.title}</p>
          <small className="title">{product.category}</small>
          <p className="title">${product.price}</p>
          <p className="descriptoion">{product.description}</p>
          <div style={{ margin: "0 auto" }} className="reviewStar d-flex">
            <BsFillStarFill />
            <BsFillStarFill />
            <BsFillStarFill />
            <BsStarHalf />
            <BiStar />
          </div>
        </ListGroup>
      </div>
    </>
  );
}

export default Single;

// function MyVerticallyCenteredModal() {

// }
