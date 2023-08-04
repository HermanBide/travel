import React, { useEffect, useRef, useState, useContext } from "react";
import "../styles/tourDetails.css";
import { Container, Row, Col, Form, ListGroup } from "reactstrap";
import { useParams } from "react-router-dom";
import calculateAvgRating from "../utils/avgRating";
import avatar from "../assets/images/avatar.jpg";
import Booking from "../components/booking/Booking";
import NewsLetter from "../shared/NewsLetter";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utils/config";
import { AuthContext } from "../context/AuthContext";

const TourDetails = () => {
  const { id } = useParams();
  const reviewMsgRef = useRef("");
  const [tourRating, setTourRating] = useState(null);
  const { user } = useContext(AuthContext);

  const { data: tour, loading, error } = useFetch(`${BASE_URL}/tours/${id}`);
  const [reviews, setReviews] = useState([]); // State to hold reviews

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tour]);

  useEffect(() => {
    // Fetch user's reviews from local storage when component mounts
    const userReviews = localStorage.getItem('userReviews');
    if (userReviews) {
      setReviews(JSON.parse(userReviews));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('userReviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    // Retrieve the rating and review text from localStorage
    const storedRating = localStorage.getItem('tourRating');
    const storedReviewText = localStorage.getItem('reviewText');
  

    if (storedRating) {
      setTourRating(parseInt(storedRating, 10));
    }
    if (storedReviewText) {
      reviewMsgRef.current.valueOf = storedReviewText;
    }
  }, []);

  if (loading) {
    return <h4 className="text-center pt-5">Loading...</h4>;
  }

  if (error || !tour) {
    return <h4 className="text-center pt-5">Error loading tour details</h4>;
  }

  const {
    photo,
    title,
    desc,
    price,
    reviews: tourReviews,
    address,
    city,
    distance,
    maxGroupSize,
  } = tour;

  const { totalRating, avgRating } = calculateAvgRating(tourReviews);
  //format date
  const options = { day: "numeric", month: "long", year: "numeric" };

  // Submit request to the server
  const submitHandler = async (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;
    try {
      if (!user || user === undefined || user === null) {
        alert('Please sign in');
        return;
      }

      const reviewObj = {
        username: user?.username,
        reviewText,
        rating: tourRating
      };

      const res = await fetch(`${BASE_URL}/reviews/${id}`, {
        method: 'post',
        headers: {
          'content-type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(reviewObj)
      });

      const result = await res.json();
      if (!res.ok) {
        return alert(result.message);
      }

      // Update the reviews state with the new review
      setReviews([...reviews, result.data]);

      // Clear the review input and rating
      reviewMsgRef.current.value = '';
      setTourRating(null);
      localStorage.setItem('tourRating', tourRating);
      localStorage.setItem('reviewText', reviewText);
      alert('Review submitted');
    } catch (error) {
      alert(error.message);
    }
  };

  const validAvgRating = isNaN(avgRating) ? 0 : avgRating;

  return (
    <>
      <section>
        <Container>
          {loading && <h4 className="text-center pt-5">Loading...</h4>}
          {error && <h4 className="text-center pt-5">{error}</h4>}
          {!loading && !error &&
            <Row>
              <Col lg="8">
                <div className="tour__content">
                  <img src={photo} alt={title} style={{ width: "300px", height: "200px" }} />
                  <div className="tour__info">
                    <h2>{title}</h2>
                    <div className="d-flex align-items-center gap-5">
                      <span className="tour__rating d-flex align-items-center gap-1">
                        <i className="ri-star-s-fill"
                          style={{ color: "var(--secondary-color)" }} />{" "}
                        {validAvgRating === 0 ? null : validAvgRating}
                        {totalRating === 0 ? (
                          "Not rated"
                        ) : (
                          <span>({tourReviews?.length}) </span>
                        )}
                      </span>

                      <span>
                        <i className="ri-map-pin-fill" />
                        {address}
                      </span>
                    </div>

                    <div className="tour__extra-details">
                      <span>
                        <i className="ri-map-pin-2-line" /> {city}
                      </span>
                      <span>
                        <i className="ri-money-dollar-circle-line" /> ${price}/ per
                        person
                      </span>
                      <span>
                        <i className="ri-map-pin-time-line" /> {distance}/miles
                      </span>
                      <span>
                        <i className="ri-group-line" /> {maxGroupSize} people
                      </span>
                      {/* <h5>Description</h5> */}
                      <p>{desc}</p>
                    </div>

                    {/*=== tour reviews ===*/}
                    <div className="tour__reviews mt-4">
                      <h4>Reviews({tourReviews?.length} reviews)</h4>
                      <Form onSubmit={submitHandler}>
                        <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                          <span onClick={() => setTourRating(1)} className={tourRating >= 1 ? 'selected ' : ''}>
                            1 <i className="ri-star-s-fill" />
                          </span>
                          <span onClick={() => setTourRating(2)} className={tourRating >= 2 ? 'selected' : ''}>
                            2 <i className="ri-star-s-fill" />
                          </span>
                          <span onClick={() => setTourRating(3)} className={tourRating >= 3 ? 'selected' : ''}>
                            3 <i className="ri-star-s-fill" />
                          </span>
                          <span onClick={() => setTourRating(4)} className={tourRating >= 4 ? 'selected' : ''}>
                            4 <i className="ri-star-s-fill" />
                          </span>
                          <span onClick={() => setTourRating(5)} className={tourRating >= 5 ? 'selected' : ''}>
                            5 <i className="ri-star-s-fill" />
                          </span>
                          {/* ... Repeat for other star ratings */}
                        </div>

                        <div className="review__input">
                          <input
                            type="text"
                            ref={reviewMsgRef}
                            required
                            placeholder="Share your thoughts"
                          />
                          <button
                            className="btn primary__btn text-white"
                            type="submit"
                          >
                            Submit
                          </button>
                        </div>
                      </Form>

                      <ListGroup className="user__reviews">
                        {reviews?.map((review) => (
                          <div className="review__item" key={review._id}>
                            <img src={avatar} alt="" />
                            <div className="w-100">
                              <div className="d-flex align-items-center justify-content-between">
                                <div>
                                  <h5>{review.username}</h5>
                                  <p>
                                    {new Date(review.createdAt).toLocaleDateString(
                                      "en-US",
                                      options
                                    )}
                                  </p>
                                </div>
                                <span className="d-flex align-items-center">
                                  {review.rating} <i className="ri-star-s-fill" />
                                </span>
                              </div>
                              <h6>{review.reviewText}</h6>
                            </div>
                          </div>
                        ))}
                      </ListGroup>
                    </div>
                  </div>
                </div>
              </Col>

              <Col lg="4">
                <Booking tour={tour} avgRating={avgRating} />
              </Col>
            </Row>
          }
        </Container>
      </section>
      <NewsLetter />
    </>
  );
};

export default TourDetails;