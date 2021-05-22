import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Loading from "../Components/Loading";
import BreadCrumbCustome from "../Components/BreadCrumb";

import ShopSidebar from "../Components/ShopSidebar";
import Single from "../Components/singleProductComponent";

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
              <div className="row">
                {products.map((product) => (
                  <div className="col-md-3">
                    <Single product={product} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductScreen;
