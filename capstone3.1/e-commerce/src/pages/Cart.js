import ProductCard from '../components/ProductCard.js';
import UserContext from '../UserContext';
import { useState, useEffect, useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

export default function Cart() {
  const { user, setUser } = useContext(UserContext);
  const [cart, setCart] = useState();
  const [cartTotal, setCartTotal] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users/cart`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })
      .then((result) => result.json())
      .then((data) => {
        if (data) {
          // console.log(data)
          setCart(data)
        } else {
          setCart();
        }
      })
      .catch((error) => {
        console.log(error);
      });
    fetch(`${process.env.REACT_APP_API_URL}/users/cart/total`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      })
        .then((result) => result.json())
        .then((data) => {
          if (data) {
            // console.log(data)
            setCartTotal(data.totalPrice)
          } else {
            setCartTotal(0);
          }
        })
        .catch((error) => {
          console.log(error);
        })
  }, []);

  return !user.isAdmin && user.id ? (
    <Container>
      <h1 className="text-center mt-3">Cart</h1>
      {cart?.products?.map((product) => (
        <Card key={product.productId._id} className="mt-3">
          <Card.Body>
            <Card.Title>{product.productId.name}</Card.Title>
            <Card.Text>{product.productId.description}</Card.Text>
            <Card.Text>Quantity: {product.quantity}</Card.Text>
            <Card.Text>
              Subtotal: {product.quantity * product.productId.price}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
      <h2 className="mt-3">Total Price: {cartTotal}</h2>
      <Button variant="primary" type="submit" onClick={() => navigate("/order")}>
        Checkout Order
      </Button>
    </Container>
  ) : (
    <Navigate to="/notFound" />
  );
}
