import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal2 from 'sweetalert2';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

export default function ProductView() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const navigate = useNavigate();

  const { productId } = useParams();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products/${productId}`, {
    	method: 'GET',
    	headers: {
    	  Authorization: `Bearer ${localStorage.getItem('token')}`,
    	  'Content-Type': 'application/json',
    	},
    })
      .then((response) => response.json())
      .then((data) => {
        setName(data.name);
        setDescription(data.description);
        setPrice(data.price);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [productId]);

  const addToCart = (productId) => {
    fetch(`${process.env.REACT_APP_API_URL}/users/cart`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: productId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          Swal2.fire({
            title: 'Successfully added to cart',
            icon: 'success',
            text: 'You have successfully added the product to your cart!',
          });
          navigate('/cart');
        } else {
          Swal2.fire({
            title: 'Something went wrong',
            icon: 'error',
            text: 'Please try again.',
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Container>
      <Row>
        <Col>
          <Card  className = "mt-5">
            <Card.Body>
              <Card.Title>{name}</Card.Title>
              <Card.Subtitle>Description:</Card.Subtitle>
              <Card.Text>{description}</Card.Text>
              <Card.Subtitle>Price:</Card.Subtitle>
              <Card.Text>P {price}</Card.Text>
              <Card.Subtitle>Quantity:</Card.Subtitle>
              <Card.Text>8am - 5pm</Card.Text>
              <Button variant="primary" onClick={() => addToCart(productId)}>
                Add to Cart
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
