import React, { useRef } from 'react';
import './Searchbar.css';
import { Form, FormGroup, Col } from 'reactstrap';
import { BASE_URL } from '../utils/config';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const locationRef = useRef('');
  const distanceRef = useRef(0);
  const maxGroupSizeRef = useRef(0);
  const navigate = useNavigate();

  const searchHandler = async () => {
    const location = locationRef.current.value;
    const distance = distanceRef.current.value;
    const maxGroupSize = maxGroupSizeRef.current.value;

    if (location === '' || distance === '' || maxGroupSize === '') {
      return alert('All fields are required');
    }

    const res = await fetch(
      `${BASE_URL}/tours/search/getTourBySearch?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`
    );
    if (!res.ok) {
      alert('Something went wrong');
      return;
    }

    const result = await res.json();
    navigate(`/tours/search?city=${location}&distance=${distance}&maxGroupSize=${maxGroupSize}`, {
      state: result.data,
    });
  };

  return (
    <Col lg="12">
      <div className="search__bar">
        <Form className="d-flex align-items-center gap-4">
          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
              <i className="ri-map-pin-line" />
            </span>
            <div>
              <h5>Location</h5>
              <input type="text" placeholder="Search... Where are you going?" ref={locationRef} />
            </div>
          </FormGroup>

          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
              <i className="ri-map-pin-time-line" />
            </span>
            <div>
              <h5>Distance</h5>
              <input type="number" placeholder="Distance miles..." ref={distanceRef} />
            </div>
          </FormGroup>

          <FormGroup className="d-flex gap-3 form__group form__group-fast">
            <span>
              <i className="ri-group-line" />
            </span>
            <div>
              <h5>Max People</h5>
              <input type="number" placeholder="0" ref={maxGroupSizeRef} />
            </div>
          </FormGroup>
          <button className="search__icon" type="button" onClick={searchHandler}>
            <div className="icon-search">
              <i className="ri-search-line"></i>
            </div>
          </button>
        </Form>
      </div>
    </Col>
  );
};

export default SearchBar;