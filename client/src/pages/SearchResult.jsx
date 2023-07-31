import React, { useState } from "react";
import CommonSection from "../shared/CommonSection";
import { Col, Container, Row } from "reactstrap";

import { useLocation } from "react-router-dom";
import TourCard from "../shared/TourCard";
import Newsletter from '../shared/NewsLetter'

const SearchResult = () => {
  const location = useLocation();

  const [data] = useState(location.state);

  return (
    <>
      <CommonSection title={"Tour Search Result"} />
      <section>
        <Container>
          <Row>
            {data.length === 0 ? (
              <h4 className="text-center">NO tour found</h4>
            ) : (
              data?.map((tour) => (
                <Col lg="3" className="mb-4" key={tour._id}>
                  <TourCard tour={tour} />
                </Col>
              ))
            )}
          </Row>
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default SearchResult;
