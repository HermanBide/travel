import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css';
import { AuthContext } from '../context/AuthContext';
import { BASE_URL } from '../utils/config';

const Register = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
      const result = await res.json();

      if (!res.ok) {
        alert(result.message);
      } else {
        dispatch({ type: 'REGISTER_SUCCESS' });
        navigate('/login');
      }
    } catch (error) {
      alert('Failed to register. Please try again later.');
    }
  };

  return (
    <section className='login__section'>
      <Container>
        <Row>
          <Col lg='6' className='mx-auto'>
            <div className='login__container'>
              <div className='login__header'>
                <h2>Login</h2>
                <i class='ri-user-fill'></i>
              </div>
              <Form className='login__form' onSubmit={handleSubmit}>
                <FormGroup>
                  <label htmlFor='username'>Username:</label>
                  <input
                    type='text'
                    id='username'
                    name='username'
                    className='form-control'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <label htmlFor='email'>Email:</label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    className='form-control'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <label htmlFor='password'>Password:</label>
                  <input
                    type='password'
                    id='password'
                    name='password'
                    className='form-control'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormGroup>
                <Button className='login__btn' type='submit'>
                  Sign up
                </Button>
              </Form>
              <div className='login__footer'>
                <p>
                  Oh! Already have an account? <Link to='/login'>Log in here</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Register;