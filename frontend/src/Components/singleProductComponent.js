import React, { useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { BiStar } from "react-icons/bi";
import { BsFillStarFill, BsStarHalf } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { productDetails } from '../actions/productActions';
import image1 from "../assets/images/products/11_360x.jpg";
// import image from "../assets/images/products/16_9d5560cf-96ca-4f19-991f-bd9ad52b0669_180x.jpg";




function Single({ product }) {
  const dispatch = useDispatch();

  const singleProduct = useSelector((state) => state.singleProduct);
  const { loading, product : spDetails, error } = singleProduct;

  console.log(`singleProductDetails`, product)

  useEffect(()=>{
    dispatch(productDetails(product._id))
  }, [dispatch, product._id])

  return (
    <Link className="Link" to={`/product/${product._id}`}>

      <div className=" text-center signleProductComp pt-3 pb-5">
        <ListGroup variant="flush">
          <div className="img" style={{ height: "50%",marginBottom: "2rem" }}>
            <img
              className="img-fluid"
              // style={{ objectFit: "cover" }}
              style={{ height: "250px", borderRadious: '20px', }}
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
          <p className='title'>{product.title}</p>
          <small  className='title'>{product.category}</small>
          <p className='title'>${product.price}</p>
          <p className='descriptoion'>{product.description}</p>
          <div className="reviewStar d-flex">
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
