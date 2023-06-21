import {Container, Row, Col, Card, Button} from 'react-bootstrap';

import UserContext from '../UserContext.js';

import {useState, useEffect, useContext} from 'react';

import {Link} from 'react-router-dom';


export default function ProductCard(props) {

	const {user} = useContext(UserContext);

	const {_id, name, description, price} = props.productProp;

	const [count, setCount] = useState(0);
	const [seat, setSeat] = useState(30);
	const [isDisabled, setIsDisabled] = useState(false);

	function enroll(){

		if(seat !== 0){
			setCount(count + 1);
			setSeat(seat - 1);
		}else{
			alert('No more seats available!');
		}
	}


	useEffect(()=>{
		
		if(seat === 0){
			setIsDisabled(true);
		}

	}, [seat]);


	return(
		<Container>
			<Row>
				<Col className="col-12 mt-3">
					<Card>
					    <Card.Body>
					    	<Card.Title className="mb-3">{name}</Card.Title>
					    	<Card.Subtitle>Description:</Card.Subtitle>
					        <Card.Text>{description}</Card.Text>
					        <Card.Subtitle>Price:</Card.Subtitle>
					        <Card.Text>PhP {price}</Card.Text>

					        <Card.Subtitle>Quantity</Card.Subtitle>
					        <Card.Text>{count}</Card.Text>


					        {
					        	user !== null 
					        	?
					        	<Button as = {Link} to = {`/products/${_id}`}>Details</Button>
					        	:
					        	<Button as = {Link} to = '/login'>Add to Cart</Button>


					        }
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
}

