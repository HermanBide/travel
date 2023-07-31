import React from "react";
import "./Footer.css";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo01.png";

const quick_links = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },
  {
    path: "/tours",
    display: "Tours",
  },
];

const quick_links2 = [
  {
    path: "/gallery",
    display: "Gallery",
  },
  {
    path: "/login",
    display: "Login",
  },
  {
    path: "/register",
    display: "Register",
  },
];

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="3">
            <div className="logo">
              <img src={logo} alt="" />
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              <div className="social__links d-flex align-items-center gap-4">
                <span>
                  <Link to="/https://github.com/HermanBide">
                    <i class="ri-github-fill"></i>
                  </Link>
                  <Link to="/https://www.linkedin.com/in/herman-bide/">
                    <i class="ri-linkedin-box-fill"></i>
                  </Link>
                </span>
              </div>
            </div>
          </Col>

          <Col lg='3'>
            <h5 className="footer__link-title">Discover</h5>
            <ListGroup className="footer__qucik-links">
              { quick_links.map((link, index) => (
                <ListGroupItem key={index} className="ps-0 border-0">
                  <Link to={link.path}>{link.display}</Link>
                </ListGroupItem>
              )) }
            </ListGroup>
          </Col>
          <Col lg='3'>
            <h5 className="footer__link-title">Quick Links</h5>
            <ListGroup className="footer__qucik-links">
              { quick_links2.map((link, index) => (
                <ListGroupItem key={index} className="ps-0 border-0">
                  <Link to={link.path}>{link.display}</Link>
                </ListGroupItem>
              )) }
            </ListGroup>
          </Col>
          <Col lg='3'>
            <h5 className="footer__link-title">Contact</h5>
            <ListGroup className="footer__qucik-links">
         
                <ListGroupItem  className="ps-0 border-0 d-flex align-items-center gap-3">
               <h6 className="mb-0 d-flex align-items-center gap-2">
                <span><i class="ri-map-pin-line"/>
                </span>
                  Address:
               </h6>
               <p className="mb-0">San Francisco, CA</p>
                </ListGroupItem>

                <ListGroupItem  className="ps-0 border-0 d-flex align-items-center gap-3">
               <h6 className="mb-0 d-flex align-items-center gap-2">
                <span><i class="ri-mail-line"/>
                </span>
                 Email:
               </h6>
               <p className="mb-0">herm.bide@gmail.com</p>
                </ListGroupItem>

                <ListGroupItem  className="ps-0 border-0 d-flex align-items-center gap-3">
               <h6 className="mb-0 d-flex align-items-center gap-2">
                <span>
                <i class="ri-phone-line"/>
                </span>
                  Phone:
               </h6>
               <p className="mb-0">(925)206-2049</p>
                </ListGroupItem>
            </ListGroup>
          </Col>

        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
