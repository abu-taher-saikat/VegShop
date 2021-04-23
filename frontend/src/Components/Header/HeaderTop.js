import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { AiFillTwitterCircle, AiOutlineInstagram } from 'react-icons/ai';
import { FaFacebookSquare, FaPinterestP } from 'react-icons/fa';
import './Header.css';

const HeaderTop = () => {


    return (
        <div className="headerTop">
            <div className="container">
                <div className="left">
                    <div className="" >Mon - Fri: 9:00am - 19:00pm</div>
                    <div className="px-2"> | </div>
                    <div >support@gmail.com</div>
                </div>
                <div className='right'>
                    <div>
                        <Dropdown>
                                <Dropdown.Toggle variant="success" id="dropdown-basic">
                                    USD
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/action-1">USD</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">BDT </Dropdown.Item>
                                    <Dropdown.Item href="#/action-3">NRI</Dropdown.Item>
                                </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className="">
                        <FaFacebookSquare className="social-link mr-1" />
                        <AiFillTwitterCircle className="social-link mx-1" />
                        <AiOutlineInstagram className="social-link mx-1" />
                        <FaPinterestP className="social-link ml-1" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderTop

// font-family: 'Red Hat Display', sans-serif;