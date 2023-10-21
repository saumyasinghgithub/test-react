import React from "react";
import { Container } from "react-bootstrap";
import { Home } from "../components";

const LoginLayout = ({children}) => {
    return (<Container fluid>
        {children}
        <Home />
        </Container>);
};
export default LoginLayout;