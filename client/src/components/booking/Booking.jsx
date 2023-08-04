import React, { useState, useContext } from "react";
import "./Booking.css";
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../utils/config";

const Booking = ({ tour, avgRating }) => {
  const { price, reviews, title } = tour;
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [booking, setBooking] = useState({
    userId: user?._id,
    userEmail: user?.email,
    tourName: title,
    fullName: "",
    phone: "",
    guestSize: 1,
    bookAt: "",
  });

  const [totalAmount, setTotalAmount] = useState(price);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setBooking((prev) => ({ ...prev, [id]: value }));
  
    // Calculate the total amount based on the price and guestSize
    const guestSize = parseInt(value);
    if (!isNaN(guestSize) && guestSize > 0) {
      const total = price + serviceFee * guestSize;
      setTotalAmount(total);
    } else {
      setTotalAmount(price);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    navigate("/thank-you");

    try {
      if (!user || user === undefined || user === null) {
        return alert("Please sign in");
      }

      // Create the booking object to be sent to the server
      const bookingData = {
        userId: user?._id,
        userEmail: user?.email,
        tourName: title,
        fullName: booking.fullName,
        phone: booking.phone,
        guestSize: booking.guestSize,
        bookAt: booking.bookAt,
      };

      const res = await fetch(`${BASE_URL}/booking`, {
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(bookingData), // Send the bookingData object as the request body
      });

      const result = await res.json();
      if (!res.ok) {
        return alert(result.message);
      }
      navigate("/thank-you");
    } catch (error) {
      alert(error.message);
    }
  };

  const serviceFee = 10;

  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>${price} per/ person</h3>
        <span className="tour__rating d-flex align-items-center">
          <i className="ri-star-s-fill"></i>{" "}
          {isNaN(avgRating) ? "Not rated" : avgRating} ({reviews?.length})
        </span>
      </div>

      <div className="booking_form">
        <h5>Information</h5>
        <Form className="booking__info-form" onSubmit={handleClick}>
          <FormGroup>
            <input
              type="text"
              placeholder="full name"
              id="fullName"
              required
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <input
              type="number"
              placeholder="Phone"
              id="phone"
              required
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup className="d-flex align-items-center gap-3">
            <input
              type="date"
              placeholder=""
              id="bookAt"
              onChange={handleChange}
            />
            <input
              type="number"
              placeholder="Guest"
              id="guestSize"
              onChange={handleChange}
            />
          </FormGroup>
        </Form>
      </div>

      <div className="booking__bottom">
        <ListGroup>
          <ListGroupItem className="border-0 px-0">
            <h5 className="d-flex align-items-center gap-1">
              ${price} <i className="ri-close-line" /> 1 person{" "}
            </h5>
            <span>${price}</span>
          </ListGroupItem>

          <ListGroupItem className="border-0 px-0">
            <h5>Service charge </h5>
            <span>{serviceFee}</span>
          </ListGroupItem>

          <ListGroupItem className="border-0 px-0 total">
            <h5>Total </h5>
            <span>${isNaN(totalAmount) ? 0 : totalAmount }</span>
          </ListGroupItem>
        </ListGroup>

        <Button className="btn primary__btn w-100 mt-4" onClick={handleClick}>
          Book Now
        </Button>
      </div>
    </div>
  );
};

export default Booking;