import UserContext from '../UserContext';
import { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap';

export default function Order() {
  const { user } = useContext(UserContext);
  const [order, setOrder] = useState();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/orders`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    })
      .then((result) => result.json())
      .then((data) => {
        setOrder(data)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return !user.isAdmin ? (
    <Container>
      <h1 className="text-center mt-3">Order</h1>
      {order?.products?.map((product) => (
        <Card className="mt-3 text-center" key={product._id}>
          <Card.Body>
            <Card.Title>Name:</Card.Title>
            <Card.Text>{product.productId?.name || ''}</Card.Text>
            <Card.Title>Items Purchased:</Card.Title>
            <Card.Text>{order?.products && order.products.length}</Card.Text>
            <Card.Title>Purchased On:</Card.Title>
            <Card.Text>{order?.purchasedOn}</Card.Text>
            <Card.Title>Status</Card.Title>
            <Card.Text>{order?.status}</Card.Text>
            <Card.Title>Total Amount:</Card.Title>
            <Card.Text>{order?.totalAmount || 0}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </Container>
  ) : (
    <Navigate to="/notFound" />
  )
}
