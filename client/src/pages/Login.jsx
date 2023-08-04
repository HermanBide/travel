import React, { useState, useContext } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../utils/config';

const Login = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (e) => {
    if (e.target.id === 'email') {
      setEmail(e.target.value);
    } else if (e.target.id === 'password') {
      setPassword(e.target.value);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   dispatch({ type: 'LOGIN_START' });
  //   try {
  //     const res = await fetch(`${BASE_URL}/auth/login`, {
  //       method: 'post',
  //       headers: {
  //         'content-type': 'application/json'
  //       },
  //       credentials: 'include',
  //       body: JSON.stringify({ email, password })
  //     });
  //     const result = await res.json();

  //     if (!res.ok) {
  //       alert(result.message);
  //     } else {
  //       dispatch({ type: 'LOGIN_SUCCESS', payload: result.data });
  //       navigate("/");
  //     }
  //   } catch (error) {
  //     dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
  //     alert('Failed to login. Please try again later.');
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: 'LOGIN_START' });
  
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json' // Correct the header field name
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }) // Add the "username" field
      });
      
      const result = await res.json();
  
      if (!res.ok) {
        alert(result.message);
      } else {
        dispatch({ type: 'LOGIN_SUCCESS', payload: result.data });
        navigate("/");
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
      alert('Failed to login. Please try again later.');
    }
  };

  return (
    <section className="login__section">
      <Container>
        <Row>
          <Col lg="6" className="mx-auto">
            <div className="login__container">
              <div className="login__header">
                <h2>Login</h2>
                <i class="ri-user-fill"></i>
              </div>
              <Form className="login__form" onSubmit={handleSubmit}>
                <FormGroup>
                  <label htmlFor="email">Email:</label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    className="form-control"
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-control"
                    onChange={handleChange}
                  />
                </FormGroup>
                <Button className="login__btn" type="submit">
                  Login
                </Button>
              </Form>
              <div className="login__footer">
                <p>
                  Don't have an account? <Link to="/register">Sign up here</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;