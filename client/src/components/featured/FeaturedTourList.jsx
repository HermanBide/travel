import React from "react";
import TourCard from "../../shared/TourCard";
import { Col } from "reactstrap";
import useFetch from "../../hooks/useFetch";
import { BASE_URL } from '../../utils/config';

const FeaturedTourList = () => {
  const { data: featuredTours, loading, error } = useFetch(`${BASE_URL}/tours/search/getFeaturedTours`);
  console.log("FeaturedTour", featuredTours);

  if (loading) {
    return <h4>Loading...</h4>;
  }

  if (error) {
    return <h4>Error: {error}</h4>;
  }

  if (!featuredTours || !Array.isArray(featuredTours.data)) {
    return <h4>No featured tours available.</h4>;
  }

  return (
    <>
      {featuredTours.data.map((tour) => (
        <Col lg="3" md="6" sm="6" className="mb-4" key={tour._id}>
          <TourCard tour={tour}/>
        </Col>
      ))}
    </>
  );
};

export default FeaturedTourList;