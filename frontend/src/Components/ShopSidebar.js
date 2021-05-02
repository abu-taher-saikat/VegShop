import React from "react";
import { useState } from "react";

function ShopSidebar() {
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

      <button className="btn btn-primary">Filter</button>
      <h6>Best sellers</h6>
    </div>
  );
}

export default ShopSidebar;
