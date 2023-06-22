import {Container, Row, Col, Card} from 'react-bootstrap';


export default function Highlights(){
	
	return(
		<Container className = 'mt-5'>
			<Row >
				<Col className = "col-12 col-md-4 mt-3 ">
					<Card className = 'cardHighlight'>
					      
					      <Card.Body>
					        <Card.Title>Quality Sodas!</Card.Title>
					        <Card.Text>
					          In Aster, we don't want to provide a not-quality sodas. Quality over quantity!
					        </Card.Text>
					        
					      </Card.Body>
					    </Card>
				</Col>

				<Col className = "col-12 col-md-4 mt-3 ">
					<Card className = 'cardHighlight'>
					      
					      <Card.Body>
					        <Card.Title>Affordable Sodas!</Card.Title>
					        <Card.Text>
					          In Aster, we provide an affordable sodas for people to purchase!
					        </Card.Text>
					        
					      </Card.Body>
					    </Card>
				</Col>

				<Col className = "col-12 col-md-4 mt-3 ">
					<Card className = "cardHighlight">
					      
					      <Card.Body>
					        <Card.Title>Fast Delivery!</Card.Title>
					        <Card.Text>
					          Expect a fast delivery by 2-3 business days upon ordering.
					        </Card.Text>
					        
					      </Card.Body>
					    </Card>
				</Col>
			</Row>
		</Container>
		)
}
