import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { AiFillCaretDown } from 'react-icons/ai';
import './Header.css';
const HeaderMain = () => {
    const [home, setHome] = useState("none");
    const [shop, setShop] = useState("none");
    const [collection, setCollection] = useState("none");


    return (
        <div className="headerMain">
            <div className="container">
                <div className="headerMenuInter">
                    <Row className="row">
                        <Col className="col-xs-12 col-sm-12 col-md-3 main-menu-left">
                            <div className="verticalMenu"></div>
                        </Col>
                        <Col className="hidden-xs hidden-sm col-md-9 main-menu-right">
                            <div className="menu-container">
                                <ul className="top-content">
                                    <li className="top-content-li">
                                        <div 
                                            onMouseOver={()=> setHome("block")} onMouseOut={()=> setHome("none")} className="dropdown">
                                            <span>Home <AiFillCaretDown /></span>
                                            <div style={{display : home}} className="dropDownContent">
                                                <ul className="innerMenu-content">
                                                    <li>home 1</li>
                                                    <li>home 1</li>
                                                    <li>home 1</li>
                                                    <li>home 1</li>
                                                    <li>home 1</li>
                                                    <li>home 1</li>
                                                    <li>home 6</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="top-content-li">
                                    <div 
                                            onMouseOver={()=> setShop("block")} onMouseOut={()=> setShop("none")} className="dropdown">
                                            <span>Shop <AiFillCaretDown /></span>
                                            <div style={{display : shop}} className="dropDownContent">
                                                <ul className="innerMenu-content">
                                                    <li>home 1</li>
                                                    <li>home 1</li>
                                                    <li>home 1</li>
                                                    <li>home 1</li>
                                                    <li>home 1</li>
                                                    <li>home 1</li>
                                                    <li>home 6</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="top-content-li">
                                    <div 
                                            onMouseOver={()=> setCollection("block")} onMouseOut={()=> setCollection("none")} className="dropdown">
                                            <span>Collections <AiFillCaretDown /></span>
                                            <div style={{display : collection}} className="dropDownContent">
                                                <ul className="innerMenu-content">
                                                    <li>home 1</li>
                                                    <li>home 1</li>
                                                    <li>home 1</li>
                                                    <li>home 1</li>
                                                    <li>home 1</li>
                                                    <li>home 1</li>
                                                    <li>home 6</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="top-content-li"> <span>Blogs</span></li>
                                    <li className="top-content-li"><span>Contacts Us</span> </li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}

export default HeaderMain