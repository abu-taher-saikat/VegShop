import React from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import car from '../assets/images/files/service1_47x47.png';
import money from '../assets/images/files/service2_47x47.png';
import time from '../assets/images/files/service3_47x47.png';
import payment from '../assets/images/files/service4_47x47.png';
import online from '../assets/images/files/service6_47x47.png';


const WebsiteFeature = () => {
    return (
        <div className="websiteFeature">
            <Row>
                <Col className="boxservice">
                    <div className="image">
                        <Image src={car}></Image>
                    </div>
                    <div className="content">
                        <h4>Free Delivery</h4>
                        <div className="service__desc">
                            orders over $99.00
                        </div>
                    </div>
                </Col>
                <Col className="boxservice">
                    <div className="image">
                        <Image src={money}></Image>
                    </div>
                    <div className="content">
                        <h4>Money Guarantee</h4>
                        <div className="service__desc">
                        7 days back

                        </div>
                    </div>
                </Col>
                <Col className="boxservice">
                    <div className="image">
                        <Image src={time}></Image>
                    </div>
                    <div className="content">
                        <h4>365 Days</h4>
                        <div className="service__desc">
                         for free return
                        </div>
                    </div>
                </Col>
                <Col className="boxservice">
                    <div className="image">
                        <Image src={payment}></Image>
                    </div>
                    <div className="content">
                        <h4>Payment</h4>
                        <div className="service__desc">
                            secure system
                        </div>
                    </div>
                </Col>
                <Col className="boxservice">
                    <div className="image">
                        <Image src={online}></Image>
                    </div>
                    <div className="content">
                        <h4>Online Support</h4>
                        <div className="service__desc">
                        24/24h on day
                        </div>
                    </div>
                </Col>

            </Row>
        </div>
    )
}

export default WebsiteFeature
