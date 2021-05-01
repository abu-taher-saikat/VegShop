import React, { useEffect } from "react";
import { Row, Col, Card, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listProducts } from "../actions/productActions";
import Loading from "../Components/Loading";
import BreadCrumbCustome from "../Components/BreadCrumb";

import image from "../assets/images/products/16_9d5560cf-96ca-4f19-991f-bd9ad52b0669_180x.jpg";
import image1 from "../assets/images/products/11_360x.jpg";
import ShopSidebar from "../Components/ShopSidebar";

function ProductScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div className="container-c">
      <BreadCrumbCustome />
      <div className="row">
        <div style={{ borderRight: "1px solid red" }} className="col-md-2">
          <ShopSidebar />
        </div>
        <div className="col-md-10">
          <div className="d-flex listType">
            <button className="btn btn-danger mr-2">List View</button>
            <button className="btn btn-primary">Grid View</button>
          </div>
          <p></p>

          {loading ? (
            <Loading />
          ) : error ? (
            <h3>{error}</h3>
          ) : (
            <>
              <Row>
                {products.map((product) => (
                  <Col xs={6} md={3} sm={8}>
                    <Link
                      style={{
                        textDecoration: "none",
                        ":hover": {
                          backgroundColor: "#ff0000",
                          color: "black!important",
                        },
                      }}
                      to={`/${product._id}`}
                    >
                      <Card
                        className="text-center border"
                        style={{ width: "100%" }}
                      >
                        <ListGroup variant="flush">
                          <div className="img" style={{ height: "40vh" }}>
                            <img
                              className="img-fluid"
                              style={{ objectFit: "contain" }}
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
                          <ListGroup.Item>{product.title}</ListGroup.Item>
                          <small>{product._id}</small>
                          <p>{product.price}</p>
                          <ListGroup.Item>{product.description}</ListGroup.Item>
                        </ListGroup>
                      </Card>
                    </Link>
                  </Col>
                ))}
              </Row>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductScreen;
