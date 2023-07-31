import React, {useState, useContext} from "react";
import "./Booking.css";
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../utils/config";

const Booking = ({ tour, avgRating }) => {
  const { price, reviews, title } = tour;
  const navigate = useNavigate()
  const {user} = useContext(AuthContext)

  const [booking, setBooking] = useState({
    userId:user?._iid,
    userEmail:user?.email,
    tourName: title,
    fullName: "",
    phone: "",
    guestSize:1,
    bootAt: ''
  })

  const handleChange = (e) => {
    setBooking(prev => ({...prev, [e.target.id] : e.target.value}))
  };

  //send data to the server
  const handleClick = async (e) => {
    e.preventDefault();
    navigate('/thank-you')


      try {
        if(!user || user === undefined || user === null) {
          return alert('please sign in')
        }
        const res = await fetch(`${BASE_URL}/booking`, {
          method: 'post',
          headers: {
            'content-type': 'application/json'
          },credentials: 'include',
          body: JSON.stringify(booking)
        })
        const result = await res.json() 
        if(!res.ok) {
         return alert(result.message)
        } 
        navigate("/thank-you")
    } catch (error) {
      alert(error.message)
    }
  }

  const serviceFee = 10;
  const totalAmount = Number(price) * Number(booking.guestSize) + (serviceFee)

  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>${price} per/ person</h3>
        <span className="tour__rating d-flex align-items-center">
          <i class="ri-star-s-fill"></i> {avgRating === 0 ? null : avgRating} (
          {reviews?.length})
        </span>
      </div>

      {/*====booking====*/}

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

      {/*========*/}
      <div className='booking__bottom'>
        <ListGroup>
            <ListGroupItem className='border-0 px-0'>
                <h5 className="d-flex align-items-center gap-1">${price} <i class='ri-close-line' /> 1 person </h5>
                <span>${price}</span>
            </ListGroupItem>

            <ListGroupItem className='border-0 px-0'>
                <h5>Service charge </h5>
                <span>{serviceFee}</span>
            </ListGroupItem>

            <ListGroupItem className='border-0 px-0 total'>
                <h5>Total </h5>
                <span>{totalAmount} </span>
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
