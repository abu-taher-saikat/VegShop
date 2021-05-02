import React from "react";
import { Col, Container, Row } from 'react-bootstrap';
import { BsPersonFill, BsSearch } from 'react-icons/bs';
import { FiPhoneCall, FiShoppingBag } from 'react-icons/fi';
import { Link } from "react-router-dom";
import logo from "../../assets/images/files/logo.svg";
import "./Header.css";

const HeaderMiddle = () => {
  return (
    <div className="headerMiddle">
      <Container>
        <Row>
          <Col md={3}>
            <div className="site-logo">
              <Link to="/">
                <img src={logo} alt="" srcset="" />
              </Link>
            </div>
          </Col>
          <Col md={6}>
            <div className="numAndInput">
              <Row>
                <Col>
                  <div className="numbers mr-2">
                    <div className="icon">
                      <FiPhoneCall className="call-icon"></FiPhoneCall>
                    </div>
                    <div className="wrap ml-3">
                      <span>Call us 24 / 7</span> <br></br>
                      "017 00 000 000"
                    </div>
                  </div>
                </Col>

                <Col>
                  <div className="inputFiled">
                    <form action="">
                      <input
                        placeholder="Enter keywords to search..."
                        className="form-controll"
                        type="text"
                      />

                      <button id="velaSearchTop" className="btnVelaSearch">
                        <span className="icons">
                          <BsSearch className="search-icon"></BsSearch>
                        </span>
                      </button>
                    </form>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
          <Col md={3}>
            <div className="personAndCart">
              <div className="person">
                <BsPersonFill></BsPersonFill>
              </div>
              <div className="cart">
                <span>
                  <FiShoppingBag></FiShoppingBag> Your Cart
                </span>
                <span>point</span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HeaderMiddle;
