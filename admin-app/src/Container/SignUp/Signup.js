import React from 'react';
import Layout from "../../Component/Layout";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import Input from "../../Component/UI/Input/Input";

const Signup = (props) => {
    return(
        <Layout>
            <Container>
                <Row style={{marginTop: '50px'}}>
                    <Col md={{span: 6, offset: 3}}>
                        <Form>
                            <Row>
                                <Col md={6}>
                                    <Input
                                        id="firstName"
                                        label="First Name"
                                        placeholder="First Name"
                                        type="text"
                                        // value=""
                                        // onChange={() => {}}
                                    />
                                </Col>
                                <Col md={6}>
                                    <Input
                                        id="lastName"
                                        label="Last Name"
                                        placeholder="Last Name"
                                        type="text"
                                        // value=""
                                        // onChange={() => {}}
                                    />
                                </Col>
                            </Row>
                            <Input
                                id="Email"
                                label="Email"
                                placeholder="Email"
                                type="email"
                                errorMessage="We'll never share your email with anyone else."
                                // value=""
                                // onChange={() => {}}
                            />

                            <Input
                                id="password"
                                label="Password"
                                placeholder="Password"
                                type="password"
                                // value=""
                                // onChange={() => {}}
                            />
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
};

export default Signup;