import React from "react";
import "../styles/home.css";
import { Container, Row, Col } from "reactstrap";
import HeroImg from "../assets/images/hero-img01.jpg";
import HeroImg1 from "../assets/images/hero-img02.jpg";
import HeroImg2 from "../assets/images/hero-img03.jpg";
import HeroVid from "../assets/images/Beach01.mp4";
import worldImg from "../assets/images/world.png";
import Subtitle from "../shared/Subtitle";
import SearchBar from "../shared/SearchBar";
import ServiceList from "../services/ServiceList";
import FeaturedTourList from "../components/featured/FeaturedTourList";
import experience from "../assets/images/world.jpg";
import MasonryImagesGallery from "../components/gallery/MasonryImagesGallery";
import Testimonials from "../components/testimonial/Testimonials";
import NewsLetter from "../shared/NewsLetter";

const Home = () => {
  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <div className="hero__content">
                <div className="hero__subtitle d-flex align-items-center">
                  <Subtitle subtitle={"Learn Before You Travel"} />
                  <img src={worldImg} alt="" />
                </div>
                <h1>
                  Traveling opens the door to creating
                  <span className="highlight"> memories.</span>
                </h1>
                <p>
                  {" "}
                  lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
              </div>
            </Col>

            <Col lg="2">
              <div className="hero__img-box">
                <img src={HeroImg1} alt="hero" />
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__img-box mt-4">
                <img src={HeroImg2} alt="hero" />
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__img-box mt-5">
                <img src={HeroImg} alt="hero" />
              </div>
            </Col>
            <SearchBar />
          </Row>
        </Container>
      </section>
      {/*====Start HERO===*/}
      <section>
        <Container>
          <Row>
            <Col lg="3">
              <h5 className="services__subtitle">What we serve</h5>
              <h2 className="services__title">
                We only offer the best services
              </h2>
            </Col>
            <ServiceList />
          </Row>
        </Container>
      </section>

      {/*=====FEATURE=====*/}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <Subtitle subtitle={"Explore"} />
              <h2 className="featured__tour-title"> Our Featured Tours</h2>
            </Col>
            <FeaturedTourList />
          </Row>
        </Container>
      </section>

      {/*=====EXPERIENCE=====*/}
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <div className="experience__content">
                <Subtitle subtitle={"Experience"} />
                <h2>
                  {" "}
                  With our all experience <br /> we will serve you
                </h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  <br />
                  sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua.{" "}
                </p>
              </div>
              <div className="counter__wrapper d-flex align-items-center gap-5">
                <div className="counter__box">
                  <span>12k+</span>
                  <h6>Successful Trip</h6>
                </div>

                <div className="counter__box">
                  <span>2k+</span>
                  <h6>Regular clients</h6>
                </div>

                <div className="counter__box">
                  <span>10</span>
                  <h6>Years experience</h6>
                </div>
              </div>
            </Col>

            <Col lg="6">
              <div className="experience_img">
                <img className="travel_img" src={experience} alt="ex" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/*===galary===*/}
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={"Gallery"} />
              <h2 className="gallery__title">
                Visit out customers tour gallery{" "}
              </h2>
            </Col>
            <Col lg="12">
              <MasonryImagesGallery />
            </Col>
          </Row>
        </Container>
      </section>

      {/*=== testimonials section====*/}
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={'Testimonials'} />
              <h2 className="testimonial__title">Reviews from returning customers</h2>
              <Testimonials/>
            </Col>
          </Row>
        </Container>
      </section>

       {/*=== testimonials section====*/}
       <NewsLetter/>
    </>
  );
};

export default Home;
