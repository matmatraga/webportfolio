// import { Container, Row, Col, Card, Button } from 'react-bootstrap';
// import UserContext from '../UserContext.js';
// import { useState, useEffect, useContext } from 'react';
// import { Link } from 'react-router-dom';

// export default function ProductCard(props) {
//   const { user } = useContext(UserContext);
//   const { _id, name, description, price } = props.productProp;
//   const [isDisabled, setIsDisabled] = useState(false);

//   const renderActionButton = () => {
//     if (user && user.isAdmin) {
//       return (
//         <>
//           <Button variant="primary" className = "me-2"as={Link} to={`/products/${_id}/updateproduct`}>
//             Update
//           </Button>
//           <Button variant="danger">
//             Disable
//           </Button>
//         </>
//       );
//     } else {
//       return (
//         <Button as={Link} to={`/products/${_id}`}>
//           Details
//         </Button>
//       );
//     }
//   };

//   return (
//     <Container>
//       <Row>
//         <Col className="col-12 mt-3">
//           <Card>
//             <Card.Body>
//               <Card.Title className="mb-3">{name}</Card.Title>
//               <Card.Subtitle>Description:</Card.Subtitle>
//               <Card.Text>{description}</Card.Text>
//               <Card.Subtitle>Price:</Card.Subtitle>
//               <Card.Text>PhP {price}</Card.Text>
//               {renderActionButton()}
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// }


import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import UserContext from '../UserContext.js';
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Swal2 from 'sweetalert2';

export default function ProductCard(props) {
  const { user } = useContext(UserContext);
  const { _id, name, description, price, isActive } = props.productProp;
  const [isUnarchived, setIsUnarchived] = useState(isActive);

  const handleDisable = () => {
    archive(_id, !isUnarchived);
  };

  const archive = (productId, isActive) => {
    // Perform the API request to archive or unarchive the product
    fetch(`${process.env.REACT_APP_API_URL}/products/${productId}/archivedproduct`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ isActive : isActive }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Optional: Handle the response data if needed
        setIsUnarchived(data.isActive);
        if(data === false){
        	Swal2.fire({
            title: 'Sucessful',
            icon: 'success',
            text: 'Product Successfully archived'
          })
        }else{
        	Swal2.fire({
        	title: 'Sucessful',
            icon: 'success',
            text: 'Product Successfully unarchived'
            })
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderActionButton = () => {
    if (user && user.isAdmin) {
      return (
        <>
          <Button variant="primary" className="me-2" as={Link} to={`/products/${_id}/updateproduct`}>
            Update
          </Button>
          <Button variant="danger" onClick={handleDisable}>
            {isUnarchived ? 'Archive' : 'Unarchive'}
          </Button>
        </>
      );
    } else {
      return (
        <Button as={Link} to={`/products/${_id}`}>
          Details
        </Button>
      );
    }
  };

  return (
    <Container>
      <Row>
        <Col className="col-12 mt-3 text-center">
          <Card>
            <Card.Body>
              <Card.Title className="mb-3">{name}</Card.Title>
              <Card.Subtitle>Description:</Card.Subtitle>
              <Card.Text>{description}</Card.Text>
              <Card.Subtitle>Price:</Card.Subtitle>
              <Card.Text>PhP {price}</Card.Text>
              {renderActionButton()}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
