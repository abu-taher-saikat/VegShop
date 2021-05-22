import React from 'react'
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './AddressScreen.css';
import img1 from '../assets/images/vegitable/joseph-gonzalez-fdlZBWIP0aM-unsplash.jpg'

const AddressScreen = () => {
    return (
        <>
            <Container className="address">
                <Row>
                    <Col md={7}> 
                        <Form className="pr-4">
                            <Form.Group>
                                 <div className="contact-info">
                                     <h4>Contact information</h4>
                                     <h5>Already Have an account? <Link to="login">Log in</Link> </h5>
                                 </div>
                                <Form.Control placeholder="Email or Phone number"></Form.Control>
                                <Form.Check type="checkbox" label="Keep me up to date on news and exclusive offers" />

                            </Form.Group>
                            <br />
                            <h4>Shipping address</h4>
                            <Row>
                                <Col>
                                    <Form.Control placeholder="First name" />
                                </Col>
                                <Col>
                                    <Form.Control placeholder="last name" />
                                </Col>
                            </Row>
                            <br />
                            <div>
                                <Form.Control placeholder="Address"></Form.Control>
                                <br />
                                <Form.Control placeholder="Apartment , suite, (etc)"></Form.Control>
                                <br />
                                <Form.Control placeholder="City"></Form.Control>
                            </div>
                            <br />
                            <Row>
                                <Col>
                                    <Form.Control placeholder="Country/Region" />
                                </Col>
                                <Col>
                                    <Form.Control placeholder="Postal Code" />
                                </Col>
                            </Row>
                            <Form.Group className="pt-2" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="	Save this information for next time" />
                            </Form.Group>

                            <Button type="submit">
                                Continue to Shipping
                            </Button>
                        </Form>
                    </Col>

                    {/* Right side */}
                    <Col md={5} className="right__col">
                        <div className="right__section pl-4">
                            <div className="">
                                <Row className="product__row">
                                    <Col className="d-flex justify-space-between">
                                        <div className="">
                                            <Image src={img1}></Image>
                                            <span className="productName pl-3">Product Name</span>
                                        </div>
                                        <div className="productAmount">
                                            $335.00
                                        </div>
                                    </Col>
                                    <Col className="d-flex justify-space-between">
                                        <div className="">
                                            <Image src={img1}></Image>
                                            <span className="productName pl-3">Product Name</span>
                                        </div>
                                        <div className="productAmount">
                                            $335.00
                                        </div>
                                    </Col>
                                    <Col className="d-flex justify-space-between">
                                        <div className="">
                                            <Image src={img1}></Image>
                                            <span className="productName pl-3">Product Name</span>
                                        </div>
                                        <div className="productAmount">
                                            $335.00
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                            <hr />
                            
                            <div className="d-flex">
                                <span>sub total</span>
                                <span className="ml-auto">$330.00</span>
                            </div>
                            <div className="d-flex">
                                <span>Shipping</span>
                                <span className="ml-auto">Calculated to the next Step</span>
                            </div>

                            <hr />

                            <div className="d-flex">
                                <span>Total</span>
                                <span className="ml-auto">USD $330.00</span>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>   
        </>
    )
}

export default AddressScreen
