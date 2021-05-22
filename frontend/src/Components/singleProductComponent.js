import React from "react";
import { Button, ListGroup, Modal } from "react-bootstrap";
import { BsFillStarFill, BsStarHalf } from "react-icons/bs";
import { BiStar } from "react-icons/bi";

import image from "../assets/images/products/16_9d5560cf-96ca-4f19-991f-bd9ad52b0669_180x.jpg";
import image1 from "../assets/images/products/11_360x.jpg";

function Single({ product }) {
  // modal related
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <div className=" text-center pt-3 pb-5">
      <ListGroup variant="flush">
        <div className="img" style={{ height: "35vh" }}>
          <img
            className="img-fluid"
            style={{ objectFit: "cover" }}
            src={image}
            alt=""
            // onMouseOver={(this.src = { image1 })}
            onMouseOver={(e) => {
              image && (e.currentTarget.src = image1);
            }}
            onMouseOut={(e) => {
              image1 && (e.currentTarget.src = image || "");
            }}
          />
        </div>

        {/* modal  */}
        <Button variant="primary" onClick={() => setModalShow(true)}>
          about product
        </Button>

        <MyVerticallyCenteredModal
          product={product}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
        {/* modal  */}

        <ListGroup.Item>{product.title}</ListGroup.Item>
        <small>{product._id}</small>
        <p>{product.price}</p>
        <ListGroup.Item>{product.description}</ListGroup.Item>
        <div className="review d-flex">
          <BsFillStarFill />
          <BsFillStarFill />
          <BsFillStarFill />
          <BsStarHalf />
          <BiStar />
        </div>
      </ListGroup>
    </div>
  );
}

export default Single;

function MyVerticallyCenteredModal(props) {
  const { product } = props;
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {product._id}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{product.price}</h4>
        <h4>{product.title}</h4>
        <h4>{product.category}</h4>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

// <Link className="Link" to="/slider">
//                     <li className="top-content-li">
//                       <span>SliderReview</span>{" "}
//                     </li>
//                   </Link>
