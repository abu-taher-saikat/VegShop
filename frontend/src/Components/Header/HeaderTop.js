import React from 'react';
import { Dropdown } from 'react-bootstrap';
import './Header.css';

const HeaderTop = () => {


    return (
        <div className="headerTop">
            <div className="container">
                <div classnames="left">
                    <div >Mon - Fri: 9:00am - 19:00pm</div>
                    <span> | </span>
                    <div >support@gmail.com</div>
                </div>
                <div classnames='right'>
                    <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                USD
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                            </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        </div>
    )
}

export default HeaderTop

// font-family: 'Red Hat Display', sans-serif;