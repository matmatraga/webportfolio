import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import UserContext from '../UserContext.js';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import Swal2 from 'sweetalert2';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    if (
      email !== '' &&
      password1 !== '' &&
      password2 !== '' &&
      password1 === password2 &&
      password1.length > 6
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email, password1, password2]);

  function register(event) {
    event.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({
        email : email,
        password : password1
      })
    })
    .then(result => result.json())
    .then(data => {

      if(data){
        Swal2.fire({
          title: 'Registration successful',
          icon: 'success',
          text: 'Welcome to zuitt!'
        })
        navigate('/login')
      }else{
        Swal2.fire({
          title: 'Email has been taken',
          icon: 'error',
          text: 'Please use another email!'
        })
      }
    }) 
  }

  return user.id === null ? (
    <Container className="mt-5">
      <Row>
        <Col className="col-6 mx-auto">
          <h1 className="text-center">Register</h1>
          <Form onSubmit={event => register(event)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={event => setEmail(event.target.value)}
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password1}
                onChange={event => setPassword1(event.target.value)}
                placeholder="Password"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword2">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                value={password2}
                onChange={event => setPassword2(event.target.value)}
                placeholder="Retype your nominated password"
              />
            </Form.Group>

            <p>
              Have an account already? <Link to="/login">Log in here.</Link>
            </p>

            <Button variant="primary" type="submit" disabled={isDisabled}>
              Register
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  ) : (
    <Navigate to="/notFound" />
  );
}