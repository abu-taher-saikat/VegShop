import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";

function CustomeModal(props) {
  const { product } = props;

  const [count, setCount] = useState(1);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-6">
            <div className="img">
              <img className="img-fluid" src={product.image} alt="" />
            </div>
          </div>
          <div className="col-md-6">
            <h4 className="title">{product.title}</h4>
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
          </div>
        </div>
      </Modal.Body>
      <button className="m-2 btn-cust" onClick={props.onHide}>
        Add To Cart
      </button>
    </Modal>
  );
}

export default CustomeModal;
