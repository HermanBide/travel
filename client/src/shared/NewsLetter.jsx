import React from "react";
import "./Newsletter.css";
import { Container, Row, Col } from "reactstrap";
import maleTourist from "../assets/images/male-tourist.png";

const NewsLetter = () => {
  return (
    <section className="newsletter">
      <Container>
        <Row>
          <Col lg="6">
            <div className="newsletter__content">
              <h2> Subscribe now to get useful traveling information. </h2>
              <div className="newsletter__input">
                <input type="email" placeholder="Enter your email address" />
                <button className="btn newsletter__btn">Subscribe</button>
              </div>
              <p>
                {" "}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </Col>
          <Col lg='6'>
            <div className="newsletter">
                <img src={maleTourist} alt="" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default NewsLetter;
