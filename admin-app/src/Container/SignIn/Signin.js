import React from 'react';
import Layout from "../../Component/Layout";
import {Container, Form, Row, Col, Button} from 'react-bootstrap';
import Input from "../../Component/UI/Input/Input";

const Signin = (props) => {
    return(
        <Layout>
            <Container>
                <Row style={{marginTop: '50px'}}>
                    <Col md={{span: 6, offset: 3}}>
                        <Form>
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

export default Signin;