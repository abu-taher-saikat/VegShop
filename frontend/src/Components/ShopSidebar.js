import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Loading from "../Components/Loading";
// import Navigation from "./InputRange";
import Navigation from './InputRange';
import Single from "./singleProductComponent";

function ShopSidebar() {
  // eikhane reducer change hbe , eikhane perticular category er best seller item gua thakbe new reducer create kora lagbe

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  // eikhane reducer change hbe , eikhane perticular category er best seller item gua thakbe new reducer create kora lagbe

  return (
    <div>
      <b>Categories</b>
      <button className="btn btn-cus">Fruit Products</button>
      <button className="btn btn-cus">Fresh Meat</button>
      <button className="btn btn-cus"> Ocean Products</button>
      <button className="btn btn-cus"> Feature Products</button>
      <button className="btn btn-cus"> New Products</button>
      <button className="btn btn-cus"> Sale off</button>
      <hr />
      <b>Filter by price</b>
      <Navigation />

      <button className=" btn-cust">Filter</button>
      <h6>Best sellers</h6>

      <div className="row">
        <div className="col-12">
          {loading ? (
            <Loading />
          ) : error ? (
            <h3>{error}</h3>
          ) : (
            <>
              <div className="row">
                {products.slice(0, 5).map((product) => (
                  <div className="col-md-12">
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

export default ShopSidebar;
