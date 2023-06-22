import ProductCard from '../components/ProductCard.js';
import UserContext from '../UserContext';
import { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import {Button, Container, Card} from 'react-bootstrap';

export default function Order() {
  const { user, setUser } = useContext(UserContext);
  const [order, setOrder] = useState();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users/orders`, {
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
       <Card className="mt-3 justify-content-center text-center">
         <Card.Body>
           <Card.Title>Items Purchased:</Card.Title>
           <Card.Text>{order?.products && order.products.length}</Card.Text>
           <Card.Title>Purchsed On:</Card.Title>
           <Card.Text>{order?.purchasedOn}</Card.Text>
           <Card.Title>Status</Card.Title>
           <Card.Text>{order?.status}</Card.Text>
           <Card.Title>Total Amount:</Card.Title>
           <Card.Text>{order?.totalAmount || 0}</Card.Text>
         </Card.Body>
       </Card>
     </Container>
   ) : (
     <Navigate to="/notFound" />
   );
 }




