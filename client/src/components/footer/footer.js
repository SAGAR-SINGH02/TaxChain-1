import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

import "./footer.css";

function Footer() {
    return (
        <div className="footer">
            <Container>
                <Row>
                    <Col md={12} className="footer-text">
                        Made with
                        <FontAwesomeIcon
                            className="icon-heart"
                            icon={faHeart}
                        />
                        in India by{" "}
                        <a
                            className="footer-name"
                            href="https://github.com/SAGAR-SINGH02"
                        >
                            Sagar
                        </a>
                        ,{" "}
                        <a
                            className="footer-name"
                            href="https://github.com/raj9229"
                        >
                            Raj
                        </a>
                        ,{" "}
                        <a
                            className="footer-name"
                            href="https://github.com/anuranjansrivastava"
                        >
                            Anuranjan
                        </a>{" "}
                        and{" "}
                        <a
                            className="footer-name"
                            href="https://github.com/Nikhilpratap123"
                        >
                            Nikhil 
                        </a>
                    </Col>
                    <Col className="footer-text-copyright">
                        Copyright not allowed | TaxChain
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Footer;
