import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";

function BreadCrumbCustome() {
  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="#">Library</Breadcrumb.Item>
        <Breadcrumb.Item active>Data</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
}

export default BreadCrumbCustome;
