import React from "react";
import { Spinner } from "react-bootstrap";

function Loading() {
  return (
    <div>
      <div className="spinner">
        <Spinner animation="grow" />
      </div>
    </div>
  );
}

export default Loading;
