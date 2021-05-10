import React, { useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { BiStar } from "react-icons/bi";
import { BsFillStarFill, BsStarHalf } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { productDetails } from '../actions/productActions';
import image1 from "../assets/images/products/11_360x.jpg";
import image from "../assets/images/products/16_9d5560cf-96ca-4f19-991f-bd9ad52b0669_180x.jpg";




function Single({ product }) {
  const dispatch = useDispatch();

  const singleProduct = useSelector((state) => state.singleProduct);
  const { loading, product : spDetails, error } = singleProduct;

  console.log(`singleProductDetails`, spDetails)

  useEffect(()=>{
    dispatch(productDetails(product._id))
  }, [dispatch, product._id])

  return (
    <Link to={`/product/${product._id}`}>

      <div className=" text-center pt-3 pb-5">
        <ListGroup variant="flush">
          <div className="img" style={{ height: "35vh" }}>
            <img
              className="img-fluid"
              style={{ objectFit: "cover" }}
              src={image}
              alt=""
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
          <div className="d-flex">
            <BsFillStarFill />
            <BsFillStarFill />
            <BsFillStarFill />
            <BsStarHalf />
            <BiStar />
          </div>
        </ListGroup>
      </div>
    </Link>
  );
}

export default Single;
