import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import veg from '../assets/images/files/coll51_45x45.png';
import drinks from '../assets/images/files/coll52_45x45.png';
import fresh from '../assets/images/files/coll53_45x45.png';
import fruits from '../assets/images/files/coll54_45x45.png';
import salad from '../assets/images/files/coll55_45x45.png';
import bread from '../assets/images/files/coll56_45x45.png';
import LogoTab from './newArrive/LogoTab';

const NewArrivelTab = () => {
    const [toggleState , setToggleState] = useState(1);

    const toggleTab = (index) => {
        setToggleState(index);
    }
    return (
        <>
            <Row className="buttons justify-content-center">
                <Col className="block-tabs" onClick={() => toggleTab(1)}>
                <LogoTab img={veg} text="Vegitable"></LogoTab>
                </Col>
                <Col className="block-tabs" onClick={() => toggleTab(2)}>
                <LogoTab img={drinks} text="Drinks"></LogoTab>
                </Col>
                <Col className="block-tabs" onClick={() => toggleTab(3)}>
                <LogoTab img={fresh} text="Fresh foods"></LogoTab>
                </Col>
                <Col className="block-tabs" onClick={() => toggleTab(4)}>
                <LogoTab img={fruits} text="Fresh foods"></LogoTab>
                </Col>
                <Col className="block-tabs" onClick={() => toggleTab(5)}>
                <LogoTab img={salad} text="Fresh foods"></LogoTab>
                </Col>
                <Col className="block-tabs" onClick={() => toggleTab(6)}>
                <LogoTab img={bread} text="Fresh foods"></LogoTab>
                </Col>
            </Row>

                <div>
                    <div className={toggleState === 1 ? "tabs active-tabs" : "tabs"}>
                        <h2>Content 1</h2>
                        <hr />
                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor,
                            praesentium.
                        </p>
                    </div>
                    <div className={toggleState === 2 ? "tabs active-tabs" : "tabs"}>
                        <h2>Content 2</h2>
                        <hr />
                        <p>
                            Lorem 2 ipsum dolor sit amet consectetur, adipisicing elit. Dolor,
                            praesentium.
                        </p>
                    </div>
                    <div className={toggleState === 3 ? "tabs active-tabs" : "tabs"}>
                        <h2>Content 3</h2>
                        <hr />
                        <p>
                            Lorem 3 ipsum dolor sit amet consectetur, adipisicing elit. Dolor,
                            praesentium.
                        </p>
                    </div>
                    <div className={toggleState === 4 ? "tabs active-tabs" : "tabs"}>
                        <h2>Content 3</h2>
                        <hr />
                        <p>
                            Lorem 3 ipsum dolor sit amet consectetur, adipisicing elit. Dolor,
                            praesentium.
                        </p>
                    </div>
                    <div className={toggleState === 5 ? "tabs active-tabs" : "tabs"}>
                        <h2>Content 3</h2>
                        <hr />
                        <p>
                            Lorem 3 ipsum dolor sit amet consectetur, adipisicing elit. Dolor,
                            praesentium.
                        </p>
                    </div>
                    <div className={toggleState === 6 ? "tabs active-tabs" : "tabs"}>
                        <h2>Content 3</h2>
                        <hr />
                        <p>
                            Lorem 4 ipsum dolor sit amet consectetur, adipisicing elit. Dolor,
                            praesentium.
                        </p>
                    </div>
                </div>
        </>
    )
}

export default NewArrivelTab
