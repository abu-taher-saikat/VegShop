import React, { useEffect } from "react";
import { Row, Col, Card, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listProducts } from "../actions/productActions";
import Loading from "../Components/Loading";

function ProductScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div className="container">
      <p>Product pageas</p>
      <p></p>

      {loading ? (
        <Loading />
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col>
                <Link to={`/singleProduct/${product._id}`}>
                  <Card className="border" style={{ width: "18rem" }}>
                    <ListGroup variant="flush">
                      <ListGroup.Item>{product.title}</ListGroup.Item>
                      <ListGroup.Item>{product._id}</ListGroup.Item>
                      <ListGroup.Item>{product.description}</ListGroup.Item>
                      <ListGroup.Item>{product.price}</ListGroup.Item>
                    </ListGroup>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </>
      )}
    </div>
  );
}

export default ProductScreen;
