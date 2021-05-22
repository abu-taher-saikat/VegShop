import React from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './AddressScreen.css';

const AddressScreen = () => {
    return (
        <>
            <Container className="address">
                <Row>
                    <Col> 
                        <Form>
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
                    <Col>2</Col>
                </Row>
            </Container>   
        </>
    )
}

export default AddressScreen
